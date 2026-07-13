import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Analytic {
  _id: string;
  title: string;
  description: string;
  data: any[];
}

const App: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytic[]>([]);
  const [charts, setCharts] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAnalytics = async () => {
    try {
      const response = await fetch(`${API_URL}/api/analytics`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCharts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/charts`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setCharts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAnalytics();
    getCharts();
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Analytics Dashboard</h1>
          <ul>
            {analytics.map((item) => (
              <li key={item._id}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
          <h2>Charts</h2>
          <ul>
            {charts.map((chart) => (
              <li key={chart._id}>
                <h2>{chart.title}</h2>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
};

export default App;