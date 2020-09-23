export interface IQwqPieChartOptions<L, T> {
  pieType?: 'normal' | 'exploded' | undefined;
  pieColors?: readonly string[];
  dataValueFx: (columnData: T, rowIndex: number) => number;
  labelValueFx: (label: L, rowIndex: number) => string;
  /** [0-1] */
  outerRadiusPercentage?: number;
  /** [0-1] */
  innerRadiusPercentage?: number;
}
