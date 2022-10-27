<script setup lang="ts">
import { format, intervalToDuration } from 'date-fns'
import type { MediaType } from '~/types'
import { QUERY_LIST } from '~/constants/lists'

const formattedDate = format(new Date(2014, 1, 11), 'yyyy-MM-dd')
const duration = intervalToDuration({ start: 0, end: 1000 * 1000 })
const route = useRoute()
const type = $computed(() => route.params.type as MediaType || 'movie')

const queries = $computed(() => [
  QUERY_LIST.movie[0],
  QUERY_LIST.tv[0],
])

const AsyncWrapper = defineComponent(async (_, ctx) => {
  const list = await listMedia(type, queries[0].query, 1)
  const item = await getMedia(type, list.results[0].id)
  return () => ctx.slots?.default?.({ item })
})
</script>

<template>
  <div>
    <AsyncWrapper>
      <template #default="{ item }">
        <NuxtLink :to="`/${type}/${item.id}`">
          <MediaHero :item="item" />
        </NuxtLink>
      </template>
    </AsyncWrapper>
    <CarouselAutoQuery
      v-for="query of queries"
      :key="query.type + query.query"
      :query="query"
    />
    <TheFooter />
  </div>
</template>
