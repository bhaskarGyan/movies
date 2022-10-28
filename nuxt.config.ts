const isDev = process.env.NODE_ENV === 'development'
import { hash as ohash } from 'ohash'
// const apiBaseUrl = 'http://localhost:3001'
const apiBaseUrl = 'https://movies-proxy.vercel.app'
interface Device {
  userAgent: string
  isDesktop: boolean
  isIos: boolean
  isAndroid: boolean
  isMobile: boolean
  isMobileOrTablet: boolean
  isDesktopOrTablet: boolean
  isTablet: boolean
  isWindows: boolean
  isMacOS: boolean
  isApple: boolean
  isSafari: boolean
  isFirefox: boolean
  isEdge: boolean
  isChrome: boolean
  isSamsung: boolean
  isCrawler: boolean
}
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    ['nuxt-cache-ssr', {
      // Can be disable per enviroment, like in dev
      enabled: true,
      store: {
        // Plceholder for store type, will be usable after Redis Release
        type: 'memory',
        // maximum number of pages to store in memory
        // if limit is reached, least recently used page
        // is removed.
        max: 500,
        // number of Millisecond to store this page in cache
        ttl: 1000 * 60 * 180// 3 hour
      },
      pages: [
        '/movie',
        '/tv',
        '/'
      ],
      key: (route: string, headers: any, device: Device) => {
        const { userAgent, ...deviceType } = device
        const key = [route];
        Object.keys(deviceType).forEach(val => {
          if (deviceType[val] && !val.includes('Tablet') && (val.includes('isMobile')  || val.includes('isDesktop')  || val.includes('isCrawler'))) {
            key.push(val)
          }
        })
        //  console.log(key)
        return key.join("-")
      }
    }]
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl,
    },
  },
  image: {
    provider: 'proxy',
    providers: {
      proxy: {
        provider: 'ipx',
        options: {
          baseURL: `${apiBaseUrl}/ipx`,
        },
      },
    },
  },
})
