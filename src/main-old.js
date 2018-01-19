import testModule from './test-file'

import * as d3 from "d3";
import { VennDiagram } from 'venn.js';

/*
Example data

Group: 1
Group: 2, Parent: 1
Group: 3, Parent: 1
Group: 4, Parent 3

A: 1-Lead
B: 2-Lead
C: 2
D: 2,3
E: 3-Lead
F: 4
G: 4

 */

var data = {
  groups: [
    {
      name: '1'
    },
    {
      name: '2',
      parent: '1'
    },
    {
      name: '3',
      parent: '1'
    },
    {
      name: '4',
      parent: '3'
    }
  ]
};

function validateGroups() {
  var names = data.groups.map((g) => g.name);

}

var sets = [
  {sets: ['A'], size: 12},
  {sets: ['B'], size: 40},
  {sets: ['A', 'B'], size: 6},
  {sets: ['P'], size: 100},
  {sets: ['A', 'B', 'P'], size: 58}
];

var itemDimensions =  {
  width: 20,
  height: 15
};

var chart = VennDiagram();
d3.select("#venn").datum(sets).call(chart);


// objects inside flexible rectangle

// The rectangle should have a ratio that is the closest to a square as possible

function getContainerRect(childDimensions, childCount) {

}
