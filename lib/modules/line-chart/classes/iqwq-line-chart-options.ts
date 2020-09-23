export interface IQwqLineChartOptions<L, T> {
  stackedType?: 'none' | 'stacked' | 'percentage';
  lineType?: 'none' | 'straight' | 'curve' | undefined;
  lineColors?: readonly string[];
  showPoints?: boolean;
  dataValueFx: (columnData: readonly T[], rowIndex: number) => number;
  labelValueFx: (label: L, rowIndex: number) => number;
}
