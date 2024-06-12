import React, { useRef, useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { db, storage, auth } from "../firebase";
import { update } from 'firebase/database';


export default function Profile({ user }) {
  const [imageSrc, setImageSrc] = useState('/user.png');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        
       const userCollection =doc(collection(db,"users")); 
      //  firebase.firestore().collection('users').doc(user.uid);
        fetchUserImage(user.uid);
        console.log(user.uid);
      }
    });
  }, [navigate]);

  const uploadImage = async (event,userCollection) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);

      const storageRef = ref(storage, `user_images/${auth.currentUser.uid}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // update data in the users collection
        
        userCollection.update({
          // await setDoc(doc(db, "userImages", auth.currentUser.uid), {
            userImage: downloadURL,
            imageUploadTimeStamp: new Date().getTime(),      
        })

        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };

  const fetchUserImage = async (userID) => {
    try {
      const docRef = doc(db, "userImages", userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImageSrc(docSnap.data().userImage);
      }
    } catch (error) {
      console.error("Error fetching user image:", error);
    }
  };

  return (
    <div>
      <div className='imguploaddiv'>
        <p>{user}</p>
        <img src={imageSrc} id="imageupload" alt='user' />
        <label htmlFor="userimg">Upload image</label>
        <input ref={fileInputRef} onChange={uploadImage} id="userimg" type="file" accept="image/jpeg, image/jpg, image/png" />
      </div>
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}
