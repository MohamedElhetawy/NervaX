import { getFeaturedProjects } from "@/lib/projects";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  return <HomeClient featuredProjects={featuredProjects} />;
}
