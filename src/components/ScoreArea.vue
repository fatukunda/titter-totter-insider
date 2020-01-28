<template>
  <header class="controls-panel">
    <!-- Falling shapes stats -->

    <div class="shapes-stats">
      <div>
        Total weight:
        <span class="shapes-stats__weight">
          {{ totalDroppedShapesWeight }} kg
        </span>
      </div>
      <div>
        Momentum:
        <span class="shapes-stats__weight">
          {{ fallingShapes[0] && fallingShapes[0].weight }} kg
        </span>
      </div>
    </div>

    <!-- Randomly places shapes stats  -->
    <div class="shapes-stats">
      <div>
        Total weight:
        <span class="shapes-stats__weight">
          {{ totalRandomShapesWeight }} kg
        </span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { SPACE_KEY } from "@/constants";

export default {
  name: "ScoreArea",
  computed: {
    ...mapState([
      "fallenShapes",
      "fallingShapes",
      "isGamePaused",
      "isModalShown",
      "distributedShapes"
    ]),

    totalDroppedShapesWeight() {
      return this.getTotalWeight(this.fallenShapes);
    },

    totalRandomShapesWeight() {
      return this.getTotalWeight(this.distributedShapes);
    }
  },
  created() {
    window.addEventListener("keydown", this.handleSpaceClick);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleSpaceClick);
  },
  methods: {
    ...mapActions(["startGame"]),
    ...mapMutations(["toggleSimulation"]),

    getTotalWeight(shapes = []) {
      return shapes.reduce((total, current) => (total += current.weight), 0);
    },

    handleSpaceClick(event) {
      // Prevents double click if any button focused
      event.preventDefault();

      if (event.keyCode === SPACE_KEY && !this.isModalShown) {
        this.toggleSimulation();
      }
    }
  }
};
</script>

<style scoped>
.controls-panel {
  display: flex;
  justify-content: space-between;
  flex: 0 0 6rem;
  padding: 0.5rem 1.5rem;
}

.controls-panel__btn {
  transition: 300ms ease-out;
  outline: none;

  &:first-of-type {
    margin-right: 0.5rem;
  }
}

.shapes-stats {
  font-size: 14px;
}

.shapes-stats__weight {
  font-size: 1rem;
  font-weight: 500;
}
</style>
