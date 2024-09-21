
document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movieList');
    const movieTitleInput = document.getElementById('movieTitle');
    const addMovieButton = document.getElementById('addMovie');

    const removeMovieIdInput = document.getElementById('removeMovieId');
    const removeMovieButton = document.getElementById('removeMovie');

    const checkMovieIdInput = document.getElementById('checkMovieId');
    const checkAvailabilityButton = document.getElementById('checkAvailability');
    const availabilityStatus = document.getElementById('availabilityStatus');

    const API_BASE_URL = 'http://localhost:3000';

    // Function to fetch and display all movies
    function fetchMovies() {
        fetch(`${API_BASE_URL}/movies`)
            .then(response => response.json())
            .then(movies => {
                movieList.innerHTML = '';
                movies.forEach(movie => {
                    const tr = document.createElement('tr');

                    const idTd = document.createElement('td');
                    idTd.textContent = movie.id;
                    tr.appendChild(idTd);

                    const titleTd = document.createElement('td');
                    titleTd.textContent = movie.title;
                    tr.appendChild(titleTd);

                    const availabilityTd = document.createElement('td');
                    availabilityTd.textContent = movie.availability ? 'Available' : 'Not Available';
                    tr.appendChild(availabilityTd);

                    movieList.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                alert('Failed to fetch movies. Please try again.');
            });
    }

    // Function to add a new movie
    function addMovie() {
        const title = movieTitleInput.value.trim();
        if (!title) {
            alert('Please enter a movie title.');
            return;
        }

        fetch(`${API_BASE_URL}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert(data.message);
                    movieTitleInput.value = '';
                    fetchMovies();
                }
            })
            .catch(error => {
                console.error('Error adding movie:', error);
                alert('Failed to add movie. Please try again.');
            });
    }

    // Function to remove a movie
    function removeMovie() {
        const id = removeMovieIdInput.value.trim();
        if (!id) {
            alert('Please enter a movie ID.');
            return;
        }

        fetch(`${API_BASE_URL}/movies/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert(data.message);
                    removeMovieIdInput.value = '';
                    fetchMovies();
                }
            })
            .catch(error => {
                console.error('Error removing movie:', error);
                alert('Failed to remove movie. Please try again.');
            });
    }

    // Function to check availability of a movie
    function checkAvailability() {
        const id = checkMovieIdInput.value.trim();
        if (!id) {
            alert('Please enter a movie ID.');
            return;
        }

        fetch(`${API_BASE_URL}/movies/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    availabilityStatus.textContent = data.available ? 'Movie is Available' : 'Movie is Not Available';
                }
            })
            .catch(error => {
                console.error('Error checking availability:', error);
                alert('Failed to check availability. Please try again.');
            });
    }

    // Event Listeners
    addMovieButton.addEventListener('click', addMovie);
    removeMovieButton.addEventListener('click', removeMovie);
    checkAvailabilityButton.addEventListener('click', checkAvailability);

    // Initial fetch to populate the movie list
    fetchMovies();
});
