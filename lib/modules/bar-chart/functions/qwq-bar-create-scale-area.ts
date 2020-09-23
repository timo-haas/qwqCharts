import { scaleBand, scaleLinear } from 'd3';
import {
  IQwqBarChartData,
  IQwqBarChartOptionsStrict,
  IQwqBarChartScaleArea,
  QwqBarChartDirection,
} from '../classes';
import { qwqBarGetMinMax } from './qwq-bar-get-min-max';

export function qwqBarCreateScaleArea<L, T>(
  chartData: IQwqBarChartData<L, T>,
  chartOptions: IQwqBarChartOptionsStrict<L, T>,
  viewBoxWidth: number,
  viewBoxHeight: number
): IQwqBarChartScaleArea {
  const { min: minNum, max: maxNum } = qwqBarGetMinMax(chartData, chartOptions);
  const isHorizontal =
    chartOptions.direction === QwqBarChartDirection.horizontal;
  const columnCount = chartData.data.length || 0;

  const isTopAligned = false;
  const isRightAligned = isHorizontal && minNum <= maxNum && maxNum <= 0;
  const margin = {
    top: isTopAligned ? 40 : 20,
    right: isRightAligned ? 40 : 20,
    bottom: isTopAligned ? 20 : 40,
    left: isRightAligned ? 20 : 40,
  };

  const xRange = [margin.left, viewBoxWidth - margin.right] as [number, number];
  const yRange = [viewBoxHeight - margin.bottom, margin.top] as [
    number,
    number
  ];

  const numScaleRange = isHorizontal ? xRange : yRange;
  const labelScaleRange = !isHorizontal ? xRange : yRange;
  const numDomain = [Math.min(0, minNum), Math.max(0, maxNum)];
  const numScale = scaleLinear().domain(numDomain).range(numScaleRange);

  const labelDomain = chartData.labels.map((label, rowIndex) => {
    return chartOptions.labelValueFx(label, rowIndex);
  });
  const labelScale = scaleBand()
    .domain(labelDomain)
    .rangeRound(labelScaleRange)
    .padding(0.1);

  const numZero = numScale(0);
  const xTranslate = isHorizontal
    ? isRightAligned
      ? viewBoxWidth - margin.right
      : numZero
    : margin.left;
  const yTranslate = !isHorizontal
    ? isTopAligned
      ? margin.top
      : numZero
    : viewBoxHeight - margin.bottom;
  const bandWidth = labelScale.bandwidth();
  const scaleArea: IQwqBarChartScaleArea = {
    labelScale,
    numScale,
    bandWidth,
    bandWidthPerColumn: bandWidth / (columnCount || 1),
    alignment: {
      vertical: isTopAligned ? 'top' : 'bottom',
      horizontal: isRightAligned ? 'right' : 'left',
    },
    viewBox: { width: viewBoxWidth, height: viewBoxHeight },
    margin,
    transform: {
      vertical: `translate(0,${yTranslate})`,
      horizontal: `translate(${xTranslate},0)`,
    },
  };
  return scaleArea;
}
