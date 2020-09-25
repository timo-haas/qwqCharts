import {
  IQwqBarChartOptionsStrict,
  IQwqBarChartRect,
  IQwqBarChartScaleArea,
  QwqBarChartDirection,
  QwqBarChartStackType,
} from '../classes';
import { qwqBarCreateRectPercentageHorizontal } from './qwq-bar-create-rect-percentage-horizontal';
import { qwqBarCreateRectPercentageVertical } from './qwq-bar-create-rect-percentage-vertical';
import { qwqBarCreateRectStackedHorizontal } from './qwq-bar-create-rect-stacked-horizontal';
import { qwqBarCreateRectUnstackedHorizontal } from './qwq-bar-create-rect-unstacked-horizontal';

export function qwqBarGetCreateRectFx<L, T>(
  strictChartOptions: IQwqBarChartOptionsStrict<L, T>
): (scaleArea: IQwqBarChartScaleArea) => IQwqBarChartRect {
  const isHorizontal =
    strictChartOptions.direction === QwqBarChartDirection.horizontal;

  switch (strictChartOptions.stackedType) {
    case QwqBarChartStackType.none: {
      if (isHorizontal) {
        return qwqBarCreateRectUnstackedHorizontal;
      }
      return (scaleArea: IQwqBarChartScaleArea): IQwqBarChartRect => {
        const horizontalRect = qwqBarCreateRectUnstackedHorizontal(scaleArea);
        const verticalRect: IQwqBarChartRect = {
          x: horizontalRect.y,
          y: horizontalRect.x,
          height: horizontalRect.width,
          width: horizontalRect.height,
        };
        return verticalRect;
      };
    }
    case QwqBarChartStackType.stacked: {
      if (isHorizontal) {
        return qwqBarCreateRectStackedHorizontal;
      }
      return (scaleArea: IQwqBarChartScaleArea): IQwqBarChartRect => {
        const horizontalRect = qwqBarCreateRectStackedHorizontal(scaleArea);
        const verticalRect: IQwqBarChartRect = {
          x: horizontalRect.y,
          y: horizontalRect.x,
          height: horizontalRect.width,
          width: horizontalRect.height,
        };
        return verticalRect;
      };
    }
    case QwqBarChartStackType.percentage:
      return isHorizontal
        ? qwqBarCreateRectPercentageHorizontal
        : qwqBarCreateRectPercentageVertical;
    default:
      const compileProtect: never = strictChartOptions.stackedType;
      return compileProtect;
  }
}
