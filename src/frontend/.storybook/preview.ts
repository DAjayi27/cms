import type { Preview } from '@storybook/vue3-vite'
import  'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/main.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { VueSelect } from "vue-select";


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;