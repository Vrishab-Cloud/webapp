const { Model, UUIDV4 } = require("sequelize");
const { bcrypt } = require("../utils");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }

    async validatePassword(password) {
      return await bcrypt.comparePassword(password, this.password);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [3, 23],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [3, 23],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
      underscored: true,
      createdAt: "account_created",
      updatedAt: "account_updated",
      indexes: [
        {
          unique: true,
          fields: ["username"],
        },
      ],
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.bcryptPassword(user.password);
        },
        beforeUpdate: async (user) => {
          /**
           *  Using in-built function to check whether the password has changed.
           *  Note: cant do user.password check to check the above condition
           **/
          if (user.changed("password"))
            user.password = await bcrypt.bcryptPassword(user.password);
        },
      },
    }
  );
  return User;
};
