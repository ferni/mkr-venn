import data from './data';
import validateData from './validate-data';

validateData(data);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// todo: replace with env variable
const debug = false;

// drawable model of a group
function circle(group, x, y, radius) {
  return {
    id: group.id,
    name: group.name,
    color: group.color || 'black',
    x,
    y,
    radius,
    children: [],
    parent: null,
    // Clusters are circles joined by an intersection
    clusters: [],
    draw: function() {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.5;
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1.0;
      this.children.forEach(function (circle) {
        circle.draw.call(circle);
      });
    },
    createChildren: function(allCircles) {
      let childGroups = data.groups.filter((g) => g.parent === this.id);
      if (childGroups.length === 0) {
        return;
      }
      let radiuses = (this.radius * 2 / childGroups.length / 2) - 5; // 5 margin

      this.children = childGroups.map((group, index) => {
        let c = circle(group, (radiuses * 2 + 5) * index + radiuses + 5 + (this.x - radius),
          this.y, radiuses);
        c.parent = this;
        allCircles.push(c);
        c.createChildren(allCircles);
        return c;
      });
    },
    isPointInside: function(point) {
      const distance = Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
      return distance < this.radius;
    }
  }
}

function collide(circleA, circleB) {
  const distance = Math.sqrt(Math.pow(circleA.x - circleB.x, 2) + Math.pow(circleA.y - circleB.y, 2));
  return distance < circleA.radius + circleB.radius;
}



// Changes the positions and sizes of circles to generate intersections
function clusterUp(circles) {
  if (circles.length < 2 || circles.length > 3) {
    throw 'Do not support ' + circles.length + ' groups intersecting.';
  }
  // average the size
  const avgSize = circles.reduce( ( acc, c ) => acc + c.radius, 0 ) / circles.length;
  circles.forEach(c => c.radius = avgSize);

  const distance = avgSize;
  // first two circles go on top
  const avgY = (circles[0].y + circles[1].y) / 2;
  circles[0].y = avgY;
  circles[1].y = avgY;
  const avgX = (circles[0].x + circles[1].x) / 2;
  circles[0].x = avgX - (distance / 2);
  circles[1].x = avgX + (distance / 2);

  if (circles.length === 3) {
    // third circle below
    const yDifference = Math.sqrt(Math.pow(distance, 2) + Math.pow(distance / 2, 2));
    circles[2].y = circles[0].y + yDifference;
    circles[2].x = avgX;
  }

  // Add cluster info to each circle
  circles.forEach(c => c.clusters.push(circles));
}

const topGroups = data.groups.filter((g) => g.parent === undefined || g.parent === null);
console.dir(topGroups);

// have them next to each other occupying all the canvas space
let radiuses = (canvas.width / topGroups.length / 2) - 5; // 5 margin
if (radiuses * 2 + 10 > canvas.height) {
  radiuses = canvas.height / 2 - 10;
}

let topCircles = topGroups.map((group, index) =>
  circle(group, (radiuses * 2 + 5) * index + radiuses + 5, radiuses + 5, radiuses)
);

let allCircles = topCircles;
topCircles.forEach(circle => circle.createChildren(allCircles));

console.dir(allCircles);

function getCircle(id) {
  return allCircles.find(c => c.id === id);
}

// form circle intersections
data.members.forEach(m => {
  if (m.groupIds.length > 1) {
    clusterUp(m.groupIds.map(getCircle));
  }
});

// todo: fit circles into parents

// place member labels in circles
ctx.font = "18px Arial";
data.members.forEach(m => {
  const circles = m.groupIds.map(getCircle);
  // find suitable position
  const advanceX = 5;
  const advanceY = 5;
  // first position is in the top center of the circle
  let pos = {x: circles[0].x, y: circles[0].y - (circles[0].radius - advanceY)};
  while (!circles.every(c => c.isPointInside(pos))) {
    pos.x += advanceX;
    if (!circles[0].isPointInside(pos)) {
      pos.y += advanceY;
      if (pos.y - circles[0].y > circles[0].radius) {
        break;
      }
      pos.x = circles[0].x - (Math.cos((pos.y - circles[0].y) / circles[0].radius) * circles[0].radius)+ advanceX;
    }
    if (debug) {
      ctx.beginPath();
      ctx.strokeStyle = circles[0].color;
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x + 5, pos.y);
      ctx.stroke();
    }
  }

  if (circles.every(c => c.isPointInside(pos))) {
    ctx.fillText(m.name, pos.x, pos.y + 18);
  } else {
    console.warn('Could not find intersection between ' + circles.length +
      ' circles to place label of member ' + m.name);
  }
});

// draw model
topCircles.forEach(function (circle) {
  circle.draw.call(circle);
});

