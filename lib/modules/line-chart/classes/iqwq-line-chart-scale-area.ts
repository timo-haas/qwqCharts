import { ScaleLinear } from 'd3';

export interface IQwqLineChartScaleArea {
  readonly xScale: ScaleLinear<number, number>;
  readonly yScale: ScaleLinear<number, number>;
  readonly alignment: {
    readonly vertical: 'top' | 'bottom';
    readonly horizontal: 'left' | 'right';
  };
  readonly viewBox: {
    readonly height: number;
    readonly width: number;
  };
  readonly margin: {
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly left: number;
  };
}
