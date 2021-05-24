export default (sequelize, DataTypes, Model) => {
  class UserRole extends Model {
    static associate(models) {
    }
  }
  UserRole.init({
    roleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userRole',
  });
  return UserRole;
};
