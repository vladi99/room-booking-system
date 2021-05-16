export default (sequelize, DataTypes, Model) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        len: [2, 256],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        len: [2, 256],
      },
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};
