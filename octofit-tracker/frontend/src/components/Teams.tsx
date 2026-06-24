import { useEffect, useState } from 'react';
import { fetchApiData } from '../api';

type Team = {
  id: number;
  name: string;
  members: number;
};

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApiData<Team>('teams')
      .then(setTeams)
      .catch((fetchError) => setError(String(fetchError)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && teams.length === 0 && <p>No teams were returned from the API.</p>}
      {teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td>{team.members}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
