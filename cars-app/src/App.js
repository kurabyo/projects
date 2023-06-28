import './App.css';
import TableBody from './components/TableBody';
import TableHead from './components/TableHead';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './styles/pagination.css'

const carsPerPage = 10

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars()
  }, []);

  // Fetching data
  const getCars = async () => {
    await axios.get('https://myfakeapi.com/api/cars/').then(res => { setCars(res.data.cars) })
  }

  // Pagination
  const [carOffset, setCarOffset] = useState(0);

  const endOffset = carOffset + carsPerPage;
  console.log(`Loading cars from ${carOffset} to ${endOffset}`);
  const currentCars = cars.slice(carOffset, endOffset);
  const pageCount = Math.ceil(cars.length / carsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * carsPerPage) % cars.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setCarOffset(newOffset);
  };

  return (
    <div className="App">
      <table class="table">
        <TableHead />
        <TableBody cars={currentCars} />
      </table>
      <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
      }}
    >
      <ReactPaginate
      activeClassName={'item active '}
      breakClassName={'item break-me '}
      containerClassName={'pagination'}
      disabledClassName={'disabled-page'}
      marginPagesDisplayed={2}
      nextClassName={"item next "}
      pageClassName={'item pagination-page '}
      previousClassName={"item previous"}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null} />
          </div>
    </div>
  );
}

export default App;
