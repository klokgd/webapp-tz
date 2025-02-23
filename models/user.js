const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async updateBalance(amount) {
      if (amount < 0 && this.balance < Math.abs(amount)) {
        throw new Error("Insufficient funds");
      }
      this.balance += amount;
      await this.save();
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        validate: {
          min: 0,
        }
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
}

