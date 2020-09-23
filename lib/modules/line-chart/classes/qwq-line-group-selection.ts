import { Selection } from 'd3';
import { IQwqLineChartPoint } from './iqwq-line-chart-point';

export type QwqLineGroupSelection = Selection<
  SVGGElement,
  IQwqLineChartPoint[],
  SVGSVGElement,
  unknown
>;
