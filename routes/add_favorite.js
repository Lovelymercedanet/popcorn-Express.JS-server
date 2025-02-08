// В auth.js или любом другом файле с маршрутами
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Добавить фильм в избранное
router.post("/add-favorite", async (req, res) => {
    const { username, movie } = req.body;

    if (!username || !movie) {
        return res.status(400).json({ error: "Username and movie are required" });
    }

    try {
        // Находим пользователя по username и добавляем фильм в массив movies
        const updatedUser = await User.findOneAndUpdate(
            { username }, // Условие поиска
            { $push: { movies: movie } }, // Добавление фильма в массив
            { new: true } // Возвращает обновлённый документ
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "Movie added to favorites successfully",
            movies: updatedUser.movies, // Обновлённый список фильмов
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error adding movie to favorites" });
    }
});

module.exports = router;
