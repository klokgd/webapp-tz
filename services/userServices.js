const db = require('../models');
const { User } = db; 

class UserService {
    static async updateBalance(userId, amount) {
        console.log('User:', User);
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        await user.updateBalance(amount);

        return user;
    }
}

module.exports = UserService;