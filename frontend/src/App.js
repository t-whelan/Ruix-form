import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './signUp';
import SuccessPage from './SuccessPage';
import './style.css';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/success" component={SuccessPage} /> {/* Create the SuccessPage component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;