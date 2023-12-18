import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/ResigterForm';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Bowling Score Tracker</h1>
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;
