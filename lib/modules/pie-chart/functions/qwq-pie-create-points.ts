import {
  IQwqPieChartData,
  IQwqPieChartOptionsStrict,
  IQwqPieChartPoint,
} from '../classes';

export function qwqPieCreatePiePoints<L, T>(
  chartData: IQwqPieChartData<L, T>,
  strictChartOptions: IQwqPieChartOptionsStrict<L, T>
): IQwqPieChartPoint[] {
  const labelValues = chartData.labels.map((label, labelIdx) => {
    return strictChartOptions.labelValueFx(label, labelIdx);
  });
  const pointsPerGroup = chartData.data.map((dataItem, columnIdx) => {
    const dataValue = strictChartOptions.dataValueFx(dataItem, columnIdx);
    const pointInPie: IQwqPieChartPoint = {
      labelValue: labelValues[columnIdx] || '',
      dataValue: dataValue,
      color: strictChartOptions.pieColors[columnIdx] || '',
    };
    return pointInPie;
  });
  return pointsPerGroup;
}
