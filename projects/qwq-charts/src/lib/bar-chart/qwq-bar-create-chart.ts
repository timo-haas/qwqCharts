import { select } from 'd3';
import {
  IQwqBarChartData,
  IQwqBarChartOptions,
  QwqBarChartDirection,
} from './classes';
import {
  qwqBarCreateLabelAxis,
  qwqBarCreateNumAxis,
  qwqBarCreatePoints,
  qwqBarCreateScaleArea,
  qwqBarCreateStrictOptions,
  qwqBarGetCreateRectFx,
} from './functions';

export function qwqBarCreateChart<L, T>(
  chartData: IQwqBarChartData<L, T>,
  chartOptions: IQwqBarChartOptions<L, T>
): SVGSVGElement {
  const strictChartOptions = qwqBarCreateStrictOptions(chartOptions);
  const isHorizontal =
    chartOptions.direction === QwqBarChartDirection.horizontal;

  const viewBoxHeight = 400;
  const viewBoxWidth = 400;
  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  const d3Svg = select(svgElement);
  d3Svg.attr('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

  const scaleArea = qwqBarCreateScaleArea(
    chartData,
    strictChartOptions,
    viewBoxWidth,
    viewBoxHeight
  );

  const verticalScaleGroup = d3Svg.append('g');
  verticalScaleGroup.attr('transform', scaleArea.transform.vertical);

  const horizontalScaleGroup = d3Svg.append('g');
  horizontalScaleGroup.attr('transform', scaleArea.transform.horizontal);

  const numAxis = qwqBarCreateNumAxis(scaleArea, strictChartOptions);
  const labelAxis = qwqBarCreateLabelAxis(scaleArea, strictChartOptions);

  horizontalScaleGroup.call(isHorizontal ? labelAxis : numAxis);
  verticalScaleGroup.call(isHorizontal ? numAxis : labelAxis);

  const groupedPoints = qwqBarCreatePoints(chartData, strictChartOptions);
  const dataGroupSelection = d3Svg
    .selectAll<SVGGElement, number>('.qwq-bar-chart-group')
    .data(groupedPoints)
    .join('g')
    .attr('class', 'qwq-bar-chart-group');

  const createRectFx = qwqBarGetCreateRectFx(strictChartOptions);
  const barRect = createRectFx(scaleArea);

  dataGroupSelection
    .selectAll('.qwq-bar-chart-rect')
    .data((groupedPoints) => groupedPoints)
    .join('rect')
    .attr('class', 'qwq-bar-chart-rect')
    .attr('y', (point) => barRect.y(point))
    .attr('x', (point) => barRect.x(point))
    .attr('height', (point) => barRect.height(point))
    .attr('width', (point) => barRect.width(point))
    .attr('fill', (point) => point.color)
    .attr('class', 'qwq-self-origin qwq-origin--center-bottom');

  return svgElement;
}
