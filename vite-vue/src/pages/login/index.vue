

<template>
  <h1>{{ '12312312312' }}</h1>
</template>

<script setup lang="ts">
import { ref,Ref } from 'vue'

defineProps<{ msg: string }>()

const count:Ref<number> = ref(0)

const clicks = () =>{
  count.value++
  console.log(1);
}

</script>


<style scoped>
</style>
