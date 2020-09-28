import { qwqGetTableau10Colors } from 'qwq-charts-shared';
import {
  IQwqLineChartOptions,
  IQwqLineChartOptionsStrict,
  QwqLineChartLineType,
  QwqLineChartStackType,
} from '../classes';
export function qwqCreateStrictOptions<L, T>(
  chartOptions: IQwqLineChartOptions<L, T>
): IQwqLineChartOptionsStrict<L, T> {
  const strictChartOptions: IQwqLineChartOptionsStrict<L, T> = {
    stackedType:
      (chartOptions.stackedType &&
        QwqLineChartStackType[chartOptions.stackedType]) ||
      QwqLineChartStackType.none,
    lineType:
      (chartOptions.lineType && QwqLineChartLineType[chartOptions.lineType]) ||
      QwqLineChartLineType.none,
    lineColors: chartOptions.lineColors || qwqGetTableau10Colors(),
    showPoints: !!chartOptions.showPoints,
    dataValueFx: chartOptions.dataValueFx,
    labelValueFx: chartOptions.labelValueFx,
  };
  return strictChartOptions;
}
