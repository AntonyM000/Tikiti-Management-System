import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import React, { useRef } from 'react';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); 
  const auth = getAuth();
  const db = getFirestore(app);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate('/');  
      })
      .catch((error) => {
        // console.log(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);


      });
  };

  return (
    <div className='main'>
      <Form emailRef={emailRef} passwordRef={passwordRef} handleSubmit={handleSubmit} />
    </div>
  );
}

function Form({ emailRef, passwordRef, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className='Loginform'>
      <h2>Tikiti LLC</h2>
      <h3>Login Page</h3>
      <input type='email' ref={emailRef} placeholder='Enter your Email' />  
      <input type='password' ref={passwordRef} placeholder='Enter your password' />  
      <button>Log-in</button>

      <p className='acc-create'>Don't have an Account?<a href='./signup'>Create account</a></p>
      <p className='acc-create'>Reset password?</p>
    </form>
  );
}
