export default (sequelize, DataTypes, Model) => {
  class CompanyRoom extends Model {
    static associate(models) {
    }
  }
  CompanyRoom.init({
    roomId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
    owner: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'companyRoom',
  });
  return CompanyRoom;
};
