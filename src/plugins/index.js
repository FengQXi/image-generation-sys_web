/**
 * plugins/index.js
 *
 * Included in `./src/main.js`
 */

import router from '../router'
import pinia from '../stores'
import vuetify from './vuetify'
import { VueQueryPlugin } from "@tanstack/vue-query";

export function registerPlugins(app) {
    app
        .use(router)
        .use(pinia)
        .use(vuetify)
        .use(VueQueryPlugin)
}