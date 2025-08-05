import { useSelector } from 'react-redux';
import { useState } from 'react';

const WeightStats = () => {
  const user = useSelector(state => state.auth.user);
  const weights = useSelector(state => state.weights[user.username] || []);

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loss, setLoss] = useState(null);

  const calculate = () => {
    if (!from || !to) {
      alert('Please select both dates');
      return;
    }

    // Filter out nulls and ensure valid entries
    const filtered = weights
      .filter(w => w && w.date && w.value !== undefined) // skip nulls & bad data
      .filter(w => w.date >= from && w.date <= to)
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // sort by real date

    console.log("Filtered entries:", filtered);

     // Takes first and last weight in the filtered list
    if (filtered.length >= 2) {
      const first = filtered[0].value;
      const last = filtered[filtered.length - 1].value;
      const diff = last - first;
      setLoss(diff);

      /* ✅ Reset date fields after calculation
      setFrom('');
      setTo('');*/
    } else {
      alert('Need at least two entries between selected dates');
    }
  };

  return (
    <div>
      <h3>Calculate Weight Loss</h3>
      <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {loss !== null && (
        <p>
          Weight Difference: <strong>{loss > 0 ? `+${loss}` : loss} kg</strong>
        </p>
      )}
    </div>
  );
};

export default WeightStats;
