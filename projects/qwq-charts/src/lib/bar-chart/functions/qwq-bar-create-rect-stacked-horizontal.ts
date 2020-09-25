import {
  IQwqBarChartPoint,
  IQwqBarChartRect,
  IQwqBarChartScaleArea,
} from '../classes';

export function qwqBarCreateRectStackedHorizontal(
  scaleArea: IQwqBarChartScaleArea
): IQwqBarChartRect {
  const numZero = scaleArea.numScale(0);

  let currentPositives: (number | undefined)[] = [];
  let currentNegatives: (number | undefined)[] = [];

  const barRect: IQwqBarChartRect = {
    y: function (point: IQwqBarChartPoint): number {
      const labelValue = scaleArea.labelScale(point.labelValue) || 0;
      return labelValue;
    },
    x: function (point: IQwqBarChartPoint): number {
      const numValue = scaleArea.numScale(point.numValue);
      const isSmallerZero = numValue < numZero;
      const width = Math.abs(numValue - numZero);
      if (isSmallerZero) {
        const currentNeg = currentNegatives[point.rowIndex] ?? numZero;
        const nextNeg = currentNeg - width;
        currentNegatives[point.rowIndex] = nextNeg;
        return nextNeg;
      } else {
        const currentPos = currentPositives[point.rowIndex] ?? numZero;
        const nextPos = currentPos + width;
        currentPositives[point.rowIndex] = nextPos;
        return currentPos;
      }
    },
    height: function (point: IQwqBarChartPoint): number {
      return scaleArea.bandWidth;
    },
    width: function (point: IQwqBarChartPoint): number {
      const numValue = scaleArea.numScale(point.numValue);
      const width = Math.abs(numValue - numZero);
      return width;
    },
  };
  return barRect;
}
