import { useEffect, useState } from 'react';
import { fetchApiData } from '../api';

type Workout = {
  id: number;
  title: string;
  durationMinutes: number;
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApiData<Workout>('workouts')
      .then(setWorkouts)
      .catch((fetchError) => setError(String(fetchError)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && workouts.length === 0 && <p>No workouts were returned from the API.</p>}
      {workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{workout.id}</td>
                  <td>{workout.title}</td>
                  <td>{workout.durationMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
