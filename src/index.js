module.exports = function solveSudoku(matrix) {
  var horizontLine = [],
  verticalLine = [],
  propArray = [],
  transitory; 

  for (var x = 0; x < 9; x++) {
    for (var y = 0; y < 9; y++) {
      if (matrix[x][y] === 0) {
        horizontLine.push(x);
        verticalLine.push(y);
        matrix[x][y] = propos(find(matrix, x, y), transitory);
        if (!matrix[x][y]) {
          recElements(matrix, x, y);

          function recElements(matrix, x, y) {
            transitory = matrix[horizontLine[horizontLine.length - 2]][verticalLine[verticalLine.length - 2]];
            matrix[x][y] = 0;
            matrix[horizontLine[horizontLine.length - 2]][verticalLine[verticalLine.length - 2]] = 0; 
            x = horizontLine[horizontLine.length - 2]; 
            y = verticalLine[verticalLine.length - 2];
            horizontLine.splice(horizontLine.length - 1);
            verticalLine.splice(verticalLine.length - 1);
            if (propos(find(matrix, x, y), transitory)) {
              matrix[x][y] = propos(find(matrix, x, y), transitory);
              transitory = 0;
            } else {
              matrix[x][y] = 0;
              recElements(matrix, horizontLine[horizontLine.length - 2], verticalLine[verticalLine.length - 2]); 
            }
          }
          x = horizontLine[horizontLine.length - 1];
          y = verticalLine[verticalLine.length - 1];
        }
      }
    }
  }

  function propos(array, transitory) {
    if (transitory) {
      return array[array.indexOf(transitory) + 1];
    } else return array[0];
  }


  function find(matrix, x, y) {
    var row = matrix[x],
    column = getCol(matrix, y),
    grid = getGrid(matrix, x, y),
    imposNumb = [].concat(row, column, grid).filter(num => num > 0);
  
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    propArray = numbers.filter(num => !imposNumb.includes(num)).filter((a, b) => a - b);
    return propArray;
  }

  function getCol(matrix, y) {
    return matrix.map((row) => row[y]);
  };

  function getGrid(matrix, x, y) {
    const arrayGrid = [];
    x = Math.floor(x / 3) * 3;
    y = Math.floor(y / 3) * 3;
    for (i = x; i < x + 3; i++) {
      for (j = y; j < y + 3; j++) {
        arrayGrid.push(matrix[i][j]);
      }
    }
    return arrayGrid;
  }
  return matrix;
}
