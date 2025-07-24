import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(credentials);
      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Usuario"
          value={credentials.username}
          onChange={(e) => setCredentials({
            ...credentials,
            username: e.target.value
          })}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={(e) => setCredentials({
            ...credentials,
            password: e.target.value
          })}
          required
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};

export default Login;