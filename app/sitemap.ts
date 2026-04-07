import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.hubrocket.com.br'

  // Rotas estáticas institucionais
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#leadership`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#custom-dev`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Placeholder para rotas dinâmicas (serviços, blog, portfólio)
  // No futuro, busque os slugs do banco de dados/CMS aqui.
  /*
  const dynamicRoutes = async () => {
    // const services = await fetchServices()
    // return services.map(s => ({ url: `${baseUrl}/servicos/${s.slug}`, ... }))
  }
  */

  return [...staticRoutes]
}
