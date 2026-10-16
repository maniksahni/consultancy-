#!/usr/bin/env python3
"""Build compact, lazy-loaded home finder suggestions from published registries."""
import json
from collections import Counter, defaultdict
from pathlib import Path
import unicodedata

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "public/data/universities"
COUNTRIES = ("france", "uk", "usa", "canada", "germany", "ireland", "australia")


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def normalized(value):
    return "".join(char for char in unicodedata.normalize("NFD", value.casefold()) if not unicodedata.combining(char))


prefix_indexes = defaultdict(dict)
for country in COUNTRIES:
    course_file = DATA / f"{country}-courses.json"
    if course_file.exists():
        for row in read(course_file).get("courses", []):
            for kind, value in (
                ("course", row.get("name")),
                ("subject", row.get("subject")),
                ("university", row.get("institution")),
            ):
                label = (value or "").strip()
                if label:
                    prefix = normalized(label)[:1]
                    prefix_indexes[prefix][(country, kind, label.casefold())] = [country, kind, label]

    institution_file = DATA / f"{country}.json"
    counts = Counter()
    preferred = defaultdict(Counter)
    for row in read(institution_file).get("institutions", []):
        city = (row.get("city") or "").strip()
        if city:
            key = city.casefold()
            counts[key] += 1
            preferred[key][city] += 1
    locations = []
    if counts:
        for key, count in counts.most_common(15):
            # Prefer conventional mixed-case source labels over all-caps variants.
            label = max(preferred[key], key=lambda name: (name != name.upper(), preferred[key][name]))
            locations.append({"city": label, "records": count, "kind": "institutions"})
    elif course_file.exists():
        course_cities = Counter((row.get("city") or "").strip() for row in read(course_file).get("courses", []) if (row.get("city") or "").strip())
        locations = [{"city": name, "records": count, "kind": "courses"} for name, count in course_cities.most_common(15)]
    (DATA / "home-search" / f"{country}-cities.json").write_text(
        json.dumps(locations, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8"
    )

prefix_dir = DATA / "home-search" / "prefixes"
prefix_dir.mkdir(parents=True, exist_ok=True)
for stale in (DATA / "home-search").glob("*.json"):
    if not stale.name.endswith("-cities.json"):
        stale.unlink()
for stale in prefix_dir.glob("*.json"):
    stale.unlink()
for prefix, entries in prefix_indexes.items():
    kind_order = {"course": 0, "subject": 1, "university": 2}
    ordered_entries = sorted(entries.values(), key=lambda entry: (kind_order[entry[1]], normalized(entry[2]), entry[0]))
    (prefix_dir / f"{prefix.encode('utf-8').hex()}.json").write_text(
        json.dumps(ordered_entries, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8"
    )
