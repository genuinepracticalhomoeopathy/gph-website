import { MetadataRoute } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

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
        const blogsQuery = query(collection(db, 'blogs'), orderBy('publishedAt', 'desc'));
        const snapshot = await getDocs(blogsQuery);
        blogRoutes = snapshot.docs.map(doc => ({
            url: `${baseUrl}/blogs/${doc.id}`,
            lastModified: new Date(doc.data().publishedAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7
        }))
    } catch (error) {
        console.error("Error fetching blogs for sitemap:", error)
    }

    return [...routes, ...blogRoutes]
}
