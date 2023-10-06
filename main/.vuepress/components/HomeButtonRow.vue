<template>
    <div class="button-grid-wrapper">
        <div class="home-button" style="grid-column-start: 1;">
            <a :href=link1>
                {{ title1 }}
                <span class="link-spanner"></span>
            </a>
            <br/>
            <div style="margin-top: .5em;">
                {{ text1 }}
            </div>
        </div>
        <div class="home-button" style="grid-column-start: 2;">
            <a :href=link2>
                {{ title2 }}
                <span class="link-spanner"></span>
            </a>
            <br/>
            <div style="margin-top: .5em;">
                {{ text2 }}
            </div>
        </div>
        <div class="home-button" style="grid-column-start: 3;">
            <a :href=link3>
                {{ title3 }}
                <span class="link-spanner"></span>
            </a>
            <br/>
            <div style="margin-top: .5em;">
                {{ text3 }}
            </div>
        </div>
        <div class="home-button" v-if="title4" style="grid-column-start: 1;">
            <a :href=link4>
                {{ title4 }}
                <span class="link-spanner"></span>
            </a>
            <br/>
            <div style="margin-top: .5em;">
                {{ text4 }}
            </div>
        </div>
        <div class="home-button" v-if="title5" style="grid-column-start: 2;">
            <a :href=link5>
                {{ title5 }}
                <span class="link-spanner"></span>
            </a>
            <br/>
            <div style="margin-top: .5em;">
                {{ text5 }}
            </div>
        </div>
        <div class="home-button"  v-if="title6" style="grid-column-start: 3;">
            <a :href=link6>
                {{ title6 }}
                <span class="link-spanner"></span>
            </a>
            <br/>
            <div style="margin-top: .5em;">
                {{ text6 }}
            </div>
        </div>
    </div>
</template>
  
<script>
  /**
   * @file HomeButtonRow
   * @
   * @module components
   */
  export default {
    name: 'HomeButtonRow',
  
    props: {
      title1: {
          type: String,
          required: true,
          default: 'HomeButton Title 1'
      },
      text1: {
          type: String,
          required: true,
          default: 'HomeButton Text 1'
      },
      link1: {
          type: String,
          required: true,
          default: 'https://docs.agoric.com'
      },
      title2: {
          type: String,
          required: true,
          default: 'HomeButton Title 2'
      },
      text2: {
          type: String,
          required: true,
          default: 'HomeButton Text 2'
      },
      link2: {
          type: String,
          required: true,
          default: 'https://docs.agoric.com'
      },
      title3: {
          type: String,
          required: true,
          default: 'HomeButton Title 3'
      },
      text3: {
          type: String,
          required: true,
          default: 'HomeButton Text 3'
      },
      link3: {
          type: String,
          required: true,
          default: 'https://docs.agoric.com'
      },

      title4: {
          type: String,
          required: false,
      },
      text4: {
          type: String,
          required: false,
      },
      link4: {
          type: String,
          required: false,
      },

      title5: {
          type: String,
          required: false,
      },
      text5: {
          type: String,
          required: false,
      },
      link5: {
          type: String,
          required: false,
      },

      title6: {
          type: String,
          required: false,
      },
      text6: {
          type: String,
          required: false,
      },
      link6: {
          type: String,
          required: false,
      },
    }
  }
</script>