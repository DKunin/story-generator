document.addEventListener('DOMContentLoaded', function() {

    const API = {
        children: {
            character: 'children/php/character1.php',
            setting: 'children/php/setting.php',
            situation: 'children/php/situation.php',
            title: 'children/php/title2.php',
            firstlinef: 'children/php/firstlinef.php'
        },
        main: {
            quickplot: 'php/quickplot.php',
            character: 'php/character1.php',
            setting: 'php/setting.php',
            situation: 'php/situation.php',
            theme: 'php/theme.php',
            reaction: 'php/reaction.php'
        }
    }

    Object.defineProperty(Vue.prototype, '$proxy', { value: 'https://allow-any-origin.appspot.com/' });
    Object.defineProperty(Vue.prototype, '$randomize', { value: 'http://writingexercises.co.uk/' });
    Object.defineProperty(Vue.prototype, '$api', { value: API });

    const vueSettings = {
        el: '#app',
        template: document.querySelector('.generatedStuff').innerHTML,
        data: {
            childrenStuff: {
                character: ''
            },
            mainStuff: {}
        },
        methods: {
            generateLink(url) {
                return new Promise((resolve, reject) => {
                    fetch(this.$proxy + this.$randomize + url + '?_=' + new Date().getTime())
                        .then(res => res.text())
                        .then(resolve)
                })
            },
            updateStuff(key, data) {
                const originalData = this.childrenStuff;
                this.childrenStuff = Object.keys(originalData).concat([key])
                    .reduce((newObject, singleKey) => {
                        if (singleKey === key) {
                            newObject[key] = data;
                            return newObject;
                        }
                        newObject[singleKey] = originalData[singleKey];
                        return newObject;
                    }, {});
            },
            getRandomItem(base, key) {
                this.generateLink(this.$api[base][key])
                    .then((result) => {
                        this.updateStuff(key, result);
                    })
            }
        }
    };

    const app = new Vue(vueSettings);
});
