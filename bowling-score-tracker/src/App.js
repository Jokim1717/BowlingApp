import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/ResigterForm";
import Home from "./components/Auth/Home";

import "./App.css";
import ScoreCard from "./components/ScoreTracking/ScoreCard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path = '/' element = {<Home />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path = "/score-card" element = {<ScoreCard/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
