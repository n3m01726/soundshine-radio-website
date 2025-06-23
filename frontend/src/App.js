import React from "react";
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

function App() {
  return (
    <Router>
      <Header />
      <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
        <h2>Soundshine RadioDJ</h2>
        <div style={{ marginBottom: 20 }}>
          <Link to="/install">
            <button>Installation</button>
          </Link>{" "}
          <Link to="/shows">
            <button>Shows RadioDJ</button>
          </Link>{" "}
          <Link to="/posts">
            <button>Posts du site</button>
          </Link>{" "}
          <Link to="/">
            <button>Accueil</button>
          </Link>{" "}
          <Link to="/charts">
            <button>Charts</button>
          </Link>{" "}
          <Link to="/profile/1">
            <button>Profile</button>
          </Link>{" "}
          <Link to="/schedule">
            <button>Schedule</button>
          </Link>{" "}
          <Link to="/team">
            <button>Team</button>
          </Link>
        </div>
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
      </div>
      <Footer />
    </Router>
  );
}

export default App;
