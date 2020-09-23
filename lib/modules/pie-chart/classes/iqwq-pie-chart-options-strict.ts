import { IQwqPieChartOptions } from './iqwq-pie-chart-options';
import { QwqPieChartPieType } from './qwq-pie-chart-pie-type';

export interface IQwqPieChartOptionsStrict<L, T>
  extends IQwqPieChartOptions<L, T> {
  pieType: QwqPieChartPieType;
  pieColors: readonly string[];
  /** [0-1] */
  outerRadiusPercentage: number;
  /** [0-1] */
  innerRadiusPercentage: number;
}
