<template>
  <button
    class="ag-btn ag-btn--large"
    type="button"
    @click="$router.go(-1)"
  >
    {{ text }}
  </button>
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
      default: 'Go Back'
    }
  }
}
</script>
