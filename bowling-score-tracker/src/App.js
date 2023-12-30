import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/ResigterForm";
import "./App.css";
import ScoreCard from "./components/ScoreTracking/ScoreCard";
import AuthDetails from "./components/Auth/AuthDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path = '/' element = {<LoginForm />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/score-card" element={<ScoreCard/>}></Route>
          <Route path="/auth-details" element={<AuthDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
