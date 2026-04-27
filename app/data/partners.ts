import ciobLogo from "../logos/ciob.png";
import colossalLogo from "../logos/colossal.png";
import crosstownLogo from "../logos/crosstown.webp";
import daVinciLogo from "../logos/da-vinci.png";
import edenParkLogo from "../logos/eden-park.png";
import kindleLogo from "../logos/kindle.png";
import madisonLogo from "../logos/madison.png";
import moxieLogo from "../logos/moxie.png";
import newVillageLogo from "../logos/new-village.png";
import powerLogo from "../logos/power.png";
import tempeLogo from "../logos/tempe.png";
import valorLogo from "../logos/valor.png";
import wlaLogo from "../logos/wla.jpg";

export type Pathway = "Launch" | "Pivot";

export type Partner = {
  id: string;
  school: string;
  city: string;
  state: string;
  pathway: Pathway;
  descriptor: string;
  description?: string;
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
    school: "MOXIE",
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
    school: "CityLab High School for Public Good, CIOB",
    city: "New York",
    state: "NY",
    pathway: "Pivot",
    descriptor:
      "A Consortium high school weaving AI into its community-connected, competency-based model.",
    description:
      "CityLab High School for Public Good is a new NYC public high school opening in Fall 2027, where students learn by doing work that matters. Through interdisciplinary, competency-based projects rooted in real community challenges, students are agents of their own learning and contributors to their communities. As co-designers of the school itself, students shape the culture and direction of CityLab. Our signature Public Good Projects, Education and Learning Pathway, and Adult Learning Lab are being designed to position the school as both a demonstration of student-centered learning and a resource for the broader field.",
    lat: 40.7128,
    lng: -74.006,
    logo: ciobLogo,
    offsetX: 55,
    offsetY: -30,
  },
  {
    id: "valor",
    school: "Valor Collegiate",
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
    school: "New Village Academy, AACPS",
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
    school: "Arredondo Immersive 9, Tempe ESD",
    city: "Tempe",
    state: "AZ",
    pathway: "Pivot",
    descriptor:
      "A K-5 district school pivoting to a competency-based, immersive model with VR, robotics, and project labs.",
    description:
      "At The Immersive 9 at Arredondo, we don't just teach, we immerse. Our campus unlocks the potential of gifted learners by blending emerging technology with tangible prototyping to feed their passions. Our students live their subjects, navigating an ecosystem where they learn through discovery to turn insatiable curiosity into real-world contribution.\n\nOur mission is to foster mastery through rigorous, globally connected experiences that transform classrooms into labs of imagination. Guided by Instructional Experience Designers, learning architects who step into every experience alongside their students, learners engage in tech-enhanced and design-build environments that spark wonder, celebrate the power of creation, and prepare them to lead in their local communities and the world.",
    lat: 33.4255,
    lng: -111.94,
    logo: tempeLogo,
  },
  {
    id: "eden-park",
    school: "Eden Park K-5, Wayside Schools",
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
    city: "Fort Lauderdale",
    state: "FL",
    pathway: "Pivot",
    descriptor:
      "A microschool network where students design and launch real AI businesses through a Launch Pad model.",
    description:
      "Colossal Academy is a future-forward microschool network grounded in something timeless: human connection. While preparing students for an AI-driven world, its model remains deeply human, community-driven, and relationship-based, where students are known, seen, and supported, educators serve as curators, and families are active partners in the learning journey. Through experiential, real-world learning, students build businesses, engage with their communities, and develop both academic mastery and life skills with purpose and relevance. By blending rigorous academics with entrepreneurship, creativity, and meaningful relationships, Colossal Academy equips students not only to navigate the future, but to shape it with confidence, agency, and a strong sense of self.",
    lat: 26.1224,
    lng: -80.1373,
    logo: colossalLogo,
  },
  {
    id: "kindle",
    school: "Kindle Education",
    city: "Jersey City",
    state: "NJ",
    pathway: "Launch",
    descriptor:
      "A competency-based charter in one of the most diverse cities in the US, already using AI for equity.",
    description:
      "Kindle Education is building a different kind of public school. Through project-based and competency-based learning, students do challenging work that builds knowledge, purpose, and agency. We prepare young people not just to succeed in the world as it is, but to help shape what it becomes.",
    lat: 40.7178,
    lng: -74.0431,
    logo: kindleLogo,
    offsetX: -65,
    offsetY: 10,
  },
  {
    id: "wla",
    school: "Washington Leadership Academy",
    city: "Washington",
    state: "DC",
    pathway: "Pivot",
    descriptor:
      "DC's first tech-focused public high school, with a four-year CS requirement and AI Ambassadors program.",
    description:
      "Washington Leadership Academy is a 9-12 open-enrollment public charter high school in Washington, DC. Founded in 2016 with the mission to prepare students to thrive in the world and change it for the better, WLA was the first school in DC to require four years of computer science, ensuring students develop the skills to be builders of technology rather than just consumers. In recent years, WLA has extended this work into the age of artificial intelligence, integrating AI into teaching and learning in ways that are thoughtful, responsible, and equity-centered. WLA is focused on ensuring that students not only use AI tools, but also understand, question, and shape them. At the same time, WLA is intentionally designing models and systems that can be scaled beyond its classrooms, with the goal of ensuring all students across Washington, DC and beyond have access to meaningful, future-ready learning experiences.",
    lat: 38.9072,
    lng: -77.0369,
    logo: wlaLogo,
    offsetX: 35,
    offsetY: 55,
  },
  {
    id: "madison",
    school: "Madison HS, FCPS",
    city: "Fairfax",
    state: "VA",
    pathway: "Pivot",
    descriptor:
      "A 2,099-student public high school running mastery-based grading and a district-backed Skills for the Future pilot.",
    description:
      "Madison High School is a large, high-performing comprehensive school in Fairfax County, Virginia, recognized for academic excellence and innovation, and is guided by its student-created vision, \"Building Community. Igniting Passions. Inspiring Excellence.\"",
    lat: 38.8462,
    lng: -77.306,
    logo: madisonLogo,
    offsetX: -60,
    offsetY: 55,
  },
  {
    id: "crosstown",
    school: "Crosstown High",
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
    school: "The Levitt Lab at Da Vinci Connect, powered by ASU Prep",
    city: "El Segundo",
    state: "CA",
    pathway: "Launch",
    descriptor:
      "A brand-new high school co-designed with Levitt Lab and ASU where AI is built in from day one.",
    description:
      "The Levitt Lab at Da Vinci Connect, powered by ASU Prep is a hybrid high school located in El Segundo. Da Vinci Schools has partnered with The Levitt Lab and Arizona State University's innovative network of public schools to blend world-class academics with bold new ways of learning, empowering students to lead with curiosity and purpose. Students attend classes on campus four days per week and complete one day of coursework remotely from anywhere. This flexible 4+1 learning experience includes online coursework, Socratic-style discussions and hands-on projects that tackle real-world problems.",
    lat: 33.9192,
    lng: -118.4165,
    logo: daVinciLogo,
  },
];

export const partners: Partner[] = [...partnersUnsorted].sort((a, b) =>
  a.school.localeCompare(b.school, "en", { sensitivity: "base" }),
);
