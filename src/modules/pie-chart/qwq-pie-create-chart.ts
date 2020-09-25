import { arc, select } from 'd3';
import {
  IQwqPieChartData,
  IQwqPieChartOptions,
  IQwqPieChartPoint,
} from './classes';
import {
  qwqPie,
  qwqPieCreatePiePoints,
  qwqPieCreateStrictOptions,
} from './functions';

export function qwqPieCreateChart<L, T>(
  chartData: IQwqPieChartData<L, T>,
  chartOptions: IQwqPieChartOptions<L, T>
): SVGSVGElement {
  const strictChartOptions = qwqPieCreateStrictOptions(chartOptions);

  const viewBoxHeight = 400;
  const viewBoxWidth = 400;
  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  const d3Svg = select(svgElement);
  d3Svg.attr('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

  const allPoints = qwqPieCreatePiePoints(chartData, strictChartOptions);
  const pieFx = qwqPie();
  const piePieces = pieFx(allPoints);

  const dataGroupSelection = d3Svg
    .selectAll<SVGGElement, number>('.qwq-pie-chart-group')
    .data(piePieces)
    .join('g')
    .attr('class', 'qwq-pie-chart-group')
    .attr('transform', `translate(${viewBoxWidth / 2},${viewBoxWidth / 2})`);
  const margin = 20;
  const outerRadius = Math.min(viewBoxWidth, viewBoxHeight) / 2 - margin;

  const outerRadiusPx = outerRadius * strictChartOptions.outerRadiusPercentage;
  const innerRadiusPx = outerRadius * strictChartOptions.innerRadiusPercentage;
  const arcFx = arc<IQwqPieChartPoint>()
    .innerRadius(innerRadiusPx)
    .outerRadius(outerRadiusPx);
  dataGroupSelection
    .append('path')
    .attr('class', 'qwq-pie-chart-pie')
    .attr('d', (a) => arcFx(a as any))
    .attr('fill', (pointsPerRow) => pointsPerRow.data.color || '');
  return svgElement;
}
