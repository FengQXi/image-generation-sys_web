/**
 * plugins/index.js
 *
 * Included in `./src/main.js`
 */

import router from '../router'
import pinia from '../stores'
import vuetify from './vuetify'

export function registerPlugins(app) {
    app
        .use(router)
        .use(pinia)
        .use(vuetify)
}