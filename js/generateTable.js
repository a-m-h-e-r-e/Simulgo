const COL = 45,
  ROW = 15;
let START = false,
  TARGET = false;
let table = [];
let mouseDown = false;
let distance = false;

const getTable = () => {
  let temp = [];
  var table = document.getElementById("board");
  for (var i = 0, row; (row = table.rows[i]); i++) {
    let cols = [];
    for (var j = 0, col; (col = row.cells[j]); j++) {
      cols.push({ vis: col.classList[0], dis: 0 });
    }
    temp.push(cols);
  }
  return temp;
};

function tableCreate() {
  var body = document.body,
    tbl = document.createElement("table");
  tbl.id = "board";
  for (var i = 0; i < ROW; i++) {
    var tr = tbl.insertRow();
    for (var j = 0; j < COL; j++) {
      var td = tr.insertCell();
      td.id = i + "-" + j;

      td.appendChild(document.createTextNode(""));
      // td.style.fontSize = "8px";
      td.classList.add("unvisited");

      td.onclick = function () {
        let selectedType = document.querySelector(
          'input[name="cellType"]:checked'
        ).value;
        let cell = document.getElementById(event.srcElement.id).classList;
        if (selectedType === "WALL") {
          if (cell[0] === "wall") {
            cell.remove("wall");
            cell.add("unvisited");
          } else {
            cell.remove("unvisited");
            cell.add("wall");
          }
        } else if (selectedType === "WALL") {
          cell.remove("unvisited");
          cell.add("wall");
        } else if (!TARGET && selectedType === "TARGET") {
          TARGET = true;
          cell.remove("unvisited");
          cell.add("end");
        } else if (!START && selectedType === "START") {
          START = true;
          cell.remove("unvisited");
          cell.add("start");
        }
      };
      td.onmouseover = function () {
        let selectedType = document.querySelector(
          'input[name="cellType"]:checked'
        ).value;
        let cell = document.getElementById(event.srcElement.id).classList;

        if (mouseDown && selectedType === "WALL") {
          if (cell[0] === "wall") {
            cell.remove("wall");
            cell.add("unvisited");
          } else {
            cell.add("wall");
            cell.remove("unvisited");
          }
        }
      };

      td.onmousedown = function () {
        mouseDown = true;
      };
      td.onmouseup = function () {
        mouseDown = false;
      };
      td.onmouse;
    }
  }
  body.appendChild(tbl);
}

function getStartTarget(table) {
  let points = { start: [], end: [] };
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (table[i][j].vis === "start") {
        points.start[0] = i;
        points.start[1] = j;
      } else if (table[i][j].vis === "end") {
        points.end[0] = i;
        points.end[1] = j;
      }
    }
  }
  return points;
}

function start() {
  let table = getTable();
  let points = getStartTarget(table);
  simulate(table, points);
}

tableCreate();
