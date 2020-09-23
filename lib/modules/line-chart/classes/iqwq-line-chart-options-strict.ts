import { IQwqLineChartOptions } from './iqwq-line-chart-options';
import { QwqLineChartLineType } from './qwq-line-chart-line-type';
import { QwqLineChartStackType } from './qwq-line-chart-stack-type';

export interface IQwqLineChartOptionsStrict<L, T>
  extends IQwqLineChartOptions<L, T> {
  stackedType: QwqLineChartStackType;
  lineType: QwqLineChartLineType | undefined;
  lineColors: readonly string[];
  showPoints: boolean;
}
