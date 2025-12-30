import { HeadToHead } from '../../data/sim/f1/simDataTypes';
<script lang="ts" setup>
import { HeadToHead } from '@/data/sim/f1/simDataTypes';
import { ref, onMounted } from 'vue';

const props = defineProps<{
  headToHead: HeadToHead;
}>();
const emit = defineEmits(['close']);

const dialogRef = ref<HTMLDialogElement>(null);

const close = () => {
  dialogRef.value.close();
  emit('close');
}

onMounted(() => {
  dialogRef.value.showModal();
})

</script>
<template>
  <dialog ref="dialogRef" class="h2h-dialog">
    <div class="close-button" @click="close">Close</div>
  </dialog>
</template>