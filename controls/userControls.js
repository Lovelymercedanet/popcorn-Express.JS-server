const User = require("../models/User");

// Функция для получения всех пользователей
const fetchAllUsers = async () => {
    try {
        const userData = await User.find();
        return userData; // Возвращаем список пользователей
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
};

// Middleware для маршрута, чтобы вернуть всех пользователей
const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find()
        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: "No users at all" })
        }
        res.status(200).json(userData)
    } catch (e) {
        res.status(500).json({ errorMessage: error.message })
    }
}

module.exports = { fetchAllUsers, getAllUsers }