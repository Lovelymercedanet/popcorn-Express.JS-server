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

// Получить избранные фильмы пользователя
router.post("/get-favorites", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        // Проверка пользователя и пароля
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(404).json({ error: "User not found or invalid credentials" });
        }

        // Возвращаем массив фильмов
        res.status(200).json({
            message: "Favorites retrieved successfully",
            movies: user.movies,
        });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Удалить фильм из избранного
router.post("/remove-favorite", async (req, res) => {
    const { username, movieId } = req.body;

    if (!username || !movieId) {
        return res.status(400).json({ error: "Username and movieId are required" });
    }

    try {
        // Находим пользователя по username и удаляем фильм из массива movies
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $pull: { movies: { id: movieId } } }, // Удаление фильма по id
            { new: true } // Возвращает обновлённый документ
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "Movie removed from favorites successfully",
            movies: updatedUser.movies, // Обновлённый список фильмов
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error removing movie from favorites" });
    }
});

module.exports = router;
