/** @type {import('tailwindcss').Config} */

import {COLORS} from './src/constants/Colors'

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: COLORS
    },
    borderRadius: {
      '2xs': '4px',
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '28px',
      '3xl': '32px',
      '4xl': '36px',
      '5xl': '40px',
      '6xl': '44px',
      '7xl': '48px',
      full: '9999px',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '32px',
      '5xl': '36px',
      '6xl': '40px',
      '7xl': '44px',
      '8xl': '48px',
      '9xl': '52px',
      '10xl': '56px',
      '11xl': '60px',
      '12xl': '64px',
    },
    screens: {
      '2xs': '360px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '840px',
      xl: '1024px',
      '2xl': '1280px',
      '3xl': '1400px',
      '4xl': '1600px',
      '5xl': '1800px',
    },
    // extend: {
    //   margin: {
    //     0.25: '1px',
    //     4.5: '18px',
    //   },
    //   padding: {
    //     4.5: '18px',
    //   },
    //   width: {
    //     3.5: '14px',
    //     4.5: '18px',
    //   },
    // },
  },
  plugins: [],
};
