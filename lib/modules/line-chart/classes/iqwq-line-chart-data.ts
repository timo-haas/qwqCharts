export interface IQwqLineChartData<L, T> {
  readonly labels: readonly L[];
  readonly data: ReadonlyArray<ReadonlyArray<T>>;
}
