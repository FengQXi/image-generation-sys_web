/**
 * icons/index.js
 *
 * Included in `./src/main.js`
 */
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register';

export function registerSvgIcon(app) {
    // register globally
    app.component('SvgIcon', SvgIcon)
}

