<template>
  <router-link tag="button" class="ag-btn ag-btn--large" :to="link">
    {{ text }}
  </router-link>
</template>

<script>
/**
 * @file Button-Action-Link
 * @
 * @module components
 */
export default {
  name: 'ButtonActionLink',

  props: {
    text: {
      type: String,
      required: true,
      default: 'Button Text'
    },

    link: {
      type: String,
      required: true,
      default: '/'
    }
  }
}
</script>
