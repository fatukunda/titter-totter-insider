<template>
  <div
    class="teeter-object"
    :class="objectClasses"
    style="animation-delay: 0.2s animation-duration: 0.7s"
  >
    <div class="object-weight">{{ object.weight }} kg</div>
  </div>
</template>

<script>
import { TRIANGLE, CIRCLE, SQUARE } from "@/constants";
import { mapState } from "vuex";
export default {
  name: "TeeterObject",
  props: {
    onBoard: {
      type: Boolean,
      required: false,
      default: false
    },
    randomlyDistributed: {
      type: Boolean,
      required: false,
      default: false
    },
    object: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["isModalShown"]),
    objectClasses() {
      const { type } = this.object;
      return {
        "object-square": type === SQUARE,
        "object-circle": type === CIRCLE,
        "object-triangle": type === TRIANGLE,
        "view-modal": this.isModalShown
      };
    }
  },
  mounted() {
    this.createShape();
    this.$watch("object.left", this.positionObject, { immediate: true });
  },
  methods: {
    createShape() {
      const { style } = this.$el;
      const { color, scale, type } = this.object;

      if (type === TRIANGLE) {
        style.borderBottomColor = color;
      } else {
        style.backgroundColor = color;
      }

      style.transform = `scale(${scale})`;

      if (this.onBoard) {
        style.transform += " translateY(-100%)";
      }
    },

    positionObject(left) {
      const { width } = this.$el.getBoundingClientRect();
      const start = this.randomlyDistributed ? 60 : 0;

      this.$el.style.left =
        this.randomlyDistributed && left > 25
          ? `calc(${start + left}% - ${width}px)`
          : `${start + left}%`;
    }
  }
};
</script>

<style scoped>
.teeter-object {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: top left;
}
.object-weight {
  font-size: 10px;
  font-weight: 500;
  color: #fff;
}
.object-circle {
  border-radius: 50%;
}
.object-square,
.object-circle {
  width: 2.5rem;
  height: 2.5rem;
}
.object-triangle {
  width: 0;
  height: 0;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid transparent;
  border-bottom: 2rem solid;
}
.object-triangle .object-weight {
  position: absolute;
  top: calc(100% + 1rem);
  width: 4.5rem;
  text-align: center;
}
</style>
