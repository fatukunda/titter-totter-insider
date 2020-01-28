<template>
  <div id="app">
    <ScoreArea />
    <TeeterPlay />
    <TeeterTotterBase />
  </div>
</template>

<script>
import TeeterTotterBase from "@/components/TeeterTotterBase";
import TeeterPlay from "@/components/TeeterPlay";
import ScoreArea from "@/components/ScoreArea";
import { mapActions, mapState } from "vuex";
export default {
  name: "app",
  components: {
    TeeterTotterBase,
    TeeterPlay,
    ScoreArea
  },
  computed: {
    computeModal() {
      if (this.isModalShown) {
        this.showModal();
      }

      return this.isModalShown;
    },
    ...mapState(["isModalShown"])
  },
  methods: {
    ...mapActions(["startGame"]),
    showModal: function() {
      setTimeout(() => {
        alert(" Game over! ");
        this.startGame();
      }, 1000);
    }
  }
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

html {
  overflow-y: auto !important;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
