export interface IQwqBarChartPoint {
  readonly labelValue: string;
  readonly numValue: number;
  readonly color: string;
  readonly rowIndex: number;
  readonly columnIndex: number;
  readonly groupSums: {
    readonly positiveSum: number;
    readonly negativeSum: number;
    readonly absSum: number;
  };
}
