import Book from "./Book";
import PropTypes from "prop-types";


const Bookshelf = ({title , bookshelfBooks , onShelfChange}) => {
    return (<div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {bookshelfBooks.map(book => {
            return <Book key={book.id} book = {book} onShelfChange = {onShelfChange} />
        })}
      </ol>
    </div>
  </div>); 
}

Bookshelf.propTypes = {
    onShelfChange : PropTypes.func.isRequired, 
    bookshelfBooks : PropTypes.array.isRequired,
    title : PropTypes.string.isRequired
}

export default Bookshelf;