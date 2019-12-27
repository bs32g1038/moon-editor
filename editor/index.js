import Vue from 'vue';
import EdEitor from './components/editor';
import VueI18n from 'vue-i18n';
import messages from './18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'zh_cn',
    messages,
});

const Editor = options => {
    new Vue({
        el: '#app',
        i18n: i18n,
        render: h =>
            h(EdEitor, {
                props: {
                    ...options,
                },
            }),
    });
};

export default window.MoonEditor || Editor;