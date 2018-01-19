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
      id: 1,
      name: 'One'
    },
    {
      id: 2,
      name: 'Two',
      parent: 1
    },
    {
      id: 3,
      name: 'Three',
      parent: 1
    },
    {
      id: 35,
      name: 'asdf',
      parent: 1
    },
    {
      id: 4,
      name: 'Four',
      parent: 3
    },
    {
      id: 5,
      name: 'Five'
    }
  ],
  members: [
    {
      name: 'A',
      member: [1],
      lead: 1
    },
    {
      name: 'B',
      member: [2],
      lead: 2
    },
    {
      name: 'C',
      member: [2]
    },
    {
      name: 'D',
      member: [2, 3]
    },
    {
      name: 'E',
      member: [3],
      lead: 3
    },
    {
      name: 'F',
      member: [4]
    },
    {
      name: 'G',
      member: [4]
    }
  ]
};

export default data;
