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

const data = {
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
    },
    {
      name: '5'
    }
  ]
};


export default data;