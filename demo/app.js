let chartType = "line";

for (let chartIndex = 0; chartIndex < 16; chartIndex++) {
  createChart(chartIndex);
}

async function createChart(chartIndex) {
  switch (chartType) {
    case "line": {
      return Promise.all([
        getLineChartData(chartIndex),
        import("../dist/line.bundle.js"),
      ]).then(([chartData, lineChartModule]) => {
        const svgElement = lineChartModule.createChart(chartData, {
          showPoints: true,
          lineType: "straight",
          stackedType: "none",
          dataValueFx: (columnValues, rowIndex) => columnValues[rowIndex],
          labelValueFx: (label) => label,
        });
        insertSvgElement(svgElement);
      });
    }
    case "pie": {
      return Promise.all([
        getPieChartData(chartIndex),
        import("../dist/pie.bundle.js"),
      ]).then(([chartData, pieChartModule]) => {
        const svgElement = pieChartModule.createChart(chartData, {
          pieType: "normal",
          dataValueFx: (dataItem) => dataItem,
          labelValueFx: (label) => label,
        });
        insertSvgElement(svgElement);
      });
    }
    case "bar":
    default: {
      return Promise.all([
        getBarChartData(chartIndex),
        import("../dist/bar.bundle.js"),
      ]).then(([chartData, barChartModule]) => {
        const svgElement = barChartModule.createChart(chartData, {
          direction: "vertical",
          stackedType: "stacked",
          dataValueFx: (columnValues, rowIndex) => columnValues[rowIndex],
          labelValueFx: (label) => "" + label,
        });
        insertSvgElement(svgElement);
      });
    }
  }
}

async function getBarChartData(compIdx) {
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
  const yOffset = aYNeg && bYNeg ? 0 : aYNeg || bYNeg ? 0.5 * rangeArrayLen : 0;

  const columns = [[], [], []];
  const labels = [];
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

async function getLineChartData(compIdx) {
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
  const yOffset = aYNeg && bYNeg ? 0 : aYNeg || bYNeg ? 0.5 * rangeArrayLen : 0;

  const columns = [[], [], [], []];
  const labels = [];
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

async function getPieChartData(compIdx) {
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
  const yOffset = aYNeg && bYNeg ? 0 : aYNeg || bYNeg ? 0.5 * rangeArrayLen : 0;

  const columns = [];
  const labels = [];
  rangeArray.forEach((y, i) => {
    labels.push("" + (i + xOffset));
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

function insertSvgElement(svgElement) {
  const parent = document.getElementById("grid");
  if (!parent) {
    return;
  }
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
  parent.appendChild(svgElement);
}
