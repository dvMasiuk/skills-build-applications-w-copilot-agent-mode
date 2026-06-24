import { useEffect, useState } from 'react';
import { fetchApiData } from '../api';

type LeaderboardEntry = {
  userId: number;
  points: number;
};

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApiData<LeaderboardEntry>('leaderboard')
      .then(setEntries)
      .catch((fetchError) => setError(String(fetchError)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && entries.length === 0 && (
        <p>No leaderboard entries were returned from the API.</p>
      )}
      {entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.userId}>
                  <td>{entry.userId}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
