import { AfterViewInit, Component } from '@angular/core';
import { createLineChart } from 'qwq-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  private chartType = 'line';

  ngAfterViewInit(): void {
    this.clearGrid();
    const rangeArray = Array.from(Array(16).keys());

    rangeArray.reduce(async (memo, chartIndex) => {
      await memo;
      const svgElement = await this.createChart(chartIndex, this.chartType);
      this.insertSvgElement(svgElement);
      return undefined;
    }, Promise.resolve(undefined));
  }

  private async createChart(
    chartIndex: number,
    chartType: string
  ): Promise<SVGSVGElement> {
    switch (chartType) {
      case 'line': {
        return Promise.all([this.getLineChartData(chartIndex)]).then(
          ([chartData]) => {
            const svgElement = createLineChart(chartData, {
              showPoints: true,
              lineType: 'straight',
              stackedType: 'none',
              dataValueFx: (columnValues, rowIndex) => columnValues[rowIndex],
              labelValueFx: (label) => label,
            });
            return svgElement;
          }
        );
      }
      // case 'pie': {
      //   return Promise.all([
      //     this.getPieChartData(chartIndex),
      //     import('dist/qwq-charts/lib/pie-chart'),
      //   ]).then(([chartData, pieChartModule]) => {
      //     const svgElement = pieChartModule.createPieChart(chartData, {
      //       pieType: 'normal',
      //       dataValueFx: (dataItem) => dataItem,
      //       labelValueFx: (label) => label,
      //     });
      //     return svgElement;
      //   });
      // }
      // case 'bar':
      // default: {
      //   return Promise.all([
      //     this.getBarChartData(chartIndex),
      //     import('dist/qwq-charts/lib/bar-chart'),
      //   ]).then(([chartData, barChartModule]) => {
      //     const svgElement = barChartModule.createBarChart(chartData, {
      //       direction: 'vertical',
      //       stackedType: 'stacked',
      //       dataValueFx: (columnValues, rowIndex) => columnValues[rowIndex],
      //       labelValueFx: (label) => '' + label,
      //     });
      //     return svgElement;
      //   });
      // }
    }
  }

  private async getBarChartData(
    compIdx: number
  ): Promise<{ labels: number[]; data: number[][] }> {
    const rangeArray = Array.from(Array(6).keys());

    const aFlags = compIdx & 3;
    const bFlags = (compIdx >> 2) & 3;

    const aXNeg = (aFlags & 1) > 0;
    const aYNeg = (aFlags & 2) > 0;
    const bXNeg = (bFlags & 1) > 0;
    const bYNeg = (bFlags & 2) > 0;
    const rangeArrayLen = rangeArray.length;
    const xOffset = (~~aXNeg + ~~bXNeg) * Math.floor(-0.5 * rangeArrayLen);
    const yMultiplicator = aYNeg || bYNeg ? -1 : 1;
    const yOffset =
      aYNeg && bYNeg ? 0 : aYNeg || bYNeg ? 0.5 * rangeArrayLen : 0;

    const columns: number[][] = [[], [], []];
    const labels: number[] = [];
    rangeArray.forEach((y, i) => {
      labels.push(i + xOffset);
      columns[0].push(yMultiplicator * (y + 0) + yOffset);
      columns[1].push(yMultiplicator * (y + 1) + yOffset);
      columns[2].push(yMultiplicator * (y + 2) + yOffset);
      // columns[3].push(
      //   (yMultiplicator * (y + 3) + yOffset) * (i % 2 === 1 ? 0.75 : 1.25)
      // );
    });
    console.log(compIdx, columns);
    return { labels, data: columns };
  }

  private async getLineChartData(
    compIdx: number
  ): Promise<{ labels: number[]; data: number[][] }> {
    const rangeArray = Array.from(Array(6).keys());

    const aFlags = compIdx & 3;
    const bFlags = (compIdx >> 2) & 3;

    const aXNeg = (aFlags & 1) > 0;
    const aYNeg = (aFlags & 2) > 0;
    const bXNeg = (bFlags & 1) > 0;
    const bYNeg = (bFlags & 2) > 0;
    const rangeArrayLen = rangeArray.length;
    const xOffset = (~~aXNeg + ~~bXNeg) * Math.floor(-0.5 * rangeArrayLen);
    const yMultiplicator = aYNeg || bYNeg ? -1 : 1;
    const yOffset =
      aYNeg && bYNeg ? 0 : aYNeg || bYNeg ? 0.5 * rangeArrayLen : 0;

    const columns: number[][] = [[], [], [], []];
    const labels: number[] = [];
    rangeArray.forEach((y, i) => {
      labels.push(i + xOffset);
      columns[0].push(yMultiplicator * (y + 0) + yOffset);
      columns[1].push(yMultiplicator * (y + 1) + yOffset);
      columns[2].push(yMultiplicator * (y + 2) + yOffset);
      columns[3].push(
        (yMultiplicator * (y + 3) + yOffset) * (i % 2 === 1 ? 0.75 : 1.25)
      );
    });
    return { labels, data: columns };
  }

  private async getPieChartData(
    compIdx: number
  ): Promise<{ labels: string[]; data: number[] }> {
    const rangeArray = Array.from(Array(6).keys());

    const aFlags = compIdx & 3;
    const bFlags = (compIdx >> 2) & 3;

    const aXNeg = (aFlags & 1) > 0;
    const aYNeg = (aFlags & 2) > 0;
    const bXNeg = (bFlags & 1) > 0;
    const bYNeg = (bFlags & 2) > 0;
    const rangeArrayLen = rangeArray.length;
    const xOffset = (~~aXNeg + ~~bXNeg) * Math.floor(-0.5 * rangeArrayLen);
    const yMultiplicator = aYNeg || bYNeg ? -1 : 1;
    const yOffset =
      aYNeg && bYNeg ? 0 : aYNeg || bYNeg ? 0.5 * rangeArrayLen : 0;

    const columns: number[] = [];
    const labels: string[] = [];
    rangeArray.forEach((y, i) => {
      labels.push('' + (i + xOffset));
      if (compIdx % 4 === 0) {
        columns.push(yMultiplicator * (y + 0) + yOffset);
      }
      if (compIdx % 4 === 1) {
        columns.push(yMultiplicator * (y + 1) + yOffset);
      }
      if (compIdx % 4 === 2) {
        columns.push(yMultiplicator * (y + 2) + yOffset);
      }
      if (compIdx % 4 === 3) {
        columns.push(
          (yMultiplicator * (y + 3) + yOffset) * (i % 2 === 1 ? 0.75 : 1.25)
        );
      }
    });
    return { labels, data: columns };
  }
  private insertSvgElement(svgElement: SVGSVGElement): void {
    const parent = document.getElementById('grid');
    if (!parent) {
      return;
    }
    parent.appendChild(svgElement);
  }
  private clearGrid(): void {
    const parent = document.getElementById('grid');
    if (!parent) {
      return;
    }
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  }
}
