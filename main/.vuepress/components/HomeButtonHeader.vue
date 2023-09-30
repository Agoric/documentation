<template>
  <div>
    <h1 style="margin-bottom: .25em">{{ title }}</h1>
    <div style="margin-bottom: 1em;">
    {{ text }}
    </div>
  </div>
</template>
  
<script>
/**
 * @file HomeButtonHeader
 * @
 * @module components
 */
export default {
    name: 'HomeButtonHeader',

    props: {
        title: {
            type: String,
            required: true,
            default: 'Home Button Header Title'
        },
        text: {
            type: String,
            required: true,
            default: 'Home Button Header Text'
        },
    }
}
</script>