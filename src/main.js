import App from './App.vue'
import store from './store'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import './assets/css/iconfont.css'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';

import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';
import "./assets/css/main.css";
import "./assets/css/color-dark.css";
VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
VueMarkdownEditor.use(createTodoListPlugin());
VueMarkdownEditor.use(createAlignPlugin());

export function createApp() {
    const app = createSSRApp(App)
    installElementPlus(app)
    const router = createRouter()
    app.use(router)
        .use(store)
        .use(VMdPreviewHtml)
        .use(VueMarkdownEditor)
    return { app, router }
}

export default{
    beforeMount(){
        this.$options.components.Loading = () =>import('./assets/css/iconfont');
    }
}