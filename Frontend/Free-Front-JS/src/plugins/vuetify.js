import { createApp } from 'vue'
import { createVuetify } from 'vuetify';
import '@/styles/main.scss';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#F7F7F7',
    surface: '#FFFFFF',
    primary: '#44B88D',
    primaryLight: '#52C41A',
    primaryLight2: '#41CF9C',
    primaryDark: '#056839',
    secondary: '#4598F8',
    secondaryLight: '#BAD7FF',
    approve: '#D7FFEB',
    approveDark: '#B5F5CF',
    highLight: '#FFF0D8',
    denied: '#FFD8D8',
    inprogress: '#E1EAFF',
    notApprove: '#EDEDED',
    tableBackground: '#F0F0F0',
    tableBorder: '#B9B9B9',
    error: '#C0392B',
    info: '#3498DB',
    success: '#35DE75',
    warning: '#DE7935',
    disable: '#D9D9D9'
  }
};

const spaceDark = {
    dark: true, 
    colors: {
      background: '#0a0f1c', 
      surface: '#1a2238',    
      primary: '#00ffff',   
      secondary: '#7f5af0',  
      accent: '#ff80b5', 
      info: '#00bcd4', 
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
  }
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'spaceDark',
    themes: {
      myCustomLightTheme: {
        ...myCustomLightTheme,
        variables: {
          fontFamily: '"Sukhumvit Set", sans-serif'
        }
      },
      spaceDark: {
        ...spaceDark,
        variables: {
          fontFamily: '"Sukhumvit Set", sans-serif'
        }
      }
    }
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      rounded: 'lg'
    },
    VChip: {
      density: 'compact'
    },
    VRow: {
      class: 'ma-0'
    },
    VSelect: {
      variant: 'outlined',
      rounded: 'lg',
      density: 'compact',
      color: 'primary'
    },
    VAutocomplete: {
      variant: 'outlined',
      rounded: 'lg',
      density: 'compact',
      color: 'primary'
    }
  }
});

export default vuetify;
