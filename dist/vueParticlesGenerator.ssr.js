'use strict';Object.defineProperty(exports,'__esModule',{value:true});var props = {
  width: {
    default: 200,
    type: Number
  },
  height: {
    default: 200,
    type: Number
  },
  maxParticles: {
    default: 500,
    type: Number
  },
  nowParticles: {
    default: 50,
    type: Number
  },
  color: {
    default: "#ffae23",
    type: String
  },
  particleType: {
    default: "star",
    type: String
  },
  position: {
    default: "random",
    type: String
  },
  centerCoordinates: {
    default: function _default() {
      return [0, 0];
    },
    type: Array
  },
  velocity: {
    default: 2,
    type: Number
  },
  backgroundColor: {
    default: "rgba(0,0,0,0)",
    type: String
  },
  strokeSize: {
    default: 2,
    type: Number
  },
  strokeColor: {
    default: "#ffffff",
    type: String
  },
  particleOpacity: {
    default: 1,
    type: Number
  },
  particleSize: {
    default: 15,
    type: Number
  },
  particleMaxSize: {
    default: 20,
    type: Number
  },
  isRandomColor: {
    default: false,
    type: Boolean
  },
  isRandomSize: {
    default: true,
    type: Boolean
  },
  isDeadParticle: {
    default: true,
    type: Boolean
  },
  isLoop: {
    default: true,
    type: Boolean
  },
  trigger: {
    default: true,
    type: Boolean
  },
  shadowBlur: {
    default: 0,
    type: Number
  },
  shadowColor: {
    default: "rgba(100, 100, 100, 1)",
    type: String
  }
};var utils = {
  randomRange: function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  },
  hexToR: function hexToR(h) {
    return parseInt(this.cutHex(h).substring(0, 2), 16);
  },
  hexToG: function hexToG(h) {
    return parseInt(this.cutHex(h).substring(2, 4), 16);
  },
  hexToB: function hexToB(h) {
    return parseInt(this.cutHex(h).substring(4, 6), 16);
  },
  cutHex: function cutHex(h) {
    return h.charAt(0) === "#" ? h.substring(1, 7) : h;
  }
};//
var script = {
  name: 'VueParticlesGenerator',
  data: function data() {
    return {
      animationId: null,
      context: null,
      particleArray: []
    };
  },
  props: props,
  mounted: function mounted() {
    this.init();
  },
  methods: {
    init: function init() {
      this.createCanvas();

      if (this.isLoop === true) {
        this.generateParticles();
        this.animate();
      }
    },
    generateParticles: function generateParticles() {
      for (var i = 0; i < this.maxParticles; i++) {
        this.particleArray.push(this.createParticle());
      }
    },
    createCanvas: function createCanvas() {
      this.$refs.canvas.width = this.width;
      this.$refs.canvas.height = this.height;
      this.context = this.$refs.canvas.getContext("2d");
      this.context.width = this.width;
      this.context.height = this.height;
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.width, this.height);
    },
    createParticle: function createParticle() {
      var particle = {};

      switch (this.position) {
        case 'centerCanvas':
          particle.x = this.width / 2;
          particle.y = this.height / 2;
          break;

        case 'centerCoordinates':
          particle.x = this.centerCoordinates[0];
          particle.y = this.centerCoordinates[1];
          break;

        case 'random':
          particle.x = utils.randomRange(0, this.width);
          particle.y = utils.randomRange(0, this.height);
          break;
      }

      particle.xSpeed = utils.randomRange(-1 * this.velocity, this.velocity);
      particle.ySpeed = utils.randomRange(-1 * this.velocity, this.velocity);

      if (this.isRandomSize === true) {
        particle.size = utils.randomRange(1, this.particleMaxSize);
      } else {
        particle.size = this.particleSize;
      }

      return particle;
    },
    animate: function animate() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }

      this.animationId = requestAnimationFrame(this.animate);
      this.draw();
    },
    draw: function draw() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.width, this.height);

      for (var index = 0; index < this.nowParticles; index++) {
        var particle = this.particleArray[index];
        this.context.fillStyle = this.getParticleColor();
        this.drawParticle(particle, index);
      }
    },
    getParticleColor: function getParticleColor() {
      var particleColor = this.color;

      if (this.isRandomColor === true) {
        var r = Math.random() * 255 >> 0;
        var g = Math.random() * 255 >> 0;
        var b = Math.random() * 255 >> 0;
        particleColor = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(this.particleOpacity, ")");
      } else {
        particleColor = "rgba(".concat(utils.hexToR(particleColor), ", ").concat(utils.hexToG(particleColor), ", ").concat(utils.hexToB(particleColor), ", ").concat(this.particleOpacity, ")");
      }

      return particleColor;
    },
    drawParticle: function drawParticle(particle, index) {
      this.context.beginPath();
      this.drawShadow();
      this.drawStroke();
      this.drawShape(particle);
      this.context.closePath();
      particle.x = particle.x + particle.xSpeed;
      particle.y = particle.y + particle.ySpeed;

      if (this.isDeadParticle === true) {
        particle.size = particle.size * (0.9 + utils.randomRange(1, 10) / 100);

        if (particle.size <= 0.25 && this.isLoop === true) {
          this.particleArray[index] = this.createParticle();
        }
      } else {
        if (particle.x < -particle.size || particle.y < -particle.size || particle.x > this.width + particle.size || particle.y > this.height + particle.size) {
          if (this.isLoop === true) {
            this.particleArray[index] = this.createParticle();
          }
        }
      }
    },
    drawShadow: function drawShadow() {
      if (this.shadowBlur > 0) {
        this.context.shadowBlur = this.shadowBlur;
        this.context.shadowOffsetX = 1;
        this.context.shadowOffsetY = 1;
      } else {
        this.context.shadowBlur = null;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
      }

      this.context.shadowColor = this.shadowColor;
    },
    drawStroke: function drawStroke() {
      this.context.lineWidth = this.strokeSize;
      this.context.strokeStyle = "rgba(".concat(utils.hexToR(this.strokeColor), ", ").concat(utils.hexToG(this.strokeColor), ", ").concat(utils.hexToB(this.strokeColor), ", ").concat(this.particleOpacity, ")");
    },
    drawShape: function drawShape(particle) {
      switch (this.particleType) {
        case 'rect':
          this.drawRect(particle);
          break;

        case 'circle':
          this.drawCircle(particle);
          break;

        case 'triangle':
          this.drawTriangle(particle);
          break;

        case 'star':
          this.drawStar(particle);
          break;

        case 'heart':
          this.drawHeart(particle);
          break;
      }
    },
    drawRect: function drawRect(particle) {
      this.context.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);

      if (this.strokeSize > 0) {
        this.context.strokeRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
      }
    },
    drawCircle: function drawCircle(particle) {
      var radius = particle.size / 2;
      this.context.arc(particle.x, particle.y, radius, 0, 2 * Math.PI, false);
      this.context.fill();

      if (this.strokeSize > 0) {
        this.context.stroke();
      }
    },
    drawTriangle: function drawTriangle(particle) {
      this.context.moveTo(particle.x - particle.size / 2, particle.y + particle.size / 2);
      this.context.lineTo(particle.x + particle.size / 2, particle.y + particle.size / 2);
      this.context.lineTo(particle.x, particle.y - particle.size / 2);
      this.context.lineTo(particle.x - particle.size / 2, particle.y + particle.size / 2);
      this.context.fill();

      if (this.strokeSize > 0) {
        this.context.stroke();
      }
    },
    drawStar: function drawStar(particle) {
      this.context.moveTo(particle.x + particle.size, particle.y);

      for (var i = 1; i <= 5 * 2; i++) {
        var theta = void 0,
            x = void 0,
            y = void 0;

        if (i % 2 === 0) {
          theta = i * (Math.PI * 2) / (5 * 2);
          x = particle.x + particle.size * Math.cos(theta);
          y = particle.y + particle.size * Math.sin(theta);
        } else {
          theta = i * (Math.PI * 2) / (5 * 2);
          x = particle.x + particle.size / 2 * Math.cos(theta);
          y = particle.y + particle.size / 2 * Math.sin(theta);
        }

        this.context.lineTo(x, y);
      }

      this.context.fill();

      if (this.strokeSize > 0) {
        this.context.stroke();
      }
    },
    drawHeart: function drawHeart(particle) {
      this.context.moveTo(particle.x + particle.size, particle.y);
      var topCurveHeight = particle.size * 0.3;
      this.context.moveTo(particle.x, particle.y + topCurveHeight);
      this.context.bezierCurveTo(particle.x, particle.y, particle.x - particle.size / 2, particle.y, particle.x - particle.size / 2, particle.y + topCurveHeight);
      this.context.bezierCurveTo(particle.x - particle.size / 2, particle.y + (particle.size + topCurveHeight) / 2, particle.x, particle.y + (particle.size + topCurveHeight) / 2, particle.x, particle.y + particle.size);
      this.context.bezierCurveTo(particle.x, particle.y + (particle.size + topCurveHeight) / 2, particle.x + particle.size / 2, particle.y + (particle.size + topCurveHeight) / 2, particle.x + particle.size / 2, particle.y + topCurveHeight);
      this.context.bezierCurveTo(particle.x + particle.size / 2, particle.y, particle.x, particle.y, particle.x, particle.y + topCurveHeight);
      this.context.fill();

      if (this.strokeSize > 0) {
        this.context.stroke();
      }
    }
  },
  watch: {
    trigger: function trigger() {
      if (this.isLoop === false) {
        this.particleArray = [];
        this.generateParticles();
        this.animate();
      }
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('canvas', {
    ref: "canvas"
  }, []);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-53215f68";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);// Import vue component

var install = function installVueParticlesGenerator(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueParticlesGenerator', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;