function upperHull(sortedPoints) {
  if (sortedPoints.length < 2) return sortedPoints;

  let result = [sortedPoints[0], sortedPoints[1]];

  for (let i = 2; i < sortedPoints.length; ++i) {
    const p_i = sortedPoints[i];
    result.push(p_i);

    let first = result[result.length - 3];
    let middle = result[result.length - 2];
    let last = result[result.length - 1];
    let rightTurn = isRightTurn(first, middle, last);

    while (rightTurn && result.length > 2) {
      result.splice(result.length - 2, 1);

      if (result.length > 2) {
        first = result[result.length - 3];
        middle = result[result.length - 2];
        last = result[result.length - 1];
        rightTurn = isRightTurn(first, middle, p_i);
      }
    }
  }

  return result;
}

function convexHull(points) {
  const sorted = sortByX(points);
  const upper = upperHull(sorted);
  const lower = upperHull(sorted.reverse());

  return [...upper, ...lower];
}

function isRightTurn([x1, y1], [x2, y2], [x3, y3]) {
  const crossProd = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
  return crossProd <= 0;
}

function sortByX(points) {
  return points.slice().sort(([x1, y1], [x2, y2]) => (x1 < x2 ? -1 : 1));
}
