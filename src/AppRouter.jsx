import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Bio from './Pages/Bio';
import Contacts from './Pages/Contacts';
import GameOfLife from './Pages/GameOfLife';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameOfLife />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
