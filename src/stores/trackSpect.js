// stores/feedbackStore.js
import { defineStore } from 'pinia';

export const useSpeck = defineStore('speck', {
    state: () => ({
        speck: null,
    }),
    actions: {
        setFeedback(speck) {
            this.speck = speck;
        },
        clearFeedback() {
            this.speck = null;
        },
    },
});