import { onMounted, onUnmounted, ref, Ref } from 'vue';

type ReturnType = {
    windowWidth: Ref<number>
}

export function useWindowWidth(): ReturnType
{
    const windowWidth = ref<number>(0);

    function updateWindowWidth(): void
    {
        windowWidth.value = window.innerWidth;
    }

    onMounted(() => {
        updateWindowWidth();
        window.addEventListener('resize', updateWindowWidth);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateWindowWidth);
    });

    return { windowWidth };
}