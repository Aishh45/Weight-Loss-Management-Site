import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWeights } from '../redux/weightSlice';

import Header from '../components/Layout/Header';
import AddWeight from '../components/Dashboard/AddWeight';
import WeightList from '../components/Dashboard/WeightList';
import WeightStats from '../components/Dashboard/WeightStats';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const weights = useSelector(state => state.weights[user.username] || []);

  // Load weights from localStorage when component mounts
  useEffect(() => {
    const storedWeights = JSON.parse(localStorage.getItem('weights')) || {};
    dispatch(setWeights(storedWeights));
  }, [dispatch]);

  // Save weights to localStorage whenever weights change
  useEffect(() => {
    const allWeights = JSON.parse(localStorage.getItem('weights')) || {};
    allWeights[user.username] = weights;
    localStorage.setItem('weights', JSON.stringify(allWeights));
  }, [weights, user.username]);

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <AddWeight />
        <WeightStats />
        <WeightList />
      </div>
    </>
  );
};

export default Dashboard;

