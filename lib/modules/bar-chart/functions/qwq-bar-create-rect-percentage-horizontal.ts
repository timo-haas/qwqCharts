import {
  IQwqBarChartPoint,
  IQwqBarChartRect,
  IQwqBarChartScaleArea,
} from '../classes';

export function qwqBarCreateRectPercentageHorizontal(
  scaleArea: IQwqBarChartScaleArea
): IQwqBarChartRect {
  const numZero = scaleArea.numScale(0);
  let percentageInUse: (number | undefined)[] = [];
  function getPercentageValue(point: IQwqBarChartPoint) {
    const absNumValue = Math.abs(point.numValue);
    const percentageValue = absNumValue / point.groupSums.absSum;
    return percentageValue;
  }

  const barRect: IQwqBarChartRect = {
    y: function (point: IQwqBarChartPoint): number {
      const labelValue = scaleArea.labelScale(point.labelValue) || 0;
      return labelValue;
    },
    x: function (point: IQwqBarChartPoint): number {
      const percentageValue = getPercentageValue(point);
      const currentPercentageInUse = percentageInUse[point.rowIndex] || 0;
      const nextPercentageInUse = currentPercentageInUse + percentageValue;
      percentageInUse[point.rowIndex] = nextPercentageInUse;
      const numValue = scaleArea.numScale(currentPercentageInUse * 100);
      return numValue;
    },
    height: function (): number {
      return scaleArea.bandWidth;
    },
    width: function (point: IQwqBarChartPoint): number {
      const percentageValue = getPercentageValue(point);
      const numValue = scaleArea.numScale(percentageValue * 100);
      return Math.abs(numValue - numZero);
    },
  };
  return barRect;
}
