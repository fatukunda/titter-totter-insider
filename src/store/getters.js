import { MIN_BENDING_ANGLE, MAX_BENDING_ANGLE } from "@/constants";

import utils from "../utils";

const { getShapeSizes } = utils;

const getters = {
  bendingAngle(state, { fallenShapesSum, distributedShapesSum }) {
    let angle = 0;
    if (!fallenShapesSum) {
      angle = MAX_BENDING_ANGLE;
    } else {
      const sub = Math.abs(fallenShapesSum - distributedShapesSum);
      angle =
        fallenShapesSum > distributedShapesSum
          ? (sub / fallenShapesSum) * -50
          : (sub / distributedShapesSum) * 50;
    }
    return angle;
  },
  distributedShapesSum({ distributedShapes }) {
    return getShapeSizes(distributedShapes);
  },
  fallenShapesSum({ fallenShapes }) {
    return getShapeSizes(fallenShapes, true);
  },
  isBoardAngleWithinLimits(state, { bendingAngle }) {
    return bendingAngle > MIN_BENDING_ANGLE && bendingAngle < MAX_BENDING_ANGLE;
  }
};

export default getters;
