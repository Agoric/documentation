// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import '../styles/index.styl';
import ButtonActionLink from '../components/Button-Action-Link.vue';
import ButtonGoBack from '../components/Button-Go-Back.vue';
import HomeButtonHeader from '../components/HomeButtonHeader.vue';
import HomeButtonRow from '../components/HomeButtonRow.vue';
import ZoeVersion from '../components/Zoe-Version.vue';
import Chatbot from '../components/Chatbot.vue'; 


/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app /*, router, siteData */ }) {
    app.component('ButtonActionLink', ButtonActionLink);
    app.component('ButtonGoBack', ButtonGoBack);
    app.component('HomeButtonHeader', HomeButtonHeader);
    app.component('HomeButtonRow', HomeButtonRow);
    app.component('ZoeVersion', ZoeVersion);
    app.component('Chatbot', Chatbot);
  },
};
