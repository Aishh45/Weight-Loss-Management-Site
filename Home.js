import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1><center>Welcome to Weight Tracker</center></h1>
    <p>Track your daily weight and monitor progress!</p>
    <center><Link to="/signup">Signup</Link> | <Link to="/login">Login</Link></center>
  </div>
);

export default Home;