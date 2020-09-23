import { ScaleBand, ScaleLinear } from 'd3';

export interface IQwqBarChartScaleArea {
  readonly labelScale: ScaleBand<string>;
  readonly numScale: ScaleLinear<number, number>;
  readonly bandWidth: number;
  readonly bandWidthPerColumn: number;
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
  readonly transform: {
    readonly vertical: string;
    readonly horizontal: string;
  };
}
