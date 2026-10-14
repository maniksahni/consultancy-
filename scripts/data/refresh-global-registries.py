"""Refresh selected official country registries for the in-site directory.

This collects institution-level records plus publicly reusable country course/programme datasets.
It deliberately does not invent tuition, admission or housing values absent from
the source. Run with: python3 scripts/data/refresh-global-registries.py
"""
import csv
import io
import json
import re
import subprocess
import zipfile
from datetime import datetime, timezone
from pathlib import Path

OUT_DIR = Path("public/data/universities")
TODAY = datetime.now(timezone.utc).date().isoformat()


def download(url):
    # curl is substantially more reliable for larger government exports here.
    return subprocess.run(["curl", "-fsSL", "--retry", "5", "--retry-all-errors", "--retry-delay", "1", "--max-time", "300", url], check=True, capture_output=True).stdout


def csv_rows(body, delimiter=","):
    return csv.DictReader(io.StringIO(body.decode("utf-8-sig", errors="replace")), delimiter=delimiter)


institutions = []
courses = []

# France: open government register of higher-education institutions.
france_source = "French Ministry of Higher Education · Open Licence 2.0"
base = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-etablissements-enseignement-superieur/records"
first = json.loads(download(base + "?limit=1"))
total = first["total_count"]
for offset in range(0, total, 100):
    payload = json.loads(download(f"{base}?limit=100&offset={offset}"))
    for row in payload["results"]:
        institutions.append({
            "id": "fr-" + str(row.get("etablissement_id_paysage") or row.get("uai") or offset),
            "country": "france", "name": row.get("uo_lib_en") or row.get("uo_lib"),
            "nativeName": row.get("uo_lib"), "city": row.get("com_nom"),
            "region": row.get("reg_nom"), "institutionType": ", ".join(row.get("type_d_etablissement") or []),
            "publicPrivate": row.get("secteur_d_etablissement"), "identifier": row.get("uai"),
            "enrolmentYear": "2024", "enrolment": row.get("inscrits_2024"),
            "registrySource": france_source, "sourceDate": TODAY,
        })

# France: current Parcoursup programme catalogue (2026). The source lists
# programme names and locations but does not contain tuition amounts.
parcoursup_url = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-cartographie_formations_parcoursup/exports/csv?where=annee%3D%272026%27"
parcoursup_rows = csv_rows(download(parcoursup_url), delimiter=";")
for row in parcoursup_rows:
    # Multivalue fields are serialized as JSON arrays inside CSV cells.
    try:
        names = json.loads(row.get("nm") or "[]")
    except (TypeError, json.JSONDecodeError):
        names = [row.get("nm") or ""]
    try:
        fields = json.loads(row.get("fl") or "[]")
    except (TypeError, json.JSONDecodeError):
        fields = [row.get("fl") or ""]
    try:
        types = json.loads(row.get("tf") or "[]")
    except (TypeError, json.JSONDecodeError):
        types = [row.get("tf") or ""]
    name = " / ".join(names or fields)
    if not name:
        continue
    courses.append({
        "id": "fr-course-2026-" + str(row.get("gta") or row.get("gti")),
        "country": "france", "institutionId": "fr-uai-" + str(row.get("etab_uai") or "unknown"),
        "institution": row.get("etab_nom"), "name": name, "city": row.get("commune"),
        "level": " / ".join(types), "subject": " / ".join(fields),
        "language": None, "tuition": None, "currency": "EUR", "durationWeeks": None,
        "registrySource": "French Ministry of Higher Education · Parcoursup open-data catalogue",
        "sourceDate": "2026",
    })

# Canada: IRCC's current post-secondary DLI source, including campuses.
canada_url = "https://www.canada.ca/content/dam/ircc/documents/json/dli/dli-full-list.json"
canada = json.loads(download(canada_url))["data"]
for index, row in enumerate(canada):
    institutions.append({
        "id": "ca-" + str(row.get("DLI #") or index) + "-" + re.sub(r"[^a-z0-9]+", "-", (row.get("City") or "").lower()).strip("-"),
        "country": "canada", "name": row.get("Institution"), "city": row.get("City"),
        "region": row.get("Province"), "campus": row.get("Campus"),
        "institutionType": row.get("Public/Private"), "identifier": row.get("DLI #"),
        "postgraduateProgram": row.get("Grad Program"), "pgwpEligiblePrograms": row.get("PGWP"),
        "registrySource": "Immigration, Refugees and Citizenship Canada · Designated learning institutions",
        "sourceDate": TODAY,
    })

# United States: latest available NCES/IPEDS institutional directory snapshot.
hd_zip = zipfile.ZipFile(io.BytesIO(download("https://nces.ed.gov/ipeds/datacenter/data/HD2024.zip")))
hd_name = next(name for name in hd_zip.namelist() if name.lower().endswith(".csv"))
for row in csv_rows(hd_zip.read(hd_name)):
    if row.get("DEGGRANT") != "1" or row.get("CYACTIVE") not in ("1", "-2", ""):
        continue
    institutions.append({
        "id": "us-" + str(row.get("UNITID")), "country": "usa",
        "name": row.get("INSTNM"), "city": row.get("CITY"), "region": row.get("STABBR"),
        "institutionType": "Degree-granting postsecondary institution",
        "publicPrivate": row.get("CONTROL"), "identifier": row.get("UNITID"),
        "website": row.get("WEBADDR"),
        "registrySource": "National Center for Education Statistics · IPEDS directory (2024)",
        "sourceDate": "2024",
    })

# United States: College Scorecard's latest public field-of-study file. These
# institution/CIP/credential rows describe federal award-history records, not
# each institution's current admissions catalogue or official course title.
scorecard_url = "https://ed-public-download.scorecard.network/downloads/Most-Recent-Cohorts-Field-of-Study_06102026.zip"
scorecard_zip = zipfile.ZipFile(io.BytesIO(download(scorecard_url)))
scorecard_csv = next(name for name in scorecard_zip.namelist() if name.lower().endswith(".csv"))
scorecard_reader = csv.DictReader(io.TextIOWrapper(scorecard_zip.open(scorecard_csv), encoding="utf-8-sig", newline=""))
us_institutions = {item["identifier"]: item for item in institutions if item["country"] == "usa"}
us_source = "U.S. Department of Education · College Scorecard field-of-study file · updated 2026-06-10"
seen_us_programmes = set()
for row in scorecard_reader:
    unitid, cip, credential = (row.get("UNITID", "").strip(), row.get("CIPCODE", "").strip(), row.get("CREDLEV", "").strip())
    programme_name = row.get("CIPDESC", "").strip()
    institution = us_institutions.get(unitid)
    if not (unitid and cip and credential and programme_name and institution):
        continue
    record_id = f"us-programme-{unitid}-{cip}-{credential}"
    if record_id in seen_us_programmes:
        continue
    seen_us_programmes.add(record_id)
    courses.append({
        "id": record_id, "country": "usa", "institutionId": institution["id"],
        "institution": row.get("INSTNM") or institution["name"], "name": programme_name,
        "city": institution.get("city"), "level": row.get("CREDDESC"),
        "subject": f"CIP {cip}", "language": None, "tuition": None, "currency": "USD",
        "registrySource": us_source, "sourceDate": "2026-06-10",
    })

# United Kingdom: current Home Office student-sponsor register. It is a
# visa-sponsor list (including schools/providers), not a course catalogue.
uk_page = download("https://www.gov.uk/government/publications/register-of-licensed-sponsors-students").decode("utf-8", errors="replace")
uk_match = re.search(r'href="(https://assets\.publishing\.service\.gov\.uk/media/[^\"]+\.csv)"', uk_page)
if not uk_match:
    raise RuntimeError("Could not find the current UK student sponsor CSV")
uk_url = uk_match.group(1).replace("&amp;", "&")
uk_page_date = re.search(r"Updated\s+on\s+([0-9]{1,2}\s+[A-Za-z]+\s+[0-9]{4})", uk_page)
uk_date = uk_page_date.group(1) if uk_page_date else TODAY
uk_institutions = {}
for index, row in enumerate(csv_rows(download(uk_url))):
    if row.get("Route", "").strip() != "Student":
        continue
    sponsor = {
        "id": "uk-" + str(index) + "-" + re.sub(r"[^a-z0-9]+", "-", row.get("Sponsor Name", "").lower()).strip("-"),
        "country": "uk", "name": row.get("Sponsor Name"), "city": row.get("Town/City"),
        "campus": row.get("Additional Locations"), "institutionType": row.get("Sponsor Type"),
        "sponsorStatus": row.get("Status"),
        "registrySource": "UK Home Office · Register of licensed student sponsors",
        "sourceDate": uk_date,
    }
    institutions.append(sponsor)

# The HESA / Discover Uni dataset is an openly licensed, current catalogue of
# eligible undergraduate courses. HESA exposes the current dated archive here.
uk_discover_url = "https://unistatsdatasetdownloadfunction.azurewebsites.net/api/UnistatsDatasetDownload"
uk_discover_zip = zipfile.ZipFile(io.BytesIO(download(uk_discover_url)))
uk_discover_root = next(name.split("/")[0] for name in uk_discover_zip.namelist() if name.endswith("/KISCOURSE.csv"))
uk_discover_date = re.match(r"on_(\d{4}_\d{2}_\d{2})", uk_discover_root).group(1).replace("_", "-")
uk_tables = {}
for table in ("INSTITUTION.csv", "LOCATION.csv", "KISCOURSE.csv", "COURSELOCATION.csv", "KISAIM.csv"):
    name = f"{uk_discover_root}/{table}"
    uk_tables[table] = list(csv.DictReader(io.TextIOWrapper(uk_discover_zip.open(name), encoding="utf-8-sig")))

def uk_norm(value):
    return re.sub(r"[^a-z0-9]+", "", (value or "").lower())

uk_names = {uk_norm(item.get("name")): item for item in institutions if item.get("country") == "uk"}
uk_provider_pairs = {}
for row in uk_tables["INSTITUTION.csv"]:
    published_provider_id = row.get("PUBUKPRN", "").strip()
    provider_id = row.get("UKPRN", "").strip()
    if not published_provider_id or not provider_id:
        continue
    provider_name = (row.get("FIRST_TRADING_NAME") or row.get("LEGAL_NAME") or "").strip()
    institution = uk_names.get(uk_norm(provider_name))
    if institution is None:
        institution = {
            "id": "uk-provider-" + published_provider_id + "-" + provider_id, "country": "uk", "name": provider_name,
            "city": (row.get("PROVADDRESS", "").split(",")[-2:-1] or [""])[0].strip(),
            "institutionType": "Discover Uni reporting provider", "sponsorStatus": "Not matched to sponsor register",
        }
        institutions.append(institution)
        uk_names[uk_norm(provider_name)] = institution
    institution["identifier"] = provider_id
    uk_provider_pairs[(published_provider_id, provider_id)] = institution

uk_locations = {(row.get("UKPRN", ""), row.get("LOCID", "")): row for row in uk_tables["LOCATION.csv"]}
uk_aims = {row.get("KISAIMCODE", ""): row.get("KISAIMLABEL", "") for row in uk_tables["KISAIM.csv"]}
uk_course_locations = {}
for row in uk_tables["COURSELOCATION.csv"]:
    key = (row.get("PUBUKPRN"), row.get("UKPRN"), row.get("KISCOURSEID"), row.get("KISMODE"))
    uk_course_locations.setdefault(key, []).append(row.get("LOCID", ""))

uk_course_source = "HESA / Discover Uni 2026 dataset · 2027–28 courses · CC BY 4.0"
uk_course_seen = set()
for row in uk_tables["KISCOURSE.csv"]:
    published_provider_id = row.get("PUBUKPRN", "").strip()
    provider_id = row.get("UKPRN", "").strip()
    institution = uk_provider_pairs.get((published_provider_id, provider_id))
    if not institution:
        continue
    key = (published_provider_id, provider_id, row.get("KISCOURSEID", ""), row.get("KISMODE", ""))
    location_ids = uk_course_locations.get(key) or [""]
    for location_id in location_ids:
        location = uk_locations.get((provider_id, location_id), {})
        city = location.get("LOCNAME", "").strip() or institution.get("city")
        record_id = "uk-course-" + "-".join((published_provider_id, provider_id, row.get("KISCOURSEID", ""), row.get("KISMODE", ""), location_id))
        if record_id in uk_course_seen:
            continue
        uk_course_seen.add(record_id)
        courses.append({
            "id": record_id, "country": "uk", "institutionId": institution["id"],
            "institution": institution.get("name", ""), "name": row.get("TITLE", "").strip(),
            "city": city, "level": "Undergraduate", "subject": uk_aims.get(row.get("KISAIMCODE", "")) or "Undergraduate study",
            "language": "English", "tuition": None, "currency": "GBP",
            "registrySource": uk_course_source, "sourceDate": uk_discover_date,
        })

# Ireland: institutions listed by the Higher Education Authority (publicly
# funded/core-funded HEIs); not all QQI-validated private providers.
ireland_names = [
    "Atlantic Technological University", "Dublin City University",
    "Dun Laoghaire Institute of Art and Design & Technology", "Dundalk Institute of Technology",
    "Mary Immaculate College", "Maynooth University", "Munster Technological University",
    "National College of Art & Design", "RCSI University of Medicine and Health Sciences",
    "Royal Irish Academy", "South East Technological University", "Technological University Dublin",
    "Technological University Shannon: Midlands Midwest", "Trinity College Dublin",
    "University College Cork", "University College Dublin", "University of Galway", "University of Limerick",
]
for name in ireland_names:
    institutions.append({
        "id": "ie-" + re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-"),
        "country": "ireland", "name": name, "institutionType": "HEA-listed higher education institution",
        "registrySource": "Irish Higher Education Authority · Higher Education Institutions",
        "sourceDate": TODAY,
    })

# Germany: ROR's openly licensed research-organization register. ROR contains
# education-type organizations, but it is not the legal state-recognition list.
ror_page = 1
ror_total = None
while ror_total is None or len([item for item in institutions if item["country"] == "germany"]) < ror_total:
    ror_url = f"https://api.ror.org/v2/organizations?query.advanced=locations.geonames_details.country_code:DE&filter=types:Education&page={ror_page}"
    payload = json.loads(download(ror_url))
    ror_total = payload["number_of_results"]
    if not payload.get("items"):
        break
    for row in payload["items"]:
        loc = next((location.get("geonames_details", {}) for location in row.get("locations", []) if location.get("geonames_details", {}).get("country_code") == "DE"), {})
        institutions.append({
            "id": "de-" + row.get("id", "").rsplit("/", 1)[-1], "country": "germany",
            "name": row.get("names", [{}])[0].get("value") if row.get("names") else row.get("id"),
            "city": loc.get("name"), "region": loc.get("country_subdivision_name"),
            "institutionType": ", ".join(row.get("types", [])),
            "identifier": row.get("id"),
            "registrySource": "Research Organization Registry (ROR) · Education type · CC0",
            "sourceDate": row.get("admin", {}).get("last_modified", {}).get("date", TODAY),
        })
    ror_page += 1

# Australia: CRICOS institutions and active registered courses, including published tuition.
pkg = json.loads(download("https://data.gov.au/data/api/3/action/package_show?id=e5ae7059-bfa8-4fa4-a5c0-c13cf3520193"))["result"]
resources = {resource["name"]: resource["url"] for resource in pkg["resources"]}
inst_csv = next(url for name, url in resources.items() if name == "CRICOS Institutions.csv")
course_csv = next(url for name, url in resources.items() if name == "CRICOS Courses.csv")
aus_source = "Australian Government · CRICOS export · CC BY 2.5 Australia"
providers = {}
for row in csv_rows(download(inst_csv)):
    code = row.get("CRICOS Provider Code", "").strip()
    if not code:
        continue
    providers[code] = {
        "id": "au-" + code, "country": "australia",
        "name": row.get("Institution Name") or row.get("Trading Name"),
        "tradingName": row.get("Trading Name"), "city": row.get("Postal Address City"),
        "region": row.get("Postal Address State"), "institutionType": row.get("Institution Type"),
        "identifier": code, "website": row.get("Website"),
        "registrySource": aus_source, "sourceDate": "2026-04-13",
    }
institutions.extend(providers.values())
for row in csv_rows(download(course_csv)):
    if row.get("Expired", "").strip().lower() == "yes":
        continue
    provider_code = row.get("CRICOS Provider Code", "").strip()
    course_code = row.get("CRICOS Course Code", "").strip()
    fee_raw = row.get("Tuition Fee", "").strip()
    fee = re.sub(r"[^0-9.]", "", fee_raw)
    courses.append({
        "id": "au-course-" + provider_code + "-" + course_code,
        "country": "australia", "institutionId": "au-" + provider_code,
        "institution": row.get("Institution Name"), "name": row.get("Course Name"),
        "city": providers.get(provider_code, {}).get("city"),
        "level": row.get("Course Level"), "subject": row.get("Field of Education 1 Narrow Field"),
        "language": row.get("Course Language"), "durationWeeks": row.get("Duration (Weeks)"),
        "tuition": float(fee) if fee else None, "currency": "AUD" if fee else None,
        "nonTuitionFee": row.get("Non Tuition Fee"), "estimatedTotalCost": row.get("Estimated Total Course Cost"),
        "registrySource": aus_source, "sourceDate": "2026-04-13",
    })

coverage = {
        "france": "245 higher-education institution entries plus 2026 Parcoursup undergraduate programme catalogue. Parcoursup records do not include tuition.",
        "canada": "All post-secondary designated learning institution campus rows; source is a study-permit designation list, not a full course/fee catalogue.",
        "usa": "IPEDS institutions (2024) plus U.S. Department of Education College Scorecard field/credential history (updated 2026-06-10). Programme rows reflect reported award cohorts, not a current admissions catalogue; no programme-level tuition is included.",
        "australia": "CRICOS provider records and non-expired registered courses with published tuition (snapshot 2026-04-13).",
        "uk": f"Student-route sponsor register plus {len([item for item in courses if item['country'] == 'uk']):,} eligible undergraduate course/location records for 2027–28 from HESA Discover Uni 2026; tuition is not included.",
        "germany": "ROR education-type organization records (CC0); broad research-organizations data, not a complete legal list of state-recognized universities.",
        "ireland": "HEA-listed publicly funded/core-funded higher education institutions; not all QQI-validated private providers.",
}
OUT_DIR.mkdir(parents=True, exist_ok=True)
country_slugs = ["france", "uk", "usa", "canada", "germany", "australia", "ireland"]
manifest = {"schemaVersion": 1, "refreshedAt": TODAY, "countries": {}}
for country in country_slugs:
    country_institutions = [item for item in institutions if item["country"] == country]
    country_courses = [item for item in courses if item["country"] == country]
    (OUT_DIR / f"{country}.json").write_text(json.dumps({
        "country": country, "refreshedAt": TODAY, "institutions": country_institutions,
    }, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    course_sources = sorted({item.get("registrySource") for item in country_courses if item.get("registrySource")})
    course_dates = sorted({item.get("sourceDate") for item in country_courses if item.get("sourceDate")})
    compact_courses = [
        {key: value for key, value in item.items() if key not in ("registrySource", "sourceDate")}
        if len(course_sources) == 1 and len(course_dates) == 1 else item
        for item in country_courses
    ]
    (OUT_DIR / f"{country}-courses.json").write_text(json.dumps({
        "country": country, "refreshedAt": TODAY,
        "courseSource": course_sources[0] if len(course_sources) == 1 else None,
        "courseSourceDate": course_dates[0] if len(course_dates) == 1 else None,
        "courses": compact_courses,
    }, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    manifest["countries"][country] = {
        "institutionCount": len(country_institutions), "courseCount": len(country_courses),
        "uniqueInstitutionCount": len({re.sub(r"[^a-z0-9]+", "", item.get("name", "").lower()) for item in country_institutions if item.get("name")}),
        "coverage": coverage[country],
    }
(OUT_DIR / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {len(institutions)} institution/campus records and {len(courses)} course records into {OUT_DIR}")
