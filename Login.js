import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Get all users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check for a matching user
    const matchedUser = users.find(user => user.username === username && user.password === password);

    if (!matchedUser) {
      setError("Invalid credentials");
      return;
    }

    // ✅ Set current session user
    localStorage.setItem("user", JSON.stringify(matchedUser));
    dispatch(login(matchedUser));
    navigate("/dashboard");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
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
        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: '10px' }}>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        <p>Go back to <Link to="/">Home</Link></p>
      </div>
    </>
  );
}

export default Login;






/*import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Get permanently stored signup data
    const storedUser = JSON.parse(localStorage.getItem('signedUpUser'));

    if (!storedUser || storedUser.username !== username || storedUser.password !== password) {
      setError('Invalid credentials');
      return;
    }

    // ✅ Set session user
    localStorage.setItem('user', JSON.stringify(storedUser));
    dispatch(login(storedUser));
    navigate('/dashboard');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: '10px' }}>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        <p>Go back to <Link to="/">Home</Link></p>
      </div>
    </>
  );
}

export default Login;*/
