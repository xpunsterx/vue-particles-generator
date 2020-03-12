(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{1641:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("q-splitter",{staticClass:"usage-splitter",scopedSlots:e._u([{key:"before",fn:function(){return[n("q-tabs",{attrs:{vertical:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[n("q-tab",{attrs:{name:"simpleClicks",label:"Simple clicks"}}),n("q-tab",{attrs:{name:"advancedClicks",label:"Advanced clicks"}}),n("q-tab",{attrs:{name:"cursor",label:"Follow the Mouse Cursor"}})],1)]},proxy:!0},{key:"after",fn:function(){return[n("q-tab-panels",{staticClass:"usage-panels",attrs:{animated:"",swipeable:"",vertical:"","transition-prev":"slide-down","transition-next":"slide-up"},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[n("q-tab-panel",{attrs:{name:"simpleClicks"}},[n("div",{staticClass:"text-h4 q-mb-md"},[e._v("Simple clicks")]),n("SimpleClicks")],1),n("q-tab-panel",{attrs:{name:"advancedClicks"}},[n("div",{staticClass:"text-h4 q-mb-md"},[e._v("Advanced clicks")]),n("AdvancedClicks")],1),n("q-tab-panel",{attrs:{name:"cursor"}},[n("div",{staticClass:"text-h4 q-mb-md"},[e._v("Follow the Mouse Cursor")]),n("FollowCursor")],1)],1)]},proxy:!0}]),model:{value:e.splitterModel,callback:function(t){e.splitterModel=t},expression:"splitterModel"}})],1)},r=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-md-4",on:{mousemove:e.onMouseMove}},[n("VueParticlesGenerator",{attrs:{backgroundColor:"#2b2b2b",width:300,height:300,position:"centerCoordinates",centerCoordinates:[e.cX,e.cY]}})],1),n("div",{staticClass:"col-12 col-md-8"},[n("Code",{attrs:{value:e.code}})],1)])},a=[],o=n("1cf6"),c={name:"FollowCursor",components:{Code:o["a"]},data:function(){return{cX:0,cY:0}},methods:{onMouseMove:function(e){this.cX=e.offsetX,this.cY=e.offsetY}},computed:{code:function(){return'<template>\n    <div @mousemove="onMouseMove">\n        <VueParticlesGenerator\n                position="centerCoordinates"\n                :centerCoordinates="[cX,cY]"\n        />\n    </div>\n</template>\n\n<script>\n    import VueParticlesGenerator from \'vue-particles-generator\';\n    export default {\n        components: {\n            VueParticlesGenerator\n        },\n        data: () => ({\n            cX: 0,\n            cY: 0\n        }),\n        methods: {\n            onMouseMove(event) {\n                this.cX = event.offsetX;\n                this.cY = event.offsetY;\n            }\n        }\n    }\n<\/script>'}}},l=c,p=n("2877"),d=Object(p["a"])(l,i,a,!1,null,null,null),u=d.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-md-4",on:{click:e.onClick}},[n("VueParticlesGenerator",{attrs:{backgroundColor:"#2b2b2b",width:300,height:300,isLoop:!1,trigger:e.trigger,position:"centerCoordinates",centerCoordinates:[e.cX,e.cY]}})],1),n("div",{staticClass:"col-12 col-md-8"},[n("Code",{attrs:{value:e.code}})],1)])},m=[],f={name:"SimpleClicks",components:{Code:o["a"]},data:function(){return{cX:0,cY:0,trigger:!0}},methods:{onClick:function(e){this.trigger=!this.trigger,this.cX=e.offsetX,this.cY=e.offsetY}},computed:{code:function(){return'<template>\n    <div @click="onClick">\n        <VueParticlesGenerator\n                position="centerCoordinates"\n                :isLoop="false"\n                :trigger="trigger"\n                :centerCoordinates="[cX,cY]"\n        />\n    </div>\n</template>\n\n<script>\n    import VueParticlesGenerator from \'vue-particles-generator\';\n\n    export default {\n        components: {\n            VueParticlesGenerator\n        },\n        data: () => ({\n            cX: 0,\n            cY: 0,\n            trigger: true\n        }),\n        methods: {\n            onClick(event) {\n                this.trigger = !this.trigger;\n                this.cX = event.offsetX;\n                this.cY = event.offsetY;\n            }\n        }\n    }\n<\/script>'}}},g=f,v=Object(p["a"])(g,h,m,!1,null,null,null),C=v.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-md-4"},[n("div",{staticClass:"example",style:{width:e.width+"px",height:e.height+"px"}},[n("ul",{staticClass:"example__source-list"},e._l(5,(function(t){return n("li",{key:"example-source_"+t,class:"example-source example-source_"+t,on:{click:function(n){return e.onClick(t,n)}}})})),0),n("VueParticlesGenerator",{staticClass:"example__canvas",attrs:{backgroundColor:"transparent",width:e.width,height:e.height,particleMaxSize:40,isLoop:!1,trigger:e.trigger,particleType:e.particleType,position:"centerCoordinates",centerCoordinates:[e.cX,e.cY]}})],1)]),n("div",{staticClass:"col-12 col-md-8"},[n("Code",{attrs:{value:e.code}})],1)])},k=[],x={name:"AdvancedClicks",components:{Code:o["a"]},data:function(){return{width:300,height:300,cX:0,cY:0,particleType:"star",trigger:!0}},methods:{onClick:function(e,t){switch(this.trigger=!this.trigger,this.cX=t.target.offsetLeft+25,this.cY=t.target.offsetTop+25,e){case 1:this.particleType="rect";break;case 2:this.particleType="circle";break;case 3:this.particleType="triangle";break;case 4:this.particleType="star";break;case 5:this.particleType="heart";break}}},computed:{code:function(){return'<template>\n  <div class="example" :style="{\n      width: `${width}px`,\n      height: `${height}px`,\n  }">\n      <ul class="example__source-list">\n          <li :class="`example-source example-source_${item}`"\n              v-for="item in 5"\n              :key="`example-source_${item}`" @click="(event) => onClick(item, event)" />\n      </ul>\n\n      <VueParticlesGenerator\n              backgroundColor="transparent"\n              class="example__canvas"\n              :width="width"\n              :height="height"\n              :particleMaxSize="40"\n              :isLoop="false"\n              :trigger="trigger"\n              :particleType="particleType"\n              position="centerCoordinates"\n              :centerCoordinates="[cX,cY]"\n      />\n  </div>\n\n</template>\n\n<script>\n    import VueParticlesGenerator from \'vue-particles-generator\';\n\n    export default {\n        name: \'FollowCursor\',\n        components: {\n            VueParticlesGenerator\n        },\n        data: () => ({\n            width: 400,\n            height: 400,\n            cX: 0,\n            cY: 0,\n            particleType: \'star\',\n            trigger: true\n        }),\n        methods: {\n            onClick(item, event) {\n                this.trigger = !this.trigger;\n                this.cX = event.target.offsetLeft + 25;\n                this.cY = event.target.offsetTop + 25;\n\n                switch (item) {\n                    case(1):\n                        this.particleType = \'rect\';\n                        break;\n                    case(2):\n                        this.particleType = \'circle\';\n                        break;\n                    case(3):\n                        this.particleType = \'triangle\';\n                        break;\n                    case(4):\n                        this.particleType = \'star\';\n                        break;\n                    case(5):\n                        this.particleType = \'heart\';\n                        break;\n                }\n            }\n        }\n    }\n<\/script>\n\n<style lang="scss">\n    .example {\n        position: relative;\n\n        &__canvas {\n            position: absolute;\n            top: 0;\n            left: 0;\n            z-index: 1;\n\n            pointer-events: none;\n        }\n\n        &__source-list {\n            height: 400px;\n            display: flex;\n            align-items: center;\n            justify-content: space-around;\n            flex-wrap: wrap;\n            list-style: none;\n            margin: 0;\n        }\n    }\n\n    .example-source {\n        width: 50px;\n        height: 50px;\n\n        border-radius: 50%;\n        cursor: pointer;\n\n        $source-colors: (1: red, 2: blue, 3: green, 4: yellow, 5: white);\n\n        @each $index, $color in $source-colors {\n            &_#{$index} {\n                background-color: $color;\n            }\n        }\n\n        &:hover {\n            box-shadow: 0 0 5px 5px #000;\n        }\n    }\n</style>'}}},w=x,y=(n("47d5"),Object(p["a"])(w,b,k,!1,null,null,null)),_=y.exports,T={name:"Usage",components:{FollowCursor:u,SimpleClicks:C,AdvancedClicks:_},data:function(){return{tab:"simpleClicks",splitterModel:20}}},X=T,Y=(n("fd25"),n("fe09")),M=Object(p["a"])(X,s,r,!1,null,null,null);t["default"]=M.exports;M.options.components=Object.assign({QSplitter:Y["g"],QTabs:Y["k"],QTab:Y["h"],QTabPanels:Y["j"],QTabPanel:Y["i"]},M.options.components||{})},"22e9":function(e,t,n){},"47d5":function(e,t,n){"use strict";var s=n("22e9"),r=n.n(s);r.a},d8c5:function(e,t,n){},fd25:function(e,t,n){"use strict";var s=n("d8c5"),r=n.n(s);r.a}}]);
//# sourceMappingURL=about.26612fad.js.map