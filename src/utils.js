export const utils = {
    randomRange(min, max) {
        return ((Math.random() * (max - min)) + min);
    },
    hexToR(h) {
        return parseInt((this.cutHex(h)).substring(0, 2), 16);
    },
    hexToG(h) {
        return parseInt((this.cutHex(h)).substring(2, 4), 16);
    },
    hexToB(h) {
        return parseInt((this.cutHex(h)).substring(4, 6), 16);
    },
    cutHex(h) {
        return (h.charAt(0) === "#") ? h.substring(1, 7) : h;
    }
};
