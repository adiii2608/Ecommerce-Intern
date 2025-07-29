import './App.css';
import Footer from './Pages/Footer';
import { CartProvider } from './Context/CartContext';
import MainApp from './MainApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='layout'>
    <CartProvider>
      
        <MainApp />
        <ToastContainer position="top-right" autoClose={2000} />
      
    </CartProvider>
   <Footer/>
    </div>
  
  );
}

export default App;
