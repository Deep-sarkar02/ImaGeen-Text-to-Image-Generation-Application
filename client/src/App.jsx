// this is the opening of the file 
// the main  react application is inside the  ckient folder
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import BuyCredit from './pages/BuyCredit';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  // get the context from the Appcontext
  const { showLogin } = useContext(AppContext);
  return (
    //paddding from the x
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      {/* toast container */}
      <ToastContainer position='bottom-right' />
      {/* display the navbar component here */}
      <Navbar />
      {/* condition for the login  */}

      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results' element={<Results />} />
        <Route path='/buy-credit' element={<BuyCredit />} />
      </Routes>
      <Footer />
      {/*now got to main.jsx file for react router setup*/}
    </div>
  );
}
export default App;

// clean the index.css and go to the index.html file