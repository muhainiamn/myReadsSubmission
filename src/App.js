import "./App.css";
import { useState , useEffect} from "react";
import * as BooksAPI from './BooksAPI';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import MyReads from "./MyReads";
import SearchBooks from "./SearchBooks";

function App() {
  const [books , setBooks] = useState([]);

  /**
   * Function to update a specific book with a new shelf status
   * @param {object} event the event that contains the changed value 
   * @param {object} bookChanged 
   * @param {function} callback executes after the update is done successfully 
   */
  const onShelfChange = (event , bookChanged , callback) => {
    let newShelf = event.target.value; 
    let updateShelf = async () => {
      await BooksAPI.update(bookChanged , newShelf).then(() => {
        if(books.find(book => book.id == bookChanged.id)){
        setBooks(books.map(book => book.id == bookChanged.id ? {...book , shelf : newShelf} : book));
        }
        else {
          setBooks([...books , {...bookChanged , shelf : newShelf}]);
        }
        if(callback != null){
        callback(); 
        }
      });
    }

      updateShelf();

  }
  useEffect(() => {

    let getBooksFromDatasource = async () => {
      await BooksAPI.getAll().then((res) => {
        setBooks(res);
      })
    }
    getBooksFromDatasource(); 
  }
     , []);
  

  return (
    <BrowserRouter>
    <div className="app">
      <Routes>
        <Route path="search" element = {<SearchBooks  onShelfChange = {onShelfChange} books = {books}/>} />
        <Route path="/" element = {<MyReads books = {books} onShelfChange = {onShelfChange} />}/>
        </Routes >
        
        
      
        
    </div>
    </BrowserRouter>
  );
}

export default App;
