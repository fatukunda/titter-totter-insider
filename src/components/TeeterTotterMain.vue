<template>
  <div class="teeter-totter-main">
    <div class="teeter-totter-board" :style="boardStyles">
      <!-- Dropped shapes (left side) -->
      <TeeterObject
        v-for="shape in fallenShapes"
        :key="shape.id"
        :object="shape"
        on-board
      ></TeeterObject>

      <!-- Randomly places shapes (right side) -->
      <TeeterObject
        v-for="shape in distributedShapes"
        :key="shape.id"
        :object="shape"
        on-board
        randomly-distributed
      ></TeeterObject>
    </div>

    <div class="teeter-totter-base"></div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import { BOARD_HEIGHT } from "@/constants";

import TeeterObject from "./TeeterObject";

export default {
  name: "TetterTotterMain",
  components: { TeeterObject },
  computed: {
    ...mapGetters(["bendingAngle", "isBoardAngleWithinLimits"]),
    ...mapState(["fallenShapes", "distributedShapes"]),

    boardStyles() {
      return {
        transform: `rotate(${this.bendingAngle / 2}deg)`,
        height: `${BOARD_HEIGHT}px`
      };
    },

    shapesDiff() {
      return this.fallenShapes.length - this.distributedShapes.length;
    }
  },
  watch: {
    shapesDiff(current) {
      if (current && this.isBoardAngleWithinLimits) {
        this.generateObject(true);
      }
    }
  },
  methods: {
    ...mapMutations(["generateObject"])
  }
};
</script>

<style scoped>
.teeter-totter-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.teeter-totter-board {
  position: relative;
  width: 100%;
  background-color: #d74545;
  transition: 300ms ease-in-out;
}

.teeter-totter-base {
  width: 0;
  height: 0;
  border-left: 3rem solid transparent;
  border-right: 3rem solid transparent;
  border-bottom: 8rem solid #9b9b9b;
}
</style>
