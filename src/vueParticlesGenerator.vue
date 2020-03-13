<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
import { props } from './props';
import { utils } from './utils';

export default {
  name: 'VueParticlesGenerator',
  data: () => ({
    animationId: null,
    context: null,
    particleArray: [],
  }),
  props,
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.createCanvas();

      if (this.isLoop === true) {
        this.generateParticles();
        this.animate();
      }
    },

    generateParticles() {
      for (let i = 0; i < this.maxParticles; i++) {
        this.particleArray.push(this.createParticle());
      }
    },

    createCanvas() {
      this.$refs.canvas.width = this.width;
      this.$refs.canvas.height = this.height;
      this.context = this.$refs.canvas.getContext("2d");
      this.context.width = this.width;
      this.context.height = this.height;
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.width, this.height);
    },

    createParticle() {
      let particle = {};

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

      particle.xSpeed = utils.randomRange((-1) * this.velocity, this.velocity);
      particle.ySpeed = utils.randomRange((-1) * this.velocity, this.velocity);

      if (this.isRandomSize === true) {
        particle.size = utils.randomRange(1, this.particleMaxSize);
      } else {
        particle.size = this.particleSize;
      }

      return particle;
    },

    animate() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }

      this.animationId = requestAnimationFrame(this.animate);
      this.draw();
    },

    draw() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, this.width, this.height);

      for (let index = 0; index < this.nowParticles; index++) {
        let particle = this.particleArray[index];

        this.context.fillStyle = this.getParticleColor();

        this.drawParticle(particle, index);
      }
    },

    getParticleColor() {
      let particleColor = this.color;
      if (this.isRandomColor === true) {
        let r = Math.random() * 255 >> 0;
        let g = Math.random() * 255 >> 0;
        let b = Math.random() * 255 >> 0;
        particleColor = `rgba(${r},${g},${b},${this.particleOpacity})`;
      } else {
        particleColor = `rgba(${utils.hexToR(particleColor)}, ${utils.hexToG(particleColor)}, ${utils.hexToB(particleColor)}, ${this.particleOpacity})`;
      }

      return particleColor;
    },

    drawParticle(particle, index) {
      this.context.beginPath();
      this.drawShadow();
      this.drawStroke();
      this.drawShape(particle);
      this.context.closePath();

      particle.x = particle.x + particle.xSpeed;
      particle.y = particle.y + particle.ySpeed;

      if (this.isDeadParticle === true) {
        particle.size = particle.size * (0.9 + (utils.randomRange(1, 10) / 100));
        if (particle.size <= 0.25 && this.isLoop === true) {
          this.particleArray[index] = this.createParticle();
        }
      } else {
        if (particle.x < -(particle.size) ||
                        particle.y < -(particle.size) ||
                        particle.x > this.width + particle.size ||
                        particle.y > this.height + particle.size) {

          if (this.isLoop === true) {
            this.particleArray[index] = this.createParticle();
          }
        }
      }
    },

    drawShadow() {
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

    drawStroke() {
      this.context.lineWidth = this.strokeSize;
      this.context.strokeStyle = `rgba(${utils.hexToR(this.strokeColor)}, ${utils.hexToG(this.strokeColor)}, ${utils.hexToB(this.strokeColor)}, ${this.particleOpacity})`;
    },

    drawShape(particle) {
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

    drawRect(particle) {
      this.context.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
      if (this.strokeSize > 0) {
        this.context.strokeRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
      }
    },

    drawCircle(particle) {
      let radius = particle.size / 2;
      this.context.arc(particle.x, particle.y, radius, 0, 2 * Math.PI, false);
      this.context.fill();
      if (this.strokeSize > 0) {
        this.context.stroke();
      }
    },

    drawTriangle(particle) {
      this.context.moveTo(particle.x - particle.size/2, particle.y + particle.size/2);
      this.context.lineTo(particle.x + particle.size/2, particle.y + particle.size/2);
      this.context.lineTo(particle.x, particle.y - particle.size/2);
      this.context.lineTo(particle.x - particle.size/2, particle.y + particle.size/2);
      this.context.fill();
      if (this.strokeSize > 0) {
        this.context.stroke();
      }
    },

    drawStar(particle) {
      this.context.moveTo(particle.x + particle.size, particle.y);
      for (let i = 1; i <= 5 * 2; i++) {

        let theta, x, y;
        if (i % 2 === 0) {
          theta = i * (Math.PI * 2) / (5 * 2);
          x = particle.x + (particle.size * Math.cos(theta));
          y = particle.y + (particle.size * Math.sin(theta));
        } else {
          theta = i * (Math.PI * 2) / (5 * 2);
          x = particle.x + ((particle.size / 2) * Math.cos(theta));
          y = particle.y + ((particle.size / 2) * Math.sin(theta));
        }

        this.context.lineTo(x, y);
      }
      this.context.fill();

      if (this.strokeSize > 0) {
        this.context.stroke();
      }
    },

    drawHeart(particle) {
      this.context.moveTo(particle.x + particle.size, particle.y);

      let topCurveHeight = particle.size * 0.3;

      this.context.moveTo(particle.x, particle.y + topCurveHeight);
      this.context.bezierCurveTo(
        particle.x, particle.y,
        particle.x - particle.size / 2, particle.y,
        particle.x - particle.size / 2, particle.y + topCurveHeight
      );
      this.context.bezierCurveTo(
        particle.x - particle.size / 2, particle.y + (particle.size + topCurveHeight) / 2,
        particle.x, particle.y + (particle.size + topCurveHeight) / 2,
        particle.x, particle.y + particle.size
      );
      this.context.bezierCurveTo(
        particle.x, particle.y + (particle.size + topCurveHeight) / 2,
        particle.x + particle.size / 2, particle.y + (particle.size + topCurveHeight) / 2,
        particle.x + particle.size / 2, particle.y + topCurveHeight
      );
      this.context.bezierCurveTo(
        particle.x + particle.size / 2, particle.y,
        particle.x, particle.y,
        particle.x, particle.y + topCurveHeight
      );
      this.context.fill();
      if (this.strokeSize > 0) {
        this.context.stroke();
      }
    }
  },
  watch: {
    trigger() {
      if (this.isLoop === false) {
        this.particleArray = [];
        this.generateParticles();
        this.animate();
      }
    }
  }
};
</script>
