import { MetadataRoute } from 'next'
import { db, blogs } from '@/lib/db'
import { desc } from 'drizzle-orm'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://genuinepracticalhomoeopathy.com'

    // Static routes
    const routes = [
        '',
        '/about',
        '/services',
        '/contact',
        '/blogs',
        '/courses',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes (blogs)
    let blogRoutes: MetadataRoute.Sitemap = []
    try {
        const allBlogs = await db
            .select({ id: blogs.id, publishedAt: blogs.publishedAt })
            .from(blogs)
            .orderBy(desc(blogs.publishedAt));

        blogRoutes = allBlogs.map(blog => ({
            url: `${baseUrl}/blogs/${blog.id}`,
            lastModified: blog.publishedAt ? new Date(blog.publishedAt) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7
        }))
    } catch (error) {
        console.error("Error fetching blogs for sitemap:", error)
    }

    return [...routes, ...blogRoutes]
}
