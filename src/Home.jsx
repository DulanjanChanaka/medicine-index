import { useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import React from 'react';
import './styles.css'

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
const dataCollection = collection(db, "drugs");

const searchDataByFirstLetter = async (letter) => {
  const q = query(dataCollection, where("dname", ">=", letter), where("dname", "<", letter + "\uf8ff"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const DeleteData = ({ id, onDataDeleted }) => {
  const handleDelete = async () => {
    try {
      if (!id) {
        console.error("Invalid ID:", id);
        return;
      }

      await deleteDoc(doc(dataCollection, id));
      console.log("Item deleted successfully:", id);
      onDataDeleted(id); 
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

const Home = () => {
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchName(searchValue);
  };

  
  

  useEffect(() => {

    const fetchData = async () => {
        const result = await searchDataByFirstLetter(searchName);
        setSearchResult(result);
      };
    
    if (searchName) {
      fetchData();
    } else {
      
      setSearchResult([]);
    }
  }, [searchName]);

  const handleDataDeleted = (deletedId) => {
    setSearchResult((prevResults) => prevResults.filter((item) => item.id !== deletedId));
  };

  return (
    <div className='container'>
      <button className='btn-add'>
        <a href='/addDrug'>Add</a>
      </button>
      <input
        type="text"
        placeholder='Enter Drug Name'
        value={searchName}
        onChange={handleSearch}
      />
      <h2>Search Result</h2>
      <div className='card-new'>
        {searchResult.length > 0 ? (
          <div className='card'>
            {searchResult.map((item) => (
              <div key={item.id}>
                <p className='dname'>{item.dname}</p>
                <p className='bn'>{item.bookno}</p>
                <p className='pn'>{item.pageno}</p>
                <DeleteData id={item.id} onDataDeleted={handleDataDeleted} />
              </div>
            ))}
          </div>
        ) : (
          <p>No matching data found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
