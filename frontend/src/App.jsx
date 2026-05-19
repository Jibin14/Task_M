import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentsss/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './componentsss/Login';
import Register from './componentsss/Register';
import "./App.css";
import Home from './componentsss/Home';
import NewTask from './componentsss/NewTask';
import EditTask from './componentsss/Edit';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />

        <ToastContainer
          position="top-center"
          autoClose={2000}
        />

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/tasks' element={<NewTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;