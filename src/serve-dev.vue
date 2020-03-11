<template>
  <div id="app" @mousemove="onMouseMove">
    <VueParticlesGenerator :width="300"
                        :height="300"
                        position="centerCoordinates"
                        :velocity="2"
                        :particleSize="50"
                        :particleMaxSize="50"
                        particleType="star"
                        backgroundColor="#000"
                        :centerCoordinates="[cX,cY]" />
  </div>
</template>

<script>
import Vue from 'vue';
import VueParticlesGenerator from '@/vueParticlesGenerator.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueParticlesGenerator
  },
  data: () => ({
    cX: 0,
    cY: 0
  }),
  methods: {
    onMouseMove(event) {
      this.cX = event.clientX;
      this.cY = event.clientY;
    }
  }
});
</script>
