<template>
  <main class="play">
    <TeeterDropArea></TeeterDropArea>
    <TeeterTotterMain></TeeterTotterMain>
  </main>
</template>

<script>
import { mapActions } from "vuex";

import TeeterDropArea from "./TeeterDropArea";
import TeeterTotterMain from "./TeeterTotterMain";

export default {
  name: "TeeterPlay",
  components: {
    TeeterDropArea,
    TeeterTotterMain
  },
  created() {
    this.startGame();
  },
  methods: {
    ...mapActions(["startGame"])
  }
};
</script>

<style scoped>
.play {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  min-width: 600px;
  width: 80%;
  margin: 0 auto;
  padding-bottom: 10rem;
}
</style>
