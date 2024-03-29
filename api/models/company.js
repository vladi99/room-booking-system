import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../utils/constants';

export default (sequelize, DataTypes, Model) => {
  class Company extends Model {
    static associate(models) {
      this.belongsToMany(models.room, {
        through: 'companyRooms',
        as: 'rooms',
        foreignKey: 'companyId',
        otherKey: 'roomId'
      })
    }
  }
  Company.init({
    name: {
      allowNull: false,
      unique: {
        args: true,
        message: 'Name must be unique.',
        fields: [sequelize.fn('lower', sequelize.col('name'))]
      },
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [NAME_MIN_LENGTH, NAME_MAX_LENGTH],
          msg: `Company name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters long.`
        },
      },
    }
  }, {
    sequelize,
    modelName: 'company',
  });
  return Company;
};
