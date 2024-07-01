
import './App.css'
import { Dashboard} from "./components/Dashboard";
import { Error } from "./components/Error";
import Main from "./Layout.tsx/Main";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewAll from "./components/ViewAll";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransactionProvider } from "./context/TransactionContext";
import { Intro } from "./components/Intro";








const App = () => {
  return (
    <TransactionProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Main />} >
          <Route path="/" element={<Dashboard />} />
          <Route path="/viewall" element={<ViewAll />} />
        <Route path="*" element={<Error />} />
        </Route>  
      </Routes>
      <ToastContainer />
    </Router>
    </TransactionProvider>
  )
}

export default App