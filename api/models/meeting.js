import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../utils/constants';

export default (sequelize, DataTypes, Model) => {
  class Meeting extends Model {
    static associate(models) {
      this.belongsToMany(models.user, {
        through: 'userMeetings',
        as: 'users',
        foreignKey: 'meetingId',
        otherKey: 'userId'
      })
    }
  }
  Meeting.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [NAME_MIN_LENGTH, NAME_MAX_LENGTH],
          msg: `Meeting name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters long.`
        },
      },
    },
    start: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'Start date must be a valid date.'
        },
        isAfter: {
          msg: 'Start date cannot be in the past.'
        },
        isBeforeEnd(value) {
          if (value > this.end) {
            throw new Error('Start date cannot be after end date');
          }
        },
      },
    },
    end: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'End date must be a valid date.'
        },
        isAfterStart(value) {
          if (value < this.start) {
            throw new Error('End date cannot be before start date');
          }
        },
      },
    },
  }, {
    sequelize,
    modelName: 'meeting',
  });
  return Meeting;
};
