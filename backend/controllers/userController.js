import UserRepository from '../repositories/userRepository.js';

// Tạo User
export const createUser = async (req, res) => {
    try {
        const newUser = await UserRepository.createUser(req.body);
        res.status(200).json({ success: true, message: "Successfully created", data: newUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create. Try again" });
    }
}

// Sửa User
export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await UserRepository.updateUser(id, req.body);
        res.status(200).json({ success: true, message: "Successfully updated", data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update" });
    }
}

// Xóa User
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await UserRepository.deleteUser(id);
        res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
}

// Lấy thông tin 1 User
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserRepository.getSingleUser(id);
        if (user) {
            res.status(200).json({ success: true, message: "User found", data: user });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        res.status(404).json({ success: false, message: "User not found" });
    }
}

// Lấy tất cả User
export const getAllUser = async (req, res) => {
    try {
        const users = await UserRepository.getAllUsers();
        res.status(200).json({ success: true, message: "All users retrieved", data: users });
    } catch (err) {
        res.status(404).json({ success: false, message: "No users found" });
    }
}
