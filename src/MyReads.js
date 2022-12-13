import Bookshelf from "./Bookshelf";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";




const MyReads = ({books , onShelfChange}) => {
    return (<div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <Bookshelf title = "Currently Reading" bookshelfBooks={books.filter(book => book.shelf == 'currentlyReading')} onShelfChange = {onShelfChange} />
        <Bookshelf title = "Want to Read" bookshelfBooks={books.filter(book => book.shelf == 'wantToRead')} onShelfChange = {onShelfChange} />
        <Bookshelf title = "Read" bookshelfBooks={books.filter(book => book.shelf == 'read')} onShelfChange={onShelfChange} />
      </div>
    </div>
    <div className="open-search">
      <Link to='search'>Add a book</Link>
    </div>
  </div>);
}

MyReads.propTypes = {
    onShelfChange : PropTypes.func.isRequired, 
    books : PropTypes.array.isRequired,
}

export default MyReads; 