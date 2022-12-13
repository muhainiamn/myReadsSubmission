
import PropTypes from "prop-types";

const Book = ({book , onShelfChange}) => {
    return ( 
    <li>
    <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage:
            book.imageLinks ? 'url("' + book.imageLinks.thumbnail + '")' : undefined
        }}
      ></div>
      <div className="book-shelf-changer" >
        <select value={book.shelf  ? book.shelf : 'none'} onChange = {(event) => onShelfChange(event , book) }  >
          <option  disabled>
            Move to...
          </option>
          <option value="currentlyReading">
            Currently Reading
          </option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors && book.authors.join(',')}</div>
  </div></li>) ; 
}

Book.propTypes = {
    onShelfChange : PropTypes.func.isRequired, 
    book : PropTypes.object.isRequired
}

export default Book ; 