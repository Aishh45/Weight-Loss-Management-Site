import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header>
      <h2>Weight Tracker</h2>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
