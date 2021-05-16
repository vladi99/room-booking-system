export default (sequelize, DataTypes, Model) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};
