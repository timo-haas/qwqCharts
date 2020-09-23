import { axisBottom, axisTop } from 'd3';
import { IQwqLineChartScaleArea } from '../classes';

export function qwqCreateXAxis(scaleArea: IQwqLineChartScaleArea) {
  const xAxisFx = scaleArea.alignment.vertical === 'top' ? axisTop : axisBottom;
  return xAxisFx(scaleArea.xScale).tickSizeOuter(0);
}
