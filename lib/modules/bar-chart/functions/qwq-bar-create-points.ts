import {
  IQwqBarChartData,
  IQwqBarChartOptionsStrict,
  IQwqBarChartPoint,
} from '../classes';

export function qwqBarCreatePoints<L, T>(
  chartData: IQwqBarChartData<L, T>,
  strictChartOptions: IQwqBarChartOptionsStrict<L, T>
): IQwqBarChartPoint[][] {
  const labelValues = chartData.labels.map((label, labelIdx) => {
    return strictChartOptions.labelValueFx(label, labelIdx);
  });
  return labelValues.map((labelValue, rowIndex) => {
    let positiveSum = 0;
    let negativeSum = 0;

    const numValues = chartData.data.map((columnValues, columnIndex) => {
      const color = strictChartOptions.barColors[columnIndex] || '';
      const numValue = strictChartOptions.dataValueFx(columnValues, rowIndex);

      if (numValue < 0) {
        negativeSum += numValue;
      } else {
        positiveSum += numValue;
      }

      return { numValue, color, columnIndex };
    });

    const absSum = Math.abs(positiveSum) + Math.abs(negativeSum);

    const pointsPerLabel = numValues.map((numValue) => {
      const pointInBar: IQwqBarChartPoint = {
        labelValue: labelValue,
        numValue: numValue.numValue,
        color: numValue.color,
        rowIndex,
        columnIndex: numValue.columnIndex,
        groupSums: {
          positiveSum,
          negativeSum,
          absSum,
        },
      };
      return pointInBar;
    });
    return pointsPerLabel;
  });
}
