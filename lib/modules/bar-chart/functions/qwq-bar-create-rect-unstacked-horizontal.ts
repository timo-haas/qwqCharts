import {
  IQwqBarChartPoint,
  IQwqBarChartRect,
  IQwqBarChartScaleArea,
} from '../classes';

export function qwqBarCreateRectUnstackedHorizontal(
  scaleArea: IQwqBarChartScaleArea
): IQwqBarChartRect {
  const numZero = scaleArea.numScale(0);
  const barRect: IQwqBarChartRect = {
    y: function (point: IQwqBarChartPoint): number {
      const labelValue = scaleArea.labelScale(point.labelValue) || 0;
      return labelValue + scaleArea.bandWidthPerColumn * point.columnIndex;
    },
    x: function (point: IQwqBarChartPoint): number {
      const numValue = scaleArea.numScale(point.numValue);
      if (numValue > numZero) {
        return numZero;
      }
      return numValue;
    },
    height: function (): number {
      return scaleArea.bandWidthPerColumn;
    },
    width: function (point: IQwqBarChartPoint): number {
      const numValue = scaleArea.numScale(point.numValue);
      return Math.abs(numValue - numZero);
    },
  };
  return barRect;
}
