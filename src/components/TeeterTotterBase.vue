<template>
  <div class="teeter-base">
    <div class="col-md-12">
      <button @click="toggleSimulation" class="btn btn-info mr-4">
        {{ isGamePaused ? "Play" : "Pause" }}
      </button>
      <button @click="startGame" class="btn btn-warning">Refresh</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { SPACE_KEY } from "@/constants";
export default {
  data() {
    return {
      effect: "lni-tada-effect"
    };
  },
  methods: {
    ...mapActions(["startGame"]),
    ...mapMutations(["toggleSimulation"]),
    getWeight(shapes = []) {
      return shapes.reduce((total, current) => (total += current.weight), 0);
    },
    handleSpaceClick(event) {
      event.preventDefault();
      if (event.keyCode === SPACE_KEY && !this.isModalShown) {
        this.toggleSimulation();
      }
    }
  },
  computed: {
    ...mapState(["isGamePaused", "isModalShown"]),
    playPause: function() {
      return {
        "lni-play": !this.showCheck,
        "lni-pause": this.showCheck,
        active: this.isActive && !this.error,
        "text-danger": this.error && this.error.type === "fatal"
      };
    }
  }
};
</script>

<style scoped>
.teeter-base {
  width: 100%;
  background-color: #ffe4c4;
  height: 5rem;
  position: fixed;
  bottom: 0;
  display: flex;
  align-content: center;
  align-items: center;
}
.teeter-base button {
  width: 8rem;
}
</style>
