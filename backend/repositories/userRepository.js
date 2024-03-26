import User from '../models/User.js';

class UserRepository {
    async createUser(userData) {
        const { username, email, password, photo, role } = userData;
        try {
            const newUser = new User({ username, email, password, photo, role });
            return await newUser.save();
        } catch (err) {
            throw err;
        }
    }

    async updateUser(userData,id) {
        try {
            return await User.findByIdAndUpdate(id, { $set: userData }, { new: true });
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(id) {
        try {
            return await User.findByIdAndDelete(id);
        } catch (err) {
            throw err;
        }
    }

    async getSingleUser(id) {
        try {
            return await User.findById(id);
        } catch (err) {
            throw err;
        }
    }

    async getAllUsers() {
        try {
            return await User.find({});
        } catch (err) {
            throw err;
        }
    }
}

export default new UserRepository();
