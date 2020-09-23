import { IQwqBarChartOptions } from './iqwq-bar-chart-options';
import { QwqBarChartDirection } from './qwq-bar-chart-direction';
import { QwqBarChartStackType } from './qwq-bar-chart-stack-type';

export interface IQwqBarChartOptionsStrict<L, T>
  extends IQwqBarChartOptions<L, T> {
  stackedType: QwqBarChartStackType;
  direction: QwqBarChartDirection;
  barColors: readonly string[];
}
