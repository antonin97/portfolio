// Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="side-panel">
        <h2>Navigation</h2>
        <ul>
          <li>
            <Link to="/projects">My Projects</Link>
          </li>
          <li>
            <Link to="/bio">Bio</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <h1>Welcome to My Portfolio</h1>
        <p>Explore my projects, learn more about me, and get in touch!</p>
      </div>
    </div>
  );
};

export default Home;
