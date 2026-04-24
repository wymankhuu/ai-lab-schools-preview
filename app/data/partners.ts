import ciobLogo from "../logos/ciob.jpeg";
import colossalLogo from "../logos/colossal.png";
import crosstownLogo from "../logos/crosstown.webp";
import daVinciLogo from "../logos/da-vinci.png";
import edenParkLogo from "../logos/eden-park.png";
import kindleLogo from "../logos/kindle.webp";
import madisonLogo from "../logos/madison.png";
import moxieLogo from "../logos/moxie.png";
import newVillageLogo from "../logos/new-village.png";
import powerLogo from "../logos/power.png";
import tempeLogo from "../logos/tempe.png";
import valorLogo from "../logos/valor.png";
import wlaLogo from "../logos/wla.svg";

export type Pathway = "Launch" | "Pivot";

export type Partner = {
  id: string;
  school: string;
  leader: string;
  city: string;
  state: string;
  pathway: Pathway;
  descriptor: string;
  lat: number;
  lng: number;
  logo: string;
  // Pixel offsets applied on the map to pull a pin away from a cluster.
  // A leader line is drawn from the true coordinate to the offset pin.
  offsetX?: number;
  offsetY?: number;
  // Per-partner logo scale (default 1). Raise for logos that have
  // lots of internal whitespace and read too small at pin size.
  logoScale?: number;
};

const partnersUnsorted: Partner[] = [
  {
    id: "moxie",
    school: "MOXIE / Aurora Institute",
    leader: "Beth Rabbitt",
    city: "Portland",
    state: "ME",
    pathway: "Launch",
    descriptor:
      "A new competency-based charter school opening Fall 2026 with a founding team rooted in learning science.",
    lat: 43.6591,
    lng: -70.2568,
    logo: moxieLogo,
  },
  {
    id: "ciob",
    school: "CIOB / NYC Consortium School",
    leader: "Christy Kingham",
    city: "New York",
    state: "NY",
    pathway: "Pivot",
    descriptor:
      "A Consortium high school weaving AI into its community-connected, competency-based model.",
    lat: 40.7128,
    lng: -74.006,
    logo: ciobLogo,
    offsetX: 55,
    offsetY: -30,
  },
  {
    id: "valor",
    school: "Valor Collegiate Microschool",
    leader: "Daren Dickson",
    city: "Nashville",
    state: "TN",
    pathway: "Launch",
    descriptor:
      "A new microschool anchoring Tennessee's AI ecosystem, launching under the Valor Collegiate umbrella.",
    lat: 36.1627,
    lng: -86.7816,
    logo: valorLogo,
  },
  {
    id: "new-village",
    school: "New Village Academy / AACPS",
    leader: "Romey Pittman",
    city: "Annapolis",
    state: "MD",
    pathway: "Launch",
    descriptor:
      "A charter school opening August 2026 blending Big Picture Learning, Modern Classrooms, and Building 21.",
    lat: 38.9784,
    lng: -76.4922,
    logo: newVillageLogo,
    offsetX: 55,
    offsetY: -45,
    logoScale: 1.25,
  },
  {
    id: "tempe",
    school: "Tempe ESD / Arredondo Immersive 9",
    leader: "Jennifer Nusbaum",
    city: "Tempe",
    state: "AZ",
    pathway: "Pivot",
    descriptor:
      "A K-5 district school pivoting to a competency-based, immersive model with VR, robotics, and project labs.",
    lat: 33.4255,
    lng: -111.94,
    logo: tempeLogo,
  },
  {
    id: "eden-park",
    school: "Eden Park K-5 / Wayside Schools",
    leader: "Susan Pommerening",
    city: "Austin",
    state: "TX",
    pathway: "Pivot",
    descriptor:
      "An elementary charter serving immigrant and high-poverty families, flipping the school day to put agency first.",
    lat: 30.2672,
    lng: -97.7431,
    logo: edenParkLogo,
  },
  {
    id: "power",
    school: "Power Public Schools",
    leader: "China Cardriche-Clements",
    city: "South Cobb",
    state: "GA",
    pathway: "Launch",
    descriptor:
      "A community-built charter opening 2027 with proprietary AI tools designed around human flourishing.",
    lat: 33.8595,
    lng: -84.5985,
    logo: powerLogo,
  },
  {
    id: "colossal",
    school: "Colossal Academy",
    leader: "Shiren Rattigan",
    city: "Fort Lauderdale",
    state: "FL",
    pathway: "Pivot",
    descriptor:
      "A microschool network where students design and launch real AI businesses through a Launch Pad model.",
    lat: 26.1224,
    lng: -80.1373,
    logo: colossalLogo,
  },
  {
    id: "kindle",
    school: "Kindle Education",
    leader: "DJ Hartigan",
    city: "Jersey City",
    state: "NJ",
    pathway: "Launch",
    descriptor:
      "A competency-based charter in one of the most diverse cities in the US, already using AI for equity.",
    lat: 40.7178,
    lng: -74.0431,
    logo: kindleLogo,
    offsetX: -65,
    offsetY: 10,
  },
  {
    id: "wla",
    school: "Washington Leadership Academy",
    leader: "Adam Browning",
    city: "Washington",
    state: "DC",
    pathway: "Pivot",
    descriptor:
      "DC's first tech-focused public high school, with a four-year CS requirement and AI Ambassadors program.",
    lat: 38.9072,
    lng: -77.0369,
    logo: wlaLogo,
    offsetX: 35,
    offsetY: 55,
  },
  {
    id: "madison",
    school: "Madison HS / FCPS",
    leader: "Liz Calvert",
    city: "Fairfax",
    state: "VA",
    pathway: "Pivot",
    descriptor:
      "A 2,099-student public high school running mastery-based grading and a district-backed Skills for the Future pilot.",
    lat: 38.8462,
    lng: -77.306,
    logo: madisonLogo,
    offsetX: -60,
    offsetY: 55,
  },
  {
    id: "crosstown",
    school: "Crosstown High / STEMWorx",
    leader: "Nikki Wallace",
    city: "Memphis",
    state: "TN",
    pathway: "Pivot",
    descriptor:
      "A project-based charter co-designing an open-source LMS built around interdisciplinary learning.",
    lat: 35.1495,
    lng: -90.049,
    logo: crosstownLogo,
  },
  {
    id: "da-vinci",
    school: "Da Vinci Schools / Levitt Lab",
    leader: "Russell Stoll",
    city: "El Segundo",
    state: "CA",
    pathway: "Launch",
    descriptor:
      "A brand-new high school co-designed with Levitt Lab and ASU where AI is built in from day one.",
    lat: 33.9192,
    lng: -118.4165,
    logo: daVinciLogo,
  },
];

export const partners: Partner[] = [...partnersUnsorted].sort((a, b) =>
  a.school.localeCompare(b.school, "en", { sensitivity: "base" }),
);
