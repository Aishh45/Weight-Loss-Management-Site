import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editWeight, deleteWeight } from '../../redux/weightSlice';

const WeightList = () => {
  const user = useSelector(state => state.auth.user);
  const weights = useSelector(state => state.weights[user.username] || []);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const itemsPerPage = 2;

  //  Spread operator with latest entry first
  const sortedWeights = [...weights].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalPages = Math.ceil(sortedWeights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWeights = sortedWeights.slice(startIndex, startIndex + itemsPerPage);

   //  edit and save weight entries
  const handleEdit = (id, value) => {
    setEditId(id);
    setEditValue(value.toString());
  };

  const handleSave = (id) => {
    if (!editValue.trim()) return alert('Weight cannot be empty');
    dispatch(editWeight({ username: user.username, id, newValue: parseFloat(editValue) }));
    setEditId(null);
    setEditValue('');
  };
    
   
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      dispatch(deleteWeight({ username: user.username, id }));
    }
  };
    
    //  Pagination controls
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div>
      <h3>Your Weight Entries</h3>
      {paginatedWeights.length === 0 ? (
        <p>No weight entries yet.</p>
      ) : (
        <>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Weight (kg)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedWeights.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>{entry.timestamp}</td>
                  <td>
                    {editId === entry.id ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      entry.value
                    )}
                  </td>
                  <td>
                    {editId === entry.id ? (
                      <>
                        <button onClick={() => handleSave(entry.id)}>Save</button>
                        <button onClick={() => setEditId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(entry.id, entry.value)}>Edit</button>
                        <button onClick={() => handleDelete(entry.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '10px' }}>
            <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
            <span style={{ margin: '0 10px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default WeightList;
