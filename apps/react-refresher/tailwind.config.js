/** @type {import('tailwindcss').Config} */
import sharedUiConfg from '../../libs/shared-ui/tailwind.config.js';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../libs/shared-ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      ...sharedUiConfg.theme.extend,
    },
  },
  plugins: [...sharedUiConfg.plugins],
};
