export interface IQwqBarChartOptions<L, T> {
  stackedType?: 'none' | 'stacked' | 'percentage';
  direction?: 'horizontal' | 'vertical' | undefined;
  barColors?: readonly string[];
  dataValueFx: (columnData: readonly T[], rowIndex: number) => number;
  labelValueFx: (label: L, rowIndex: number) => string;
}
