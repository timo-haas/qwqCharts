import { pie, Pie } from 'd3';
import { IQwqPieChartPoint } from '../classes';

export function qwqPie(): Pie<unknown, IQwqPieChartPoint> {
  const pieFx = pie<unknown, IQwqPieChartPoint>();
  pieFx.value((d) => {
    return d.dataValue || 0;
  });
  return pieFx;
}
