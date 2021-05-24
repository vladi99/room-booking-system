import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../utils/constants';
import { ADMIN, COMPANY_ADMIN, MEMBER } from './role';
import bcrypt from 'bcrypt';
const saltRounds = 10;

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
      this.belongsToMany(models.role, {
        through: 'userRoles',
        as: 'roles',
        foreignKey: 'userId',
        otherKey: 'roleId'
      });
    }

    validPassword = (password) => {
      return bcrypt.compare(password, this.password);
    }

    isAdmin = async () => {
      const roles = await this.getRoles();
      return roles.some((role) => role.name === ADMIN)
    }

    isCompanyAdmin = async () => {
      const roles = await this.getRoles();
      return roles.some((role) => role.name === COMPANY_ADMIN)
    }

    isMember = async () => {
      const roles = await this.getRoles();
      return roles.some((role) => role.name ===MEMBER)
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
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH],
          msg: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters long.`
        },
      },
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        return bcrypt.hash(user.get('password'), saltRounds).then((hash) => { user.password = hash })
      },
      beforeUpdate: (user) => {
        if (user.changed('password')) {
          return bcrypt.hash(user.password, saltRounds).then((hash) => { user.password = hash })
        }
      },
    },
    sequelize,
    modelName: 'user',
  });

  return User;
};
