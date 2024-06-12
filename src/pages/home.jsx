// make global use state, pass as props to profile and Home, update user image on upload
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "../firebase";
import Profile from "./profile";

function Home() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore(app);
  const [user, setUser]= useState('')
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        navigate("/login");
      } else {
        const fetchUser = async () => {
          const queryDocument = query(collection(db, "users"),
            where('userID', '==', user.uid)            
          );
          const querySnapshot= await getDocs(queryDocument)
          querySnapshot.forEach((userDoc)=>{
            const username = userDoc.data().userName
            console.log(username)
            setUser(username)
          })
          // querySnapshot.map((params)=>{})
        };
      fetchUser()
      }
    });
  }, []);
  return (
    <div className="home-main">
      <Sidebar />
      <div className="main-div">
        <Navbar user={user} />
      {/* <Profile user={user} /> */}

        <Outlet />
      </div>
    </div>
  );
}

export default Home;
