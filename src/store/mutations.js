import {
  MIN_WEIGHT,
  MAX_WEIGHT,
  SCALE_STEP,
  MIN_FALLING_INTERVAL,
  MAX_FALLING_INTERVAL
} from "@/constants";

import utils from "../utils";
const { generateRandomNumber, generateRandomColor, generateShapeId } = utils;
const mutations = {
  generateObject(
    { distributedShapes, fallingShapes },
    randomlyDistributed = false
  ) {
    const weight = generateRandomNumber(MIN_WEIGHT, MAX_WEIGHT - 1);
    const type = generateRandomNumber(1, 2);
    const left = generateRandomNumber(0, 40);
    const color = generateRandomColor();
    const scale = 1 + SCALE_STEP * (weight - 1);
    const top = 0;
    const id = generateShapeId.next().value;

    const shape = { id, color, left, scale, top, type, weight };
    if (randomlyDistributed) {
      distributedShapes.push(shape);
    } else {
      fallingShapes.push(shape);
    }
  },
  moveShape({ fallingShapes }, { moveLeft, width }) {
    const shape = fallingShapes[0];

    const canMoveLeft = shape.left - 1 >= 0;
    const canMoveRight = shape.left + width + 1 <= 45;

    if (moveLeft) canMoveLeft && shape.left--;
    else canMoveRight && shape.left++;
  },
  updateFallingInterval(state, reset = false) {
    if (reset) {
      state.fallingInterval = MAX_FALLING_INTERVAL;
    } else if (state.fallingInterval > MIN_FALLING_INTERVAL) {
      state.fallingInterval--;
    }
  },
  toggleModal(state, isShown = false) {
    state.isModalShown = isShown;
  },
  toggleSimulation(state) {
    state.isGamePaused = !state.isGamePaused;
  },
  addDroppedShape(state, shape = {}) {
    state.fallenShapes.push(shape);
  },
  clearAllShapes(state) {
    state.fallenShapes = [];
    state.fallingShapes = [];
    state.distributedShapes = [];
  }
};

export default mutations;
