<script setup>
import { useData } from 'vitepress'
const { theme } = useData()
const { zoeVersion, zoeDocsUpdated } = theme.value
</script>

<template>
<div class="zoe-version">
    Zoe {{ zoeVersion }}. Last updated
    {{ zoeDocsUpdated }}.
</div>
</template>
