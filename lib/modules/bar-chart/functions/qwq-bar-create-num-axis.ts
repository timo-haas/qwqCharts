import { axisBottom, axisLeft } from 'd3';
import {
  IQwqBarChartOptionsStrict,
  IQwqBarChartScaleArea,
  QwqBarChartDirection,
  QwqBarChartStackType,
} from '../classes';
export function qwqBarCreateNumAxis<L, T>(
  scaleArea: IQwqBarChartScaleArea,
  chartOptions: IQwqBarChartOptionsStrict<L, T>
) {
  const isHorizontal =
    chartOptions.direction === QwqBarChartDirection.horizontal;
  const isPercentage =
    chartOptions.stackedType === QwqBarChartStackType.percentage;

  const numAxisFx = isHorizontal ? axisBottom : axisLeft;
  const numAxis = numAxisFx(scaleArea.numScale).tickSizeOuter(0);
  if (isPercentage) {
    numAxis.tickFormat((domain) => domain + '%');
  }
  return numAxis;
}
