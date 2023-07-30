import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddDrug from './AddData';
import Navbar from './Navbar';



function App() {
  return (
    <div >

      <BrowserRouter>
      <Navbar/>
      
        <Routes>
          <Route  path="/" exact element={<Home/>} />
          <Route path="/addDrug" element={<AddDrug/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;