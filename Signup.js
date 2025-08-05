import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // ✅ Get all existing users or start with an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check if the username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      setError("Username already exists");
      return;
    }

    // ✅ Add new user to the array
    const newUser = { username, password };
    users.push(newUser);

    // ✅ Save updated array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Redirect to login page
    navigate("/login");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>

      <div style={{ marginTop: "10px" }}>
        <p>Already have an account? <Link to="/login">Login</Link></p>
        <p>Go back to <Link to="/">Home</Link></p>
      </div>
    </>
  );
}

export default Signup;
