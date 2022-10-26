// import LRU from 'lru-cache';
import { caching } from 'cache-manager'


const DefaultOptionsLRU = {
    max: 500,
    ttl: 1000 * 60,
}
interface InMemory {
    initialized: boolean
}
class InMemoryCache {
    cached: any;

    constructor(options = {}) {
        this.cached = {}
    }

    async get(key) {

        const result = await this.cached.get(key)
        return result
    }

    async set(key, value) {

        await this.cached.set(key, value)
    }

    async init() {
        this.cached = await caching('memory', {
            max: 500,
            ttl: 1000 * 60 * 180 // 3 hours
        })
    }

}



export default new InMemoryCache()