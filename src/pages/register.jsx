import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader';


function Register() {
  const nameRef= useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const auth = getAuth();
  const db= getFirestore(app)
  const navigate=useNavigate();
  const [isLoading, setIsLoading]=useState(false)
  const handleSubmit=(e)=>{
    e.preventDefault()
    const email= emailRef.current.value;
    const password= passwordRef.current.value;
    const name = nameRef.current.value;


  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setIsLoading(true);
    // Signed up 
    const user = userCredential.user;
    // console.log(user.uid)
    const newUser=doc(collection(db, 'users'))
    setDoc(newUser,{
      userID: user.uid,
      userName:name,
      userEmail:email,
      timestamp: new Date().getTime()
    }
    ).then(()=>{
      navigate('/')
    }).catch((error)=>{
      setIsLoading(false);
      console.log(error.message)
    })
  })
  .catch((error) => {

    setIsLoading(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  }
  return (
    <div className='main'>
      <Form nameRef={nameRef} emailRef={emailRef} passwordRef={passwordRef} handleSubmit={handleSubmit}/>
      {isLoading && <Loader/>}
    </div>
  )
}

export default Register

function Form({nameRef, emailRef, passwordRef, handleSubmit}){
return(   
     <form onSubmit={handleSubmit} className='registerform'>
        <h2>Tikiti LLC</h2>
        <h3>Registration Page</h3>
        
        <input type='text' ref={nameRef} placeholder='Full Name'/>
        <input type='email' ref={emailRef} placeholder='Enter your email address'/>
        <input  type='password' ref={passwordRef}placeholder='Enter your password'/>
        
        <button>Register</button>
        <p className='acc-create'>Already a user?<a href=''>Sign in</a></p>
       
     </form>
)
}





