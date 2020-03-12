## vue particles generator
[![npm version](https://badge.fury.io/js/vue-particles-generator.svg)](https://badge.fury.io/js/vue-particles-generator)
[![Monthly Downloads](https://img.shields.io/npm/dm/vue-particles-generator.svg)](https://www.npmjs.com/package/vue-particles-generator)

Simple Vue component for generating animated particles

### Installation

`npm install vue-particles-generator`

or

`yarn add vue-particles-generator`

### Usage


###### Import a component

```javascript
import VueParticlesGenerator from 'vue-particles-generator';

Vue.use(VueParticlesGenerator);
```

or

```javascript
import VueParticlesGenerator from 'vue-particles-generator';

export default {
    components: {
        VueParticlesGenerator
    }
}
```

###### In component template

```javascript
<VueParticlesGenerator />
```

### Demo
https://xpunsterx.github.io/vue-particles-generator/#/

### Options list

| Option  | Type | Default |
| ------------- | ------------- | ------------- |
| width | Number | 200 |
| height | Number | 200 |
| maxParticles | Number | 500 |
| nowParticles | Number | 50 |
| color | String | "#ffae23" |
| particleType | String | "star" |
| position | String | "random" |
| centerCoordinates | Array | [0,0] |
| velocity | Number | 2 |
| backgroundColor | String | "rgba(0,0,0,0)" |
| strokeSize | Number | 2 |
| strokeColor | String | "#ffffff" |
| particleOpacity | Number | 1 |
| particleSize | Number | 15 |
| particleMaxSize | Number | 20 |
| isRandomColor | Boolean | false |
| isRandomSize | Boolean | true |
| isDeadParticle | Boolean | true |
| isLoop | Boolean | true |
| trigger | Boolean | true |
| shadowBlur | Number | 0 |
| shadowColor | String | "rgba(100, 100, 100, 1)" |