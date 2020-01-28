const actions = {
  startGame({ commit, state }) {
    if (!state.isGamePaused) commit("toggleSimulation");
    if (state.isModalShown) commit("toggleModal");

    commit("updateFallingInterval", true);
    commit("clearAllShapes");

    commit("generateObject");
    commit("generateObject");

    commit("generateObject", true);
  }
};

export default actions;
