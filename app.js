// index.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/', (req, res) => {
    res.send('Movie Rental System Backend is running!');
});

// GET /movies: Retrieve all movies
app.get('/movies', async (req, res) => {
    try {
        const movies = await prisma.movie.findMany();
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
});

// POST /movies: Add a new movie
app.post('/movies', async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const movie = await prisma.movie.create({
            data: { title },
        });
        res.status(201).json({ message: 'Movie added!', movie });
    } catch (error) {
        console.error('Error adding movie:', error);
        if (error.code === 'P2002') { // Unique constraint failed
            res.status(409).json({ error: 'Movie title must be unique' });
        } else {
            res.status(500).json({ error: 'Error adding movie' });
        }
    }
});

// DELETE /movies/:id: Remove a movie
app.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await prisma.movie.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Movie removed!', movie });
    } catch (error) {
        console.error('Error removing movie:', error);
        res.status(500).json({ error: 'Error removing movie' });
    }
});

// GET /movies/:id: Check availability of a movie
app.get('/movies/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await prisma.movie.findUnique({
            where: { id: parseInt(id) },
        });

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json({ available: movie.availability });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ error: 'Error checking availability' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
