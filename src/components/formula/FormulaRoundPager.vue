<script lang="ts" setup>
import FormulaRoundPagerButton from '@/components/formula/FormulaRoundPagerButton.vue';
import FormulaRoundPagerStepView from '@/components/formula/FormulaRoundPagerStepView.vue';

interface Props {
    label: string
    routeKey: string
    maxPages: number
}

defineProps<Props>();

</script>
<template>
    <div id="simulation-pager">
        <div id="simulation-pager-switcher">
            <formula-round-pager-button :enabled="page > 1" left
                                        @step="goTo(page - 1)" @max="goTo(1)"
                                        step-label="&lt;" max-label="«"/>
            <formula-round-pager-step-view :page="page" :max-pages="maxPages"/>
            <formula-round-pager-button :enabled="page < maxPages" right
                                        @step=" goTo(page + 1)" @max="goTo(maxPages)"
                                        step-label="&gt;" max-label="»"/>
        </div>
        <div id="current-page-description">{{ label }}</div>
    </div>
</template>

<script lang="ts">
export default {
    computed: {
        page() {
            return parseInt(this.$route.params[this.routeKey]);
        }
    },
    methods: {
        async goTo(newPage: number) {
            const pathTemplate: string = this.$route.matched[0].path;
            const solvedPath: string = pathTemplate.replace(`:${this.routeKey}`, `${newPage}`);
            this.$router.replace(solvedPath);
        }
    }
}
</script>

<style scoped>
#simulation-pager {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2em;
}

#simulation-pager-switcher {
    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 1em;
}
#current-page-description {
    font-weight: lighter;
}
</style>
