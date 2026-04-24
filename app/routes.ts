import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("ai-lab-schools", "routes/ai-lab-schools.tsx"),
  route("ai-lab-schools/experience", "routes/experience.tsx"),
] satisfies RouteConfig;
