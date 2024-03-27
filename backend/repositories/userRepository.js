import User from '../models/User.js';

class UserRepository {
    constructor() {
        if (!UserRepository.instance) {
            this.userModel = User;
            UserRepository.instance = this;
        }
        return UserRepository.instance;
    }

    async createUser(userData) {
        const { username, email, password, photo, role } = userData;
        try {
            const newUser = new this.userModel({ username, email, password, photo, role });
            return await newUser.save();
        } catch (err) {
            throw err;
        }
    }

    async updateUser(userData, id) {
        try {
            return await this.userModel.findByIdAndUpdate(id, { $set: userData }, { new: true });
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(id) {
        try {
            return await this.userModel.findByIdAndDelete(id);
        } catch (err) {
            throw err;
        }
    }

    async getSingleUser(id) {
        try {
            return await this.userModel.findById(id);
        } catch (err) {
            throw err;
        }
    }

    async getAllUsers() {
        try {
            return await this.userModel.find({});
        } catch (err) {
            throw err;
        }
    }
}

export default new UserRepository();
