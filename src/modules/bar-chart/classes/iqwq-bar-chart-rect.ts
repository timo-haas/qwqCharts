import { IQwqBarChartPoint } from './iqwq-bar-chart-point';

export interface IQwqBarChartRect {
  y: (point: IQwqBarChartPoint) => number;
  x: (point: IQwqBarChartPoint) => number;
  height: (point: IQwqBarChartPoint) => number;
  width: (point: IQwqBarChartPoint) => number;
}
