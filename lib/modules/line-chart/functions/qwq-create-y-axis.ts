import { axisLeft, axisRight } from 'd3';
import {
  IQwqLineChartOptions,
  IQwqLineChartScaleArea,
  QwqLineChartStackType,
} from '../classes';
export function qwqCreateYAxis<L, T>(
  scaleArea: IQwqLineChartScaleArea,
  chartOptions: IQwqLineChartOptions<L, T>
) {
  const yAxisFx =
    scaleArea.alignment.horizontal === 'left' ? axisLeft : axisRight;
  const yAxis = yAxisFx(scaleArea.yScale).tickSizeOuter(0);
  if (chartOptions.stackedType === QwqLineChartStackType.percentage) {
    yAxis.tickFormat((domain) => domain + '%');
  }
  return yAxis;
}
