import { select } from 'd3';
import {
  IQwqLineChartData,
  IQwqLineChartOptions,
  IQwqLineChartScaleOptions,
  QwqLineChartLineType,
} from './classes';
import {
  qwqCreateLinePoints,
  qwqCreateScales,
  qwqCreateStrictOptions,
  qwqCreateXAxis,
  qwqCreateYAxis,
  qwqUnstackedLine,
} from './functions';

export function qwqCreateLineChart<L, T>(
  chartData: IQwqLineChartData<L, T>,
  chartOptions: IQwqLineChartOptions<L, T>
): SVGSVGElement {
  const strictChartOptions = qwqCreateStrictOptions(chartOptions);

  const viewBoxHeight = 400;
  const viewBoxWidth = 400;
  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  const d3Svg = select(svgElement);
  d3Svg.attr('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

  const scaleArea = qwqCreateScales(
    chartData,
    strictChartOptions,
    viewBoxWidth,
    viewBoxHeight
  );

  const yAxis = qwqCreateYAxis(scaleArea, chartOptions);

  const xDomain = scaleArea.xScale.domain();
  const xMax = xDomain[xDomain.length - 1] || 0;
  const xZero = scaleArea.xScale(Math.min(xMax, 0));
  const numScaleGroup = d3Svg.append('g');
  numScaleGroup.attr('transform', `translate(${xZero},0)`);
  numScaleGroup.call(yAxis);

  const yDomain = scaleArea.yScale.domain();
  const yMax = yDomain[yDomain.length - 1] || 0;
  const yZero = scaleArea.yScale(Math.min(yMax, 0));
  const xAxis = qwqCreateXAxis(scaleArea);
  const labelScaleGroup = d3Svg.append('g');
  labelScaleGroup.attr('transform', `translate(0,${yZero})`);
  labelScaleGroup.call(xAxis);

  const pointsPerGroup = qwqCreateLinePoints(chartData, strictChartOptions);

  const dataGroupSelection = d3Svg
    .selectAll<SVGGElement, number>('.qwq-line-chart-group')
    .data(pointsPerGroup)
    .join('g')
    .attr('class', 'qwq-line-chart-group');

  const { yScale, xScale } = scaleArea;

  const scaleOptions: IQwqLineChartScaleOptions = {
    xScaleFx: (dataValue: number): number | undefined => {
      return xScale(dataValue);
    },
    yScaleFx: (dataValue: number): number => {
      return yScale(dataValue);
    },
  };
  const lineWidth = 0.15;
  if (strictChartOptions.lineType !== QwqLineChartLineType.none) {
    const lineFx = qwqUnstackedLine(scaleOptions, strictChartOptions);
    dataGroupSelection
      .append('path')
      .attr('class', 'qwq-line-chart-line')
      .attr('d', (pointsPerRow) => lineFx(pointsPerRow))
      .attr('fill', 'transparent')
      .attr('stroke-width', `${lineWidth}em`)
      .attr(
        'stroke',
        (pointsPerRow) => (pointsPerRow[0] && pointsPerRow[0].color) || ''
      );
  }
  if (strictChartOptions.showPoints) {
    const circle = dataGroupSelection
      .selectAll('.qwq-line-chart-point')
      .data((pointsPerRow) => pointsPerRow)
      .join('circle')
      .attr('class', 'qwq-line-chart-point');

    circle
      .attr('cx', (point) => scaleOptions.xScaleFx(point.xValue) || 0)
      .attr('cy', (point) => {
        return scaleOptions.yScaleFx(point.yValue);
      })
      .attr('fill', (point) => point.color)
      .attr('r', `${lineWidth * 2.8}em`);
  }
  return svgElement;
}
