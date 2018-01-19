import data from './data';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function getTopCircles() {
  return data.groups.filter((g) => g.parent === undefined || g.parent === null);
}


// draw diagram

const top = getTopCircles();
console.dir(top);
// draw them next to each other occupying all the canvas space
let radiuses = (canvas.width / top.length / 2) - 5; // 5 margin
if (radiuses * 2 + 10 > canvas.height) {
  radiuses = canvas.height / 2 - 10;
}
top.forEach((group, index) => {
  drawCircle((radiuses * 2 + 5) * index + radiuses + 5, radiuses + 5, radiuses);
});