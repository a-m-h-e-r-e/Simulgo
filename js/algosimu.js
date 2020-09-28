// const COL = 40,
//   ROW = 15;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function gen(prop) {
  let wei = [];
  for (let x = 0; x < ROW; x++) {
    let temp = [];
    for (let y = 0; y < COL; y++) {
      temp.push(prop === "falses" ? false : 0);
    }
    wei.push(temp);
  }
  return wei;
}

function genZero(prop) {
  let wei = [];
  for (let x = 0; x < ROW; x++) {
    let temp = [];
    for (let y = 0; y < COL; y++) {
      temp.push(0);
    }
    wei.push(temp);
  }
  return wei;
}

let fo = false;

async function dfs(r, c, stat, vis, points, status, depth) {
  if (status.found) return;
  if (vis[r][c] === true) return;
  vis[r][c] = true;
  if (stat[r][c].vis === "wall") return;
  if (stat[r][c].vis === "end") {
    status.found = true;
    stat[r][c].dis = depth;
    return;
  }
  if (
    stat[r][c].vis !== undefined &&
    stat[r][c].vis !== "start" &&
    stat[r][c].vis !== "end"
  ) {
    let cell = document.getElementById(`${r}-${c}`);
    if (document.getElementById("distance").value === "true")
      cell.innerHTML = depth;
    stat[r][c].dis = depth;
    cell.classList.add("current");
    await sleep(document.getElementById("speed").value);
    cell.classList.remove("current");
    cell.classList.add("visited");
  }
  if (r - 1 > -1) await dfs(r - 1, c, stat, vis, points, status, depth + 1);
  if (c + 1 < COL) await dfs(r, c + 1, stat, vis, points, status, depth + 1);
  if (r + 1 < ROW) await dfs(r + 1, c, stat, vis, points, status, depth + 1);
  if (c - 1 > -1) await dfs(r, c - 1, stat, vis, points, status, depth + 1);
}

async function pathf(r, c, stat, status, points) {
  if (status.found) return;
  if (stat[r][c].vis === "start" || stat[r][c].vis === "wall") return;
  if (r === points.start[0] && c === points.start[1]) {
    status.found = true;
    return;
  }
  let y = r;
  let x = c;
  if (c + 1 < COL && stat[r][c + 1].dis + 1 === stat[r][c].dis) x = c + 1;
  if (c - 1 > -1 && stat[r][c - 1].dis + 1 === stat[r][c].dis) x = c - 1;
  if (r - 1 > -1 && stat[r - 1][c].dis + 1 === stat[r][c].dis) y = r - 1;
  if (r + 1 < ROW && stat[r + 1][c].dis + 1 === stat[r][c].dis) y = r + 1;
  await sleep(document.getElementById("speed").value);
  if (stat[y][x].vis !== "start" && stat[y][x].vis !== "wall") {
    let cell = document.getElementById(`${r}-${c}`);
    cell.classList.remove("visited");
    cell.classList.add("shortest-path");
  }
  await pathf(y, x, stat, status, points);
}

async function simulate(stat, points) {
  let vis = gen("falses");
  let depth = 1;
  let status = { found: false };
  await dfs(points.start[0], points.start[1], stat, vis, points, status, depth);
  status = { found: false };
  await pathf(points.end[0], points.end[1], stat, status, points);
  return;
}
