import { useState } from 'react';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    alert('Login functionality not implemented.');
  };

  const handleGoogleLogin = () => {
    // Add Google login logic here
    alert('Google login not implemented.');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="login-divider">or</div>
      <button className="google-login" onClick={handleGoogleLogin}>
        <img src="/google-icon.png" alt="Google" className="google-icon" />
        Login with Google
      </button>
      {/* Add more social login buttons here if needed */}
    </div>
  );
}

export default LoginPage;
