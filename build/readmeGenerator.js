import { props } from './../src/props';
import fs from "fs";

export const createReadme = () => {
    let result = `## vue particles generator

Simple Vue component for generating animated particles

### Installation

\`npm install ...\`

or

\`yarn add ...\`

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
