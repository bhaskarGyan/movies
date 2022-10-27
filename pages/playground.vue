<script setup>
import DateFns from '@/utils/asyncDateFns'

await DateFns.init()
const { compareAsc, format } = DateFns.DateFns
const formattedDate = format(new Date(2014, 1, 11), 'yyyy-MM-dd')

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
]
dates.sort(compareAsc)
</script>

<template>
  <div>
    <lazy-v-carousel />

    <p> Date : {{ dates }}</p>
    <p>
      formattedDate : {{ formattedDate }}
    </p>
  </div>
</template>

<style lang="scss" scoped>

</style>
