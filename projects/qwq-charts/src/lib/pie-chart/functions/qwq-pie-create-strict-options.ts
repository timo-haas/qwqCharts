import { qwqGetTableau10Colors } from '../../shared';
import {
  IQwqPieChartOptions,
  IQwqPieChartOptionsStrict,
  QwqPieChartPieType,
} from '../classes';
export function qwqPieCreateStrictOptions<L, T>(
  chartOptions: IQwqPieChartOptions<L, T>
): IQwqPieChartOptionsStrict<L, T> {
  const strictChartOptions: IQwqPieChartOptionsStrict<L, T> = {
    pieType:
      (chartOptions.pieType && QwqPieChartPieType[chartOptions.pieType]) ||
      QwqPieChartPieType.normal,
    pieColors: chartOptions.pieColors || qwqGetTableau10Colors(),
    dataValueFx: chartOptions.dataValueFx,
    labelValueFx: chartOptions.labelValueFx,
    innerRadiusPercentage: Math.max(
      0,
      Math.min(1, chartOptions.innerRadiusPercentage ?? 0)
    ),
    outerRadiusPercentage: Math.max(
      0,
      Math.min(1, chartOptions.outerRadiusPercentage ?? 1)
    ),
  };
  return strictChartOptions;
}
