import data from './data';
import validateData from './validate-data';

validateData(data);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// drawable model of a group
function circle(id, name, x, y, radius) {
  return {
    id,
    name,
    x,
    y,
    radius,
    children: [],
    parent: null,
    draw: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
      this.children.forEach(function (circle) {
        circle.draw.call(circle);
      });
    },
    createChildren: function() {
      let childGroups = data.groups.filter((g) => g.parent === this.id);
      if (childGroups.length === 0) {
        return;
      }
      let radiuses = (this.radius * 2 / childGroups.length / 2) - 5; // 5 margin

      this.children = childGroups.map((group, index) => {
        let c = circle(group.id, group.name, (radiuses * 2 + 5) * index + radiuses + 5 + (this.x - radius),
          this.y, radiuses);
        c.parent = this;
        c.createChildren();
        return c;
      });
    }
  }
}

const topGroups = data.groups.filter((g) => g.parent === undefined || g.parent === null);
console.dir(topGroups);

// have them next to each other occupying all the canvas space
let radiuses = (canvas.width / topGroups.length / 2) - 5; // 5 margin
if (radiuses * 2 + 10 > canvas.height) {
  radiuses = canvas.height / 2 - 10;
}

let topCircles = topGroups.map((group, index) =>
  circle(group.id, group.name, (radiuses * 2 + 5) * index + radiuses + 5, radiuses + 5, radiuses)
);

topCircles.forEach(circle => circle.createChildren());

console.dir(topCircles);
topCircles.forEach(function (circle) {
  circle.draw.call(circle);
});