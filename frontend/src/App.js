import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InstallForm from "./components/InstallForm";
import ShowList from "./components/ShowList";
import PostList from "./components/PostList";
import Home from "./components/Home";
import Charts from "./components/Charts";
import Profile from "./components/Profile";
import Schedule from "./components/Schedule";
import SinglePost from "./components/SinglePost";
import SinglePage from "./components/SinglePage";
import SingleEvent from "./components/SingleEvent";
import SingleShow from "./components/SingleShow";
import Team from "./components/Team";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OffcanvasMenu from "./components/OffcanvasMenu";

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <ul className="space-y-4">
      <li>
        <Link
          to="/"
          className="text-xl font-semibold text-link hover:text-linkHover transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/charts"
          className="text-xl font-semibold text-link hover:text-linkHover transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Charts
        </Link>
      </li>
      <li>
        <Link
          to="/schedule"
          className="text-xl font-semibold text-link hover:text-linkHover transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Schedule
        </Link>
      </li>
      <li>
        <a
          href="#"
          className="text-xl font-semibold text-link hover:text-linkHover transition-colors"
        >
          Shop
        </a>
      </li>
    </ul>
  );

  return (
    <Router>
      <OffcanvasMenu open={isMenuOpen} onClose={() => setMenuOpen(false)}>
        {navLinks}
      </OffcanvasMenu>

      <Header onMenuClick={() => setMenuOpen(true)} />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-title mb-6">
          Soundshine RadioDJ
        </h2>
        <Routes>
          <Route path="/install" element={<InstallForm />} />
          <Route path="/shows" element={<ShowList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/event/:id" element={<SingleEvent />} />
          <Route path="/page/:id" element={<SinglePage />} />
          <Route path="/show/:id" element={<SingleShow />} />
          <Route path="/team" element={<Team />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
