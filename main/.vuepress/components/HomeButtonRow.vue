<template>
    <div class="home-row">
        <div class="home-button" style="width: 30%">
            <a href="">{{ title1 }}</a>
            <br/>
            <div style="margin-top: .5em;">
            {{ text1 }}
            </div>
        </div>
        <div class="home-button" style="width: 30%">
            <a href="">{{ title2 }}</a>
            <br/>
            <div style="margin-top: .5em;">
            {{ text2 }}
            </div>
        </div>
        <div class="home-button" style="width: 30%">
            <a href="">{{ title3 }}</a>
            <br/>
            <div style="margin-top: .5em;">
            {{ text3 }}
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
    }
  }
  </script>