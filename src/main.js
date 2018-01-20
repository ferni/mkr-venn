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
    // Clusters are circles joined by an intersection
    clusters: [],
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

function collide(circleA, circleB) {
  const distance = Math.sqrt(Math.pow(circleA.x - circleB.x, 2) + Math.pow(circleA.y - circleB.y, 2));
  return distance < circleA.radius + circleB.radius;
}


function clusterUp(circles) {
  if (circles.length < 2 || circles.length > 3) {
    throw 'Do not support ' + circles.length + ' groups intersecting.';
  }
  // average the size
  const avgSize = circles.reduce( ( acc, c ) => acc + c.radius, 0 ) / circles.length;
  circles.forEach(c => c.radius = avgSize);

  // three circles cluster
  if (circles.length === 3) {
    const distance = avgSize;
    // first two circles go on top
    const avgY = (circles[0].y + circles[1].y) / 2;
    circles[0].y = avgY;
    circles[1].y = avgY;
    const avgX = (circles[0].x + circles[1].x) / 2;
    circles[0].x = avgX - (distance / 2);
    circles[1].x = avgX + (distance / 2);

    // third circle below
    const yDifference = Math.sqrt(Math.pow(distance, 2) + Math.pow(distance / 2, 2));
    circles[2].y = circles[0].y + yDifference;
    circles[2].x = avgX;
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
clusterUp(topCircles[0].children);

// draw model
topCircles.forEach(function (circle) {
  circle.draw.call(circle);
});

