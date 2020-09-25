import {
  IQwqLineChartData,
  IQwqLineChartOptionsStrict,
  IQwqLineChartPoint,
} from '../classes';

export function qwqCreateLinePoints<L, T>(
  chartData: IQwqLineChartData<L, T>,
  strictChartOptions: IQwqLineChartOptionsStrict<L, T>
): IQwqLineChartPoint[][] {
  const xValues = chartData.labels.map((label, labelIdx) => {
    return strictChartOptions.labelValueFx(label, labelIdx);
  });
  const pointsPerGroup = chartData.data.map((columnValues, columnIdx) => {
    return xValues.map((xValue, xIdx) => {
      const yValue = strictChartOptions.dataValueFx(columnValues, xIdx);
      const pointInLine: IQwqLineChartPoint = {
        xValue: xValue,
        yValue: yValue,
        color: strictChartOptions.lineColors[columnIdx] || '',
      };
      return pointInLine;
    });
  });
  return pointsPerGroup;
}
