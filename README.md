# Movie Rental System
Final project for 2nd Semester Web-II Course

This is a **full-stack** movie rental system with a frontend built in `HTML`, `CSS` and `JavaScript`, and a **backend** using `ExpressJS`, `Prisma`, and `PostgreSQL`. This system allows users to add movies, remove movies, and check their avialability.

Here is an outline of the project:

## Frontend:

HTML/CSS/JavaScript: Create a simple UI for users to interact with.  
**Functionality**:

- Simple text box for adding movies
- Table to display available movies
- Buttons for removing movies and checking availability

## Backend:

- Express.js: Set up an API with endpoints for managing movies.
- Prisma: Define the database schema and interact with the database.
- Database: Set up a PostgreSQL database to store movie data.

### API Endpoints:

- GET /movies: Retrieve all movies
- POST /movies: Add a new movie
- DELETE /movies/
- : Remove a movie
- GET /movies/
- : Check the availability of a movie

### Database Schema:
```PostgreSQL
 -id: Unique identifier
 -title: Movie title
 -availability: Whether the movie is available for rental
 ```

## Folder Structure:
    movie-rental-system/
    │
    ├── node_modules/
    ├── prisma/
    │   └── schema.prisma       # schema
    ├── .env
    ├── app.js                  # express server
    ├── package.json
    └── package-lock.json
    │
    ├── frontend/
    │   ├── index.html
    │   ├── styles.css
    │   ├── script.js
    │
    ├── .gitignore
    ├── README.md
    └── package.json
