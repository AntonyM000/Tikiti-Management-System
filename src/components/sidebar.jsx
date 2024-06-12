import React from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { RiDashboardFill } from 'react-icons/ri';
import { SiDwavesystems, SiWebmoney } from 'react-icons/si';
import { GiExpense } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
 


function Sidebar() {
  const navigate=useNavigate();
  function logout(){

    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Sign-out successful');
      navigate ('/login');
      
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
    
    }
  return (
    <aside className='sidebar'>
        <div> 
            <h3><SiDwavesystems/>Tikiti LLC</h3>
        </div>

        <div className='links'>
        <Link to='/'><RiDashboardFill/> Dashboard</Link>
        <Link to='/income'><SiWebmoney/>Income</Link>
        <Link to='/expenses'><GiExpense/>Expenses</Link>
        <Link to='/profile'><CgProfile/>Profile</Link>
        </div>

        <button onClick={logout}>Log out</button>     
    </aside>
  )      
}

export default Sidebar

