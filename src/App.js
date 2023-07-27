import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Read from './components/Read';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Update from './components/Update';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Create />}></Route>
          <Route exact path='/read' element={<Read />}></Route>        
          <Route exact path='/update/:id' element={<Update />}></Route>        

        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
