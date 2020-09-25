import { curveMonotoneX, line, Line } from 'd3';
import {
  IQwqLineChartOptionsStrict,
  IQwqLineChartPoint,
  IQwqLineChartScaleOptions,
  QwqLineChartLineType,
} from '../classes';

export function qwqUnstackedLine<L, T>(
  scaleOptions: IQwqLineChartScaleOptions,
  chartOptions: IQwqLineChartOptionsStrict<L, T>
): Line<IQwqLineChartPoint> {
  const lineFx = line<IQwqLineChartPoint>();
  lineFx.x((d) => {
    return scaleOptions.xScaleFx(d.xValue) || 0;
  });
  lineFx.y((d) => {
    return scaleOptions.yScaleFx(d.yValue);
  });
  if (chartOptions.lineType === QwqLineChartLineType.curve) {
    lineFx.curve(curveMonotoneX);
  }
  return lineFx;
}
