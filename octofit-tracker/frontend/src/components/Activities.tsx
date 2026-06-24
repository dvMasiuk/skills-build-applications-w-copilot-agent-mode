import { useEffect, useState } from 'react';
import { fetchApiData } from '../api';

type Activity = {
  id: number;
  userId: number;
  type: string;
  distanceKm: number;
};

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApiData<Activity>('activities')
      .then(setActivities)
      .catch((fetchError) => setError(String(fetchError)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && activities.length === 0 && (
        <p>No activities were returned from the API.</p>
      )}
      {activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Distance (km)</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.id}</td>
                  <td>{activity.userId}</td>
                  <td>{activity.type}</td>
                  <td>{activity.distanceKm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
