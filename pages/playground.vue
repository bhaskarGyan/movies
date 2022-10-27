<script setup>
import { compareAsc, format } from 'date-fns'

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
    <v-carousel />

    <p> Date : {{ dates }}</p>
    <p>
      formattedDate : {{ formattedDate }}
    </p>
  </div>
</template>

<style lang="scss" scoped>

</style>
