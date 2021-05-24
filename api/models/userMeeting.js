export default (sequelize, DataTypes, Model) => {
  class UserMeeting extends Model {
    static associate(models) {
    }
  }
  UserMeeting.init({
    userId: DataTypes.INTEGER,
    meetingId: DataTypes.INTEGER,
    organizer: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'userMeeting',
  });
  return UserMeeting;
};
