import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (

  <BrowserRouter>  
      <Navbar></Navbar>

      <div className="overflow-hidden p-0 m-0">
        <Routes>
          <Route 
            path="/" 
            element={<Home/>}>
          </Route>

          <Route 
            path="/cart" 
            element={<Cart/>}>
          </Route>
        </Routes>
      </div>

  </BrowserRouter>  

  );
}

export default App;
