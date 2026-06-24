import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export default function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">
          API host: <code>{apiHost}</code>
        </p>
        {!codespaceName && (
          <div className="alert alert-warning">
            <strong>Warning:</strong> VITE_CODESPACE_NAME is not defined. The frontend is using the local API fallback.
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespace-hosted API links.
          </div>
        )}
      </header>

      <nav className="nav nav-pills mb-4 flex-wrap gap-2">
        <Link className="nav-link" to="/users">
          Users
        </Link>
        <Link className="nav-link" to="/teams">
          Teams
        </Link>
        <Link className="nav-link" to="/activities">
          Activities
        </Link>
        <Link className="nav-link" to="/workouts">
          Workouts
        </Link>
        <Link className="nav-link" to="/leaderboard">
          Leaderboard
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<div className="alert alert-info">Page not found.</div>} />
      </Routes>
    </div>
  );
}
