// import logo from './logo.svg';
import './App.css';
import Navbar from './component/Home';
import {Route,Routes} from 'react-router-dom'
import Layout  from './Layout/Layout';
import {BrowserRouter} from 'react-router-dom';
import Roomlist from './component/Roomlist';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Navbar/>}></Route>
      <Route path='room' element={<Roomlist/>}></Route>

      </Route>
      
     
    </Routes>
    </>
  );
}
export default App;
