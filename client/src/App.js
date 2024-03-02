import React, {useState} from 'react'
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashbaord';
import { Routes, Route , Navigate} from 'react-router-dom';
import Forgotpassword from './components/Forgotpassword';
import Newpassword from './components/Newpassword';
import SignUp from './components/SignUp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    
    <div>
      <Routes>
       <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />}>
       <Route path="/signup" element={<SignUp/>} /> 
       <Route path="/forgotPassword" element={< Forgotpassword />} /> 
       <Route path="/newPassword" element={< Newpassword />} /> 
       {
        isLoggedIn && (
          <Route path="/dashboard" element={<Dashboard/>}/>
        )
       }
     </Route>
      </Routes>
    </div>
  )
}

export default App
