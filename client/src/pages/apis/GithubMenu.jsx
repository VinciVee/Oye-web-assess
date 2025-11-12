import { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';   //Error box
import { Link } from 'react-router-dom';

import { getGitHubRestfulData } from '../../services/github'
import ReposList from '../../components/features/apis/ReposList'
import OyeLoader from '../../components/common/OyeLoader';

const GithubMenu = () => {
  // HOOK: State for the API data, loading & error states
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // HOOK: Prevention of useEffect calling TWICE (React v18)
  const effectRan = useRef(false);
  // HOOK: Call API on initial render & set loader
  useEffect(() => {
    if (effectRan.current === false) {
      // REMEMBER: Must call the declared named function & stop loading spinner
      fetchData();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        effectRan.current = true;
      }
    }
  }, []);

  async function fetchData(){
    try {
      // External API Request: GitHub Endpoint
      const response = await getGitHubRestfulData();
      console.log(response);

      // Access Object Properties to Find Data Array & Save to Variable
      const data = await response.data;

      // SUCCESS: Output needs to override data state
      setRepos(data);
      console.log(data)

    } catch (err) {
      console.log(err)
      setError(true);
      toast.error("Internal Server Error");
    }
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center mt-5">
        <p>Error loading page ...</p>
        <Link to="/">Return to Home page</Link>
      </Container>
    )
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container className="text-center">
        <OyeLoader />
      </Container>
    )
  }

  // DEFAULT LOAD: SUCCESS API CALL
  return (
    <Container>
      <div className="text-center">
        <h1>GitHub Users List</h1>
        <p>Find your favourite GitHub Gurus here!</p>
      </div>

      {/* MAPPING SECTION: Render the now updated array of data using a map() method to loop it + REFACTORED */}
      {repos.length > 0 && <ReposList repos={repos} />}
    </Container>
  )
}

export default GithubMenu
