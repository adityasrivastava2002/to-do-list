import React, { useState } from 'react';

const TodoSort = ({ sortTodos }) => {
  const [sortOrder, setSortOrder] = useState('');

  const handleSort = () => {
    sortTodos(sortOrder);
  };

  return (
    <div>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="">Sort Order</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button onClick={handleSort}>Sort</button>
    </div>
  );
};

export default TodoSort;
