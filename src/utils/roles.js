import { BOSS_ROLES_LEVEL } from 'src/config-global';

function getRoleLevel(role) {
  return BOSS_ROLES_LEVEL.find((item) => item.name === role)?.level;
}

export function compareRoleLevel(role1, role2) {
  const level1 = getRoleLevel(role1);
  const level2 = getRoleLevel(role2);
  if (!level1 || !level2) {
    return false;
  }
  return level1 >= level2;
}
