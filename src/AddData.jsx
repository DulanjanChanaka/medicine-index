import './adddata.css'
import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyA0KryAUpcQmIKmHwT8H-ZZEjWJa1wJTGw",
    authDomain: "inventory-index.firebaseapp.com",
    projectId: "inventory-index",
    storageBucket: "inventory-index.appspot.com",
    messagingSenderId: "284803539840",
    appId: "1:284803539840:web:0b56ffe00be4d6dede9765"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function AddDrug() {

  const [dname, setDname] = useState('');
  const [bookno, setBookno] = useState('');
  const [pageno, setPageno] = useState('');


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'drugs'), {
        dname,
        bookno,
        pageno

      });
      console.log('Document written with ID: ', docRef.id);

      setDname('');
      setBookno('')
      setPageno('')

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };





  return (
    <div className='main-container'>

       <form onSubmit={handleSubmit}>
       <div className='enter-section'>
        <label>Drug Name  </label>
        <input type="text" value={dname} onChange={(e) => setDname(e.target.value)} placeholder='Enter Drug Name'></input>
        <label>Book No  </label>
        <input type="text" value={bookno} onChange={(e) => setBookno(e.target.value)} placeholder='Enter Book No'></input>
        <label>Page No  </label>
        <input type="text" value={pageno} onChange={(e) => setPageno(e.target.value)} placeholder='Enter Page No'></input>

        <button className='sub-btn'>Submit</button>
        </div>
       </form>
    </div>
  )
}

export default AddDrug