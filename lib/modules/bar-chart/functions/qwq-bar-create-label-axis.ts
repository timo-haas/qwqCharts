import { axisBottom, axisLeft, axisRight } from 'd3';
import {
  IQwqBarChartOptionsStrict,
  IQwqBarChartScaleArea,
  QwqBarChartDirection,
} from '../classes';

export function qwqBarCreateLabelAxis<L, T>(
  scaleArea: IQwqBarChartScaleArea,
  chartOptions: IQwqBarChartOptionsStrict<L, T>
) {
  const isHorizontal =
    chartOptions.direction === QwqBarChartDirection.horizontal;
  const labelAxisFx = isHorizontal
    ? scaleArea.alignment.horizontal === 'right'
      ? axisRight
      : axisLeft
    : axisBottom;

  return labelAxisFx(scaleArea.labelScale).tickSizeOuter(0);
}
