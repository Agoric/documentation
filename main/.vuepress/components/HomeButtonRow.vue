<template>
    <div class="home-col">
        <div class="home-row">
            <div class="home-button" style="width: 30%">
                <a :href=link1>{{ title1 }}</a>
                <br/>
                <div style="margin-top: .5em;">
                {{ text1 }}
                </div>
            </div>
            <div class="home-button" style="width: 30%">
                <a :href=link2>{{ title2 }}</a>
                <br/>
                <div style="margin-top: .5em;">
                {{ text2 }}
                </div>
            </div>
            <div class="home-button" style="width: 30%">
                <a :href=link3>{{ title3 }}</a>
                <br/>
                <div style="margin-top: .5em;">
                {{ text3 }}
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  /**
   * @file HomeButton
   * @
   * @module components
   */
  export default {
    name: 'HomeButton',
  
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
    }
  }
  </script>