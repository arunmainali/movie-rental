const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

// Get all movies
app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany();
    res.status(200).send(movies); // 200 OK
});

// Add a new movie
app.post('/movies', async (req, res) => {
    const movie = await prisma.movie.create({
        data: {
            title: req.body.title,
            availability: req.body.availability || true // Default to true if not provided
        }
    });
    res.status(201).send({ message: "Movie added!", movie }); // 201 Created
});

// Delete a movie by ID
app.delete('/movies/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.movie.delete({
        where: { id: id }
    });
    res.status(200).send({ message: "Movie deleted!" }); // 200 OK
});

// Check availability of a movie by ID
app.get('/movies/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await prisma.movie.findUnique({
        where: { id: id }
    });

    if (movie) {
        res.status(200).send({ title: movie.title, availability: movie.availability });
    } else {
        res.status(404).send({ message: "Movie not found" }); // 404 Not Found
    }
});

// Update movie availability by ID
app.put('/movies/:id/availability', async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedMovie = await prisma.movie.update({
        where: { id: id },
        data: { availability: req.body.availability }
    });
    res.status(200).send({ message: "Movie availability updated!", updatedMovie }); // 200 OK
});

const portNumber = 3000;
app.listen(portNumber, () => console.log(`Server is running on port ${portNumber}.`));
