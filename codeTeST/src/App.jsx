import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [contributors, setContributors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/microsoft/typescript/contributors?per_page=10'
        );
        setContributors(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  // error handling
  if (error) {
    return <div className='notification is-danger'>An error occured: {error.message}</div>;
  }

  return (
    <table className='table is-bordered mt-5'>
      <thead>
        <tr>
          <th>Profile Picture</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {contributors.map((contributor) => (
          <tr key={contributor.id}>
            <td>
              <img src={contributor.avatar_url} alt={contributor.login} />
            </td>
            <td>{contributor.login}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
