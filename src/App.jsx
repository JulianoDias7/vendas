import { BrowserRouter } from 'react-router-dom';
import Header from './layouts/Header';
import AppRoutes from './pages/routes';
import Footer from './layouts/Footer';


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <AppRoutes />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
