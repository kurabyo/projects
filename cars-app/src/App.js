import './App.css';
import TableBody from './components/TableBody';
import TableHead from './components/TableHead';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars()
  }, []);

  // Fetching data
  const getCars = async () => {
    await axios.get('https://myfakeapi.com/api/cars/').then(res => {setCars(res.data.cars)})
  }

  return (
    <div className="App">
      <table class="table">
        <TableHead/>
        <TableBody cars={cars}/>
      </table>
    </div>
  );
}

export default App;
