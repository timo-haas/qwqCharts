import { qwqGetMinMax } from 'qwq-charts-shared';
import {
  IQwqBarChartData,
  IQwqBarChartOptionsStrict,
  QwqBarChartStackType,
} from '../classes';

export function qwqBarGetMinMax<L, T>(
  chartData: IQwqBarChartData<L, T>,
  chartOptions: IQwqBarChartOptionsStrict<L, T>
): { readonly min: number; readonly max: number } {
  const stackedType = chartOptions.stackedType;
  if (!stackedType || stackedType === QwqBarChartStackType.none) {
    const chartNumData = chartData.data.map((columnValues) => {
      return columnValues.map((_data, rowIndex) => {
        return chartOptions.dataValueFx(columnValues, rowIndex);
      });
    });
    const { min, max } = qwqGetMinMax(chartNumData);
    return { min, max };
  } else if (stackedType === QwqBarChartStackType.stacked) {
    const sums = chartData.labels
      .map((_label, rowIndex) => {
        return chartData.data
          .map((columnValues) => {
            return chartOptions.dataValueFx(columnValues, rowIndex);
          })
          .reduce(
            (memo, next) => {
              next = next || 0;
              if (next < 0) {
                memo.negative += next;
              } else {
                memo.positive += next;
              }
              return memo;
            },
            {
              negative: 0,
              positive: 0,
            }
          );
      })
      .map((obj) => [obj.positive, obj.negative]);
    const { min, max } = qwqGetMinMax(sums);
    return { min, max };
  } else if (stackedType === QwqBarChartStackType.percentage) {
    return { min: 0, max: 100 };
  } else {
    return { min: 0, max: 10 };
  }
}
