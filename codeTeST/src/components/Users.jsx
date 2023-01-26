import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      axios
        .get(
          'https://api.github.com/repos/microsoft/typescript/contributors?per_page=10'
        )
        .then((response) => setUsers(response.data));
    } catch (error) {
      setError(error);
    }
  }, []);

  // error handling
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Profile Picture</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <img src={user.avatar_url} alt={user.login} />
            </td>
            <td>{user.login}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default User;
