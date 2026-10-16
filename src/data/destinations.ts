export const destinations = [
  {
    slug: "france",
    name: "France",
    city: "Paris · Lyon · Bordeaux",
    region: "Europe",
    mood: "Art de vivre. A mind without borders.",
    focus: "Business, sciences & creative disciplines",
    source: "https://www.campusfrance.org/en",
    publisher: "Campus France",
    application:
      "Explore the university programme, then check whether Études en France applies to your nationality and residence.",
    planning:
      "Compare public universities, grandes écoles and specialist schools. Check the teaching language for your specific track.",
  },
  {
    slug: "uk",
    name: "United Kingdom",
    city: "London · Edinburgh · Manchester",
    region: "Europe",
    mood: "Tradition with a new perspective.",
    focus: "Specialist study & academic heritage",
    source: "https://study-uk.britishcouncil.org/",
    publisher: "British Council · Study UK",
    application:
      "Check the institution’s application route. Undergraduate and postgraduate applications can follow different processes.",
    planning:
      "Compare course structure, duration and total costs. Use Study UK to explore funding and preparation for student life.",
  },
  {
    slug: "usa",
    name: "United States",
    city: "New York · Boston · San Francisco",
    region: "North America",
    mood: "Big ideas. Your own direction.",
    focus: "Research & flexible academic pathways",
    source: "https://educationusa.state.gov/",
    publisher: "EducationUSA",
    application:
      "Follow EducationUSA’s five steps: research options, finance studies, complete applications, apply for a student visa and prepare for departure.",
    planning:
      "Build your shortlist around the specific department, curriculum and funding opportunities, rather than the institution name alone.",
  },
  {
    slug: "canada",
    name: "Canada",
    city: "Toronto · Montréal · Vancouver",
    region: "North America",
    mood: "A fresh outlook, naturally.",
    focus: "Universities, colleges & bilingual options",
    source: "https://www.educanada.ca/",
    publisher: "EduCanada",
    application:
      "Research institutions and programmes through EduCanada, then check the institution’s entry requirements and official study-permit guidance.",
    planning:
      "Compare programme type, language and location. Check housing availability and the full study budget before committing.",
  },
  {
    slug: "germany",
    name: "Germany",
    city: "Berlin · Munich · Heidelberg",
    region: "Europe",
    mood: "Precision meets possibility.",
    focus: "Engineering, sciences & research",
    source: "https://www.daad.de/en/studying-in-germany/",
    publisher: "DAAD",
    application:
      "Use DAAD to research programmes and admission requirements. Confirm whether your chosen university accepts direct or uni-assist applications.",
    planning:
      "Check recognition of your qualifications, teaching language and programme-specific fees. German and English tracks can have different requirements.",
  },
  {
    slug: "australia",
    name: "Australia",
    city: "Sydney · Melbourne · Brisbane",
    region: "Oceania",
    mood: "A brighter kind of beginning.",
    focus: "Campus life & diverse study pathways",
    source: "https://www.studyaustralia.gov.au/",
    publisher: "Study Australia",
    application:
      "Research your course and provider through Study Australia, then confirm the application and acceptance steps with the institution.",
    planning:
      "Compare campus location, curriculum and the complete cost of living. Use official guidance when preparing your student visa application.",
  },
  {
    slug: "ireland",
    name: "Ireland",
    city: "Dublin · Cork · Galway",
    region: "Europe",
    mood: "Small island. Expansive thinking.",
    focus: "English-language study & connected campuses",
    source: "https://www.educationinireland.com/en/",
    publisher: "Education in Ireland",
    application:
      "Explore recognised institutions through Education in Ireland, then follow your chosen institution’s course-specific application process.",
    planning:
      "Research course fit, funding and accommodation early. Check official immigration guidance for your nationality and duration of study.",
  },
] as const;

export const destinationHref = (slug: string) =>
  slug === "france" ? "/study-in-france" : `/destinations/${slug}`;
