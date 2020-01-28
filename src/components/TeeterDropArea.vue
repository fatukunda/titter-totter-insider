<template>
  <div class="dropping-area">
    <TeeterObject
      v-for="shape in fallingShapes"
      :key="shape.id"
      :object="shape"
      :id="`falling-shape-${shape.id}`"
    ></TeeterObject>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";

import {
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY,
  BOARD_HEIGHT,
  BOARD_WIDTH
} from "@/constants";

import TeeterObject from "./TeeterObject";

export default {
  name: "TeeterDropArea",
  components: { TeeterObject },
  data() {
    return {
      intervalId: null,
      shapeBottomLimit: null
    };
  },
  computed: {
    ...mapGetters(["bendingAngle", "isBoardAngleWithinLimits"]),
    ...mapState(["fallingInterval", "fallingShapes", "isGamePaused"]),

    fallingShapeEl() {
      const { id } = this.fallingShapes[0];

      return document.getElementById(`falling-shape-${id}`);
    }
  },
  mounted() {
    const boardEl = document.querySelector(".teeter-totter-board");

    boardEl.addEventListener("transitionend", this.handleBoardTransitionEnd);
    window.addEventListener("keydown", this.moveFallingShape);

    this.$once("hook:beforeDestroy", () => {
      boardEl.removeEventListener(
        "transitionend",
        this.handleBoardTransitionEnd
      );
      window.removeEventListener("keydown", this.moveFallingShape);
    });
  },
  watch: {
    isGamePaused: {
      handler(current) {
        if (current) {
          clearInterval(this.intervalId);
        } else {
          this.getShapeBottomLimit();
          this.animateShape();
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      "addDroppedShape",
      "generateObject",
      "moveShape",
      "toggleSimulation",
      "toggleModal",
      "updateFallingInterval"
    ]),

    animateShape() {
      this.intervalId = setInterval(() => {
        if (this.fallingShapes[0].top >= this.shapeBottomLimit) {
          const droppedShape = this.fallingShapes.shift();
          clearInterval(this.intervalId);

          this.addDroppedShape(droppedShape);
          this.updateFallingInterval();
          this.generateShape();
          this.animateShape();
        } else {
          this.fallingShapes[0].top += 1;
          this.fallingShapeEl.style.top = `${this.fallingShapes[0].top}px`;
        }
      }, this.fallingInterval);
    },

    getShapeBottomLimit() {
      const boardBounds = document
        .querySelector(".teeter-totter-board")
        .getBoundingClientRect();
      const panelBounds = document
        .querySelector(".controls-panel")
        .getBoundingClientRect();
      const shapeBounds = this.fallingShapeEl.getBoundingClientRect();

      // Similarity of triangles
      const totterCathet = boardBounds.bottom - boardBounds.top - BOARD_HEIGHT;
      const similarCathet =
        (this.fallingShapes[0].left * totterCathet) / BOARD_WIDTH;

      this.shapeBottomLimit =
        this.bendingAngle >= 0
          ? boardBounds.top +
            similarCathet -
            shapeBounds.height -
            panelBounds.height
          : boardBounds.bottom -
            similarCathet -
            shapeBounds.height -
            panelBounds.height;
    },

    handleBoardTransitionEnd() {
      if (this.isGamePaused) return;

      if (this.isBoardAngleWithinLimits) {
        this.getShapeBottomLimit();
      } else {
        this.toggleSimulation();
        this.toggleModal(true);
      }
    },

    moveFallingShape({ keyCode }) {
      const isArrowKeyPressed = [LEFT_ARROW_KEY, RIGHT_ARROW_KEY].includes(
        keyCode
      );

      if (this.isGamePaused || !isArrowKeyPressed) return;

      const shapeWidth = this.fallingShapeEl.getBoundingClientRect().width;
      const areaWidth = document
        .querySelector(".dropping-area")
        .getBoundingClientRect().width;

      this.moveShape({
        moveLeft: keyCode === LEFT_ARROW_KEY,
        width: (shapeWidth / areaWidth) * 100
      });

      this.$nextTick(this.getShapeBottomLimit);
    }
  }
};
</script>

<style scoped>
.dropping-area {
  position: relative;
  flex: 1 1 50%;
}
</style>
