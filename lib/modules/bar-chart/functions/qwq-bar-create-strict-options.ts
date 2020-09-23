import { qwqGetTableau10Colors } from '../../shared';
import {
  IQwqBarChartOptions,
  IQwqBarChartOptionsStrict,
  QwqBarChartDirection,
  QwqBarChartStackType,
} from '../classes';

export function qwqBarCreateStrictOptions<L, T>(
  chartOptions: IQwqBarChartOptions<L, T>
): IQwqBarChartOptionsStrict<L, T> {
  const strictChartOptions: IQwqBarChartOptionsStrict<L, T> = {
    stackedType:
      (chartOptions.stackedType &&
        QwqBarChartStackType[chartOptions.stackedType]) ||
      QwqBarChartStackType.none,
    direction:
      (chartOptions.direction &&
        QwqBarChartDirection[chartOptions.direction]) ||
      QwqBarChartDirection.horizontal,
    barColors: chartOptions.barColors || qwqGetTableau10Colors(),
    dataValueFx: chartOptions.dataValueFx,
    labelValueFx: chartOptions.labelValueFx,
  };
  return strictChartOptions;
}
