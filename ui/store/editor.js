export const state = () => ({
    currentContent: '',
});

export const mutations = {
    updateCurrentContent(state, editorContent) {
        state.currentContent = editorContent
    },
}

export const actions = {
    updateContent(context, editorContent) {
        context.commit('updateCurrentContent', editorContent);
    }
}

export const getters = {
    getCurrentContent: (state) => {
        return state.currentContent;
    },
}