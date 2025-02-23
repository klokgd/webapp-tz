const UserService = require('../services/userServices');
const { body, param, validationResult } = require("express-validator");

class BalanceController {
  static validateUpdateBalance = [
    param("userId").isInt().withMessage("userId must be an integer"),
    body("amount")
      .isNumeric()
      .withMessage("amount must be a number")
      .notEmpty()
      .withMessage("amount is required"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  static async updateBalance(req, res) {
    const { userId } = req.params;
    const { amount } = req.body;

    try {
      const user = await UserService.updateBalance(userId, amount);
      res.json({ balance: user.balance });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = BalanceController;