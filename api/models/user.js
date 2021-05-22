import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../utils/constants';

export default (sequelize, DataTypes, Model) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.company);
      this.belongsToMany(models.meeting, {
        through: 'userMeeting',
        as: 'meetings',
        foreignKey: 'userId',
        otherKey: 'meetingId'
      });
    }
  }
  User.init({
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email must be valid.'
        },
      },
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: 'First name must contain only letters.'
        },
        len: {
          args: [NAME_MIN_LENGTH, NAME_MAX_LENGTH],
          msg: `First name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters long.`
        },
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: 'Last name must contain only letters.'
        },
        len: {
          args: [NAME_MIN_LENGTH, NAME_MAX_LENGTH],
          msg: `Last name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters long.`
        },
      },
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};
