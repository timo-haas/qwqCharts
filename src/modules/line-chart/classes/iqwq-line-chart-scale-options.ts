export interface IQwqLineChartScaleOptions {
  readonly xScaleFx: (dataValue: number) => number | undefined;
  readonly yScaleFx: (dataValue: number) => number;
}
