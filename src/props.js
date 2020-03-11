export const props = {
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
        default: () => [0, 0],
        type: Array
    },
    velocity: {
        default: 2,
        type: Number,
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
};
