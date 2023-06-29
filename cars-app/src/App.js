import './App.css';
import TableBody from './components/TableBody';
import TableHead from './components/TableHead';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './styles/pagination.css'

const carsPerPage = 10

export const CarsContext = createContext()

function App() {
  const [cars, setCars] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("cars");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
    if (cars.length === 0) getCars()
  }, [cars]);

  // Fetching data
  const getCars = async () => {
    await axios.get('https://myfakeapi.com/api/cars/').then(res => {
      setCars(res.data.cars)
    })
  }

  // Pagination
  const [carOffset, setCarOffset] = useState(0);

  const endOffset = carOffset + carsPerPage;
  const currentCars = cars.slice(carOffset, endOffset);
  const pageCount = Math.ceil(cars.length / carsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * carsPerPage) % cars.length;
    setCarOffset(newOffset);
  };

  // test
  const deleteCar = () => {
    setCars(prev => prev.slice(1))
  }

  return (
    <div className="App">
      <CarsContext.Provider value={{ cars, setCars }}>
        <table className="table">
          <TableHead />
          <TableBody cars={currentCars} />
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          pageLinkClassName='page-num'
          previousLinkClassName='page-num'
          nextLinkClassName='page-num'
          activeLinkClassName='active'
          breakLinkClassName='break' />
        <button onClick={deleteCar}>delete car</button>
      </CarsContext.Provider>
    </div>
  );
}

export default App;
