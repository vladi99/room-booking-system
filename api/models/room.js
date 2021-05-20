import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../utils/constants';

export default (sequelize, DataTypes, Model) => {
  class Room extends Model {
    static associate(models) {
      this.belongsToMany(models.company, {
        through: 'companyRooms',
        as: 'companies',
        foreignKey: 'roomId',
        otherKey: 'companyId'
      })
    }
  }
  Room.init({
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
          msg: `Room name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters long.`
        },
      },
    }
  }, {
    sequelize,
    modelName: 'room',
  });
  return Room;
};
