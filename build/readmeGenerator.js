import { props } from './../src/props';
import fs from "fs";

export const createReadme = () => {
    let result = `## vue particles generator
[![npm version](https://badge.fury.io/js/vue-particles-generator.svg)](https://badge.fury.io/js/vue-particles-generator)
[![Build Status](https://travis-ci.org/xpunsterx/vue-particles-generator.svg?branch=master)](https://travis-ci.org/xpunsterx/vue-particles-generator)
[![Monthly Downloads](https://img.shields.io/npm/dm/vue-particles-generator.svg)](https://www.npmjs.com/package/vue-particles-generator)

Simple Vue component for generating animated particles

### Installation

\`\`\`sh
npm install vue-particles-generator
\`\`\`

or

\`\`\`sh
yarn add vue-particles-generator
\`\`\`

### Usage


###### Import a component

\`\`\`javascript
import VueParticlesGenerator from 'vue-particles-generator';

Vue.use(VueParticlesGenerator);
\`\`\`

or

\`\`\`javascript
import VueParticlesGenerator from 'vue-particles-generator';

export default {
    components: {
        VueParticlesGenerator
    }
}
\`\`\`

###### In component template

\`\`\`javascript
<VueParticlesGenerator />
\`\`\`

### Demo
https://xpunsterx.github.io/vue-particles-generator/#/

### Options list

`;
    result += createPropsTable();

    fs.writeFile('README.md', result, function (err) {
        if (err) throw err;
        console.log('README.md is created successfully.');
    });

};

const createPropsTable = () => {
    let propsTable = `| Option  | Type | Default |
| ------------- | ------------- | ------------- |`;
    for (let prop in props) {
        let defaultValue = '';
        switch (props[prop].type.name) {
            case ('String'):
                defaultValue = `"${props[prop].default}"`;
                break;
            case ('Array'):
                defaultValue = `[${props[prop].default()}]`;
                break;
            default:
                defaultValue = props[prop].default;
                break;
        }

        propsTable += `
| ${prop} | ${props[prop].type.name} | ${defaultValue} |`;
    }

    return propsTable;
};
