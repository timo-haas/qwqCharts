import { scaleLinear } from 'd3';
import { qwqGetMinMax } from '../../shared';
import {
  IQwqLineChartData,
  IQwqLineChartOptionsStrict,
  IQwqLineChartScaleArea,
  QwqLineChartStackType,
} from '../classes';

export function qwqCreateScales<L, T>(
  chartData: IQwqLineChartData<L, T>,
  chartOptions: IQwqLineChartOptionsStrict<L, T>,
  viewBoxWidth: number,
  viewBoxHeight: number
): IQwqLineChartScaleArea {
  const { minY, maxY } = getMinMaxY(chartData, chartOptions);
  const { minX, maxX } = getMinMaxX(chartData, chartOptions);
  const isRightAligned = minX <= maxX && maxX <= 0;
  const isTopAligned = minY <= maxY && maxY <= 0;
  const margin = {
    top: isTopAligned ? 40 : 20,
    right: isRightAligned ? 40 : 20,
    bottom: isTopAligned ? 20 : 40,
    left: isRightAligned ? 20 : 40,
  };

  const xScaleRange = [margin.left, viewBoxWidth - margin.right] as [
    number,
    number
  ];
  const yScaleRange = [viewBoxHeight - margin.bottom, margin.top] as [
    number,
    number
  ];
  const yScale = scaleLinear()
    .domain([Math.min(0, minY), Math.max(0, maxY)])
    .range(yScaleRange);

  const xScale = scaleLinear().domain([minX, maxX]).range(xScaleRange);

  const scaleArea: IQwqLineChartScaleArea = {
    xScale,
    yScale,
    alignment: {
      vertical: isTopAligned ? 'top' : 'bottom',
      horizontal: isRightAligned ? 'right' : 'left',
    },
    viewBox: { width: viewBoxWidth, height: viewBoxHeight },
    margin,
  };
  return scaleArea;
}

function getMinMaxX<L, T>(
  chartData: IQwqLineChartData<L, T>,
  chartOptions: IQwqLineChartOptionsStrict<L, T>
): {
  readonly minX: number;
  readonly maxX: number;
} {
  const allXValues = chartData.labels.map((label, rowIndex) => {
    return chartOptions.labelValueFx(label, rowIndex);
  });
  const { min, max } = qwqGetMinMax(allXValues);
  return { minX: min, maxX: max };
}

function getMinMaxY<L, T>(
  chartData: IQwqLineChartData<L, T>,
  chartOptions: IQwqLineChartOptionsStrict<L, T>
): {
  readonly minY: number;
  readonly maxY: number;
} {
  const stackedType = chartOptions.stackedType;
  switch (stackedType) {
    case QwqLineChartStackType.none: {
      const chartNumData = chartData.data.map((columnValues) => {
        return columnValues.map((_data, rowIndex) => {
          return chartOptions.dataValueFx(columnValues, rowIndex);
        });
      });
      const { min, max } = qwqGetMinMax(chartNumData);
      return { minY: min, maxY: max };
    }
    case QwqLineChartStackType.stacked: {
      const chartNumDataSummed = chartData.data.map((columnValues) => {
        return columnValues
          .map((_data, rowIndex) => {
            return chartOptions.dataValueFx(columnValues, rowIndex);
          })
          .reduce((memo, next) => memo + (next || 0), 0);
      });
      const { min, max } = qwqGetMinMax([chartNumDataSummed]);
      return { minY: min, maxY: max };
    }
    case QwqLineChartStackType.percentage: {
      return { minY: 0, maxY: 100 };
    }
    default:
      const compileProtect: never = stackedType;
      return compileProtect ? { minY: 0, maxY: 1 } : { minY: 0, maxY: 1 };
  }
}
