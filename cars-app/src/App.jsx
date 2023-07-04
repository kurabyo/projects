import TableBody from './components/TableBody';
import TableHead from './components/TableHead';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './styles/pagination.css'
import AddModal from './components/AddModal';
import TextField from '@mui/material/TextField';

// Setting nuber of displayed cars per page.............................// 
const carsPerPage = 10

// Creating car context / prevent props drilling........................//
export const CarsContext = createContext()

function App() {

  // States............................................................//
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem("cars");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [search, setSearch] = useState('');
  const [carOffset, setCarOffset] = useState(0);

  // Цe disturb the data in the local storage to be able to save changes in the data / if you delete all the cars, they will all be loaded from the API..// 
  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
    if (cars.length === 0) getCars()

  }, [cars]);

  // Fetching data from API.............................................//
  const getCars = async () => {
    await axios.get('https://myfakeapi.com/api/cars/').then(res => {
      setCars(res.data.cars)
    })
  }

  // Search & filter funnctions.......................................//
  const filteredCars = cars?.filter(car => {
    return search.toLowerCase() === '' ? car :
      car.car.toLowerCase().includes(search.toLowerCase()) ||
      car.car_model.toLowerCase().includes(search.toLowerCase()) ||
      car.car_vin.toLowerCase().includes(search.toLowerCase()) ||
      car.car_color.toLowerCase().includes(search.toLowerCase()) ||
      car.car_model_year.toString().includes(search.toString().toLowerCase()) ||
      car.price.toLowerCase().includes(search.toLowerCase())
  })

  const searchChangeHandle = (e) => {
    setSearch(e.target.value)
  }

  // Pagination ...............................................................// 
  const endOffset = carOffset + carsPerPage;
  const currentCars = filteredCars.slice(carOffset, endOffset);
  const pageCount = Math.ceil(filteredCars.length / carsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * carsPerPage) % filteredCars.length;
    setCarOffset(newOffset);
  };

  return (
    <div className="container">
      <CarsContext.Provider value={{ cars, setCars }}>
        <TextField type='search' className='col mt-3 mb-3' id="outlined-basic" variant="outlined" placeholder='Search...' onChange={searchChangeHandle} />
        <div className='table-responsive'>
          <table className="table text-center mb-0 pb-0">
            <TableHead />
            <TableBody cars={currentCars} />
          </table>
        </div>
        <AddModal />
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
          breakLinkClassName='break'
          marginPagesDisplayed={1} />
        
      </CarsContext.Provider>
    </div>
  );
}

export default App;
