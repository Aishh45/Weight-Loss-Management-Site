import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateWeight } from '../../redux/weightSlice';

const EditModal = ({ data, close }) => {
  const [value, setValue] = useState(data.value);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateWeight({ ...data, value: parseFloat(value) }));
    close();
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
      <h4>Edit Weight</h4>
      <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={close}>Cancel</button>
    </div>
  );
};

export default EditModal;