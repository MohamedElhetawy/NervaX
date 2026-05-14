import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const projects = await getProjects();

    const projectEntries = projects.map((project) => ({
      url: `https://nerva-x.vercel.app/projects/${project.slug}`,
      lastModified: new Date(project.created_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [
      {
        url: 'https://nerva-x.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: 'https://nerva-x.vercel.app/about',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: 'https://nerva-x.vercel.app/projects',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://nerva-x.vercel.app/contact',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      ...projectEntries,
    ];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    // Return basic sitemap if there's an error
    return [
      {
        url: 'https://nerva-x.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: 'https://nerva-x.vercel.app/about',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: 'https://nerva-x.vercel.app/projects',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://nerva-x.vercel.app/contact',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
    ];
  }
}
