// stores/feedbackStore.js
import { defineStore } from 'pinia';

export const useFeedbackStore = defineStore('feedback', {
    state: () => ({
        feedback: null,
    }),
    actions: {
        setFeedback(feedback) {
            this.feedback = feedback;
        },
        clearFeedback() {
            this.feedback = null;
        },
    },
});