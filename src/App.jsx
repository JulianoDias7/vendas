import { BrowserRouter } from 'react-router-dom';
import Header from './layouts/Header';
import AppRoutes from './pages/routes';


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export default App;
