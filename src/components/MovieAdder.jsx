'use client';

export default function MovieAdder({ saveToWatchList }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const movie = formData.get('new-movie').trim();
        if (movie) {
            saveToWatchList(movie);
            e.target.reset();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="new-movie" type="text" placeholder="Enter movie name" required />
            <button type="submit">Add to Watchlist</button>
        </form>
    );
}
