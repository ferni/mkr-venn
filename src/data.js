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
      id: '1',
      name: 'One'
    },
    {
      id: '2',
      name: 'Two',
      parent: '1'
    },
    {
      id: '3',
      name: 'Three',
      parent: '1'
    },
    {
      id: '35',
      name: 'asdf',
      parent: '1'
    },
    {
      id: '4',
      name: 'Four',
      parent: '3'
    },
    {
      id: '5',
      name: 'Five'
    }
  ],
  members: [
    {
      name: 'A',
      groupIds: ['1'],
      lead: '1'
    },
    {
      name: 'B',
      groupIds: ['2'],
      lead: '2'
    },
    {
      name: 'C',
      groupIds: ['2', '3', '35']
    },
    {
      name: 'D',
      groupIds: ['2', '3']
    },
    {
      name: 'E',
      groupIds: ['3'],
      lead: '3'
    },
    {
      name: 'F',
      groupIds: ['4']
    },
    {
      name: 'G',
      groupIds: ['4']
    }
  ]
};

export default data;
