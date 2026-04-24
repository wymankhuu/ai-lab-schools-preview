import { redirect } from "react-router";

export async function clientLoader() {
  return redirect("/ai-lab-schools");
}

export default function Home() {
  return null;
}
