export default (sequelize, DataTypes, Model) => {
  class Role extends Model {
    static associate(models) {
      this.belongsToMany(models.user, {
        through: 'userRole',
        as: 'users',
        foreignKey: 'roleId',
        otherKey: 'userId'
      })
    }
  }
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'role',
  });
  return Role;
};

export const MEMBER = 'member';
export const ADMIN = 'admin';
export const COMPANY_ADMIN = 'companyAdmin';

export const ROLES = [MEMBER, ADMIN, COMPANY_ADMIN];
