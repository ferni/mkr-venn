/*
Things to validate:

- Does not support a member belonging to more than 4 groups
- member and lead consistency
   · if it is in lead, it must be also in member (maybe just add it if missing)
- Groups that a person is a member of, must have the same parent

 */

function validateData(data) {

  function getGroup(id) {
    return data.groups.find((g) => g.id === id);
  }

  data.members.forEach((m) => {
    if (m.groupIds.length > 4) {
      throw 'Invalid data: A member cannot belong to more than four groups.';
    }
    const firstGroup = getGroup(m.groupIds[0]);
    m.groupIds.forEach((groupId) => {
      let group = getGroup(groupId);
      if (group === undefined) {
        throw `Invalid data: Group ID '${groupId}' (in member '${m.name}') not found in groups array.`;
      }
      
      if (group.parent !== firstGroup.parent) {
        throw `Invalid data: Member ${m.name} belongs to groups with different parents ('${firstGroup.id}' and '${group.id}'); ` +
          `'${firstGroup.id}' has '${firstGroup.parent}' as parent, and '${group.id}' has ` +
          `'${group.parent}' as parent.`;
      }
    });
  });
}

export default validateData;