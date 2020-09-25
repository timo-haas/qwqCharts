export interface IQwqBarChartData<L, T> {
  readonly labels: readonly L[];
  readonly data: ReadonlyArray<ReadonlyArray<T>>;
}
