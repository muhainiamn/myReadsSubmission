import {Link} from 'react-router-dom';
import Book from './Book';
import {useState} from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from "prop-types";

var isEmpty = true ; 

const SearchBooks = ({onShelfChange , books}) => {
    const [query , setQuery] = useState('');
    const [results , setResults] = useState([]);

    /**
     * Updates the book and the state of the books in this component 
     * @param {object} event event containing the new shelf value 
     * @param {object} book the updated book
     */
    const updateShelf = (event , book) => {
        let newShelf = event.target.value; 
        onShelfChange(event , book , () => {
            setResults(results.map(result => result.id == book.id ? {...result , shelf : newShelf} : result));
        });
    }
    /**
     * Updates the query and makes an API call to search from the books in the database , then updates the state of this component
     * @param {object} event event containing the new query 
     */
    const onChangeQuery = (event) => {
        let newQuery = event.target.value ;
        setQuery(newQuery);
        if(newQuery != ''){
            isEmpty = false ;
        let search = async () => {
            await BooksAPI.search(newQuery , 1000).then((res) => {
            if(!isEmpty ){
            
            if(!res.error){
                res = res.map(book => {
                    let myBook = books.find(libraryBook => libraryBook.id == book.id);
                    return myBook ? {...book , shelf : myBook.shelf} : book ; 
                }) ; 
            }
            setResults(res);
            }
            } 
            );
        }
        

        search(); 
    }
    else {
        setResults([]);
        isEmpty = true ; 
    }

        
    }
    return (<div className="search-books"><div className="search-books-bar">
    <Link to='/'
      className="close-search"
    >
      Close
    </Link>
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title, author, or ISBN"
        value = {query}
        onChange = {onChangeQuery}
      />
    </div>
  </div>
  <div className="search-books-results">
    <ol className="books-grid">
    {!results.error && results.map(book => {
            return <Book key={book.id} book = {book} onShelfChange = {(event => {updateShelf(event , book)})} />
        })}
    </ol>
  </div>
</div>);
}

SearchBooks.propTypes = {
    onShelfChange : PropTypes.func.isRequired, 
    books : PropTypes.array.isRequired
}

export default SearchBooks; 