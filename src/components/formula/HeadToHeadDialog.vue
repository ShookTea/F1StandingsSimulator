import { HeadToHead } from '../../data/sim/f1/simDataTypes';
<script lang="ts" setup>
import { HeadToHead } from '@/data/sim/f1/simDataTypes';
import { ref, onMounted, computed } from 'vue';

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

const ordinal = computed<string>(() => {
  const position = props.headToHead.leadPosition % 100;
  if (position > 3 && position <= 20) {
    return `${position}th`;
  }
  if (position % 10 === 1) {
    return `${position}st`;
  }
  if (position % 10 === 2) {
    return `${position}nd`;
  }
  if (position % 10 === 3) {
    return `${position}rd`;
  }
  return `${position}th`;
});

</script>
<template>
  <dialog ref="dialogRef" class="h2h-dialog">
    <div class="dialog-heading">
      <div class="close-button" @click="close">
        <v-icon name="bi-x-lg"/>
        Close
      </div>
      <h3>Battle for {{ ordinal }} place</h3>
    </div>
    <div class="dialog-content"></div>
  </dialog>
</template>

<style scoped>
  .h2h-dialog {
    width: 70vw;
    height: 70vh;
    display: flex;
    flex-direction: column;
  }

  .dialog-heading {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .dialog-heading h3 {
    flex-grow: 1;
    padding-left: 2em;
    font-size: 1.5em;
  }

  .dialog-content {
    flex-grow: 1;
    overflow-y: auto;
  }
</style>