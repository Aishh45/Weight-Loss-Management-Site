import { useDispatch, useSelector } from 'react-redux';
import { addWeight } from '../../redux/weightSlice';
import { useState } from 'react';

const AddWeight = () => {
  const [weight, setWeight] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const weights = useSelector(state => state.weights[user.username] || []);

  const handleAdd = () => {
    const today = new Date().toISOString().split('T')[0];

    // ✅ Safe check to avoid crash
    const existingEntry = weights.find(w => w && w.date === today);

    if (existingEntry) {
      alert('You have already logged your weight today.');
      return;
    }

    const now = new Date();
    const timestamp = now.toLocaleString(); // shows date and time

    dispatch(addWeight({
      username: user.username,
      entry: {
        value: parseFloat(weight),
        date: today,
        timestamp: timestamp,
        id: Date.now()
      }
    }));

    setWeight('');
  };

  return (
    <div>
      <h3>Add Weight</h3>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Enter weight in kg"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddWeight;

