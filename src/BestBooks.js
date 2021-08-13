import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Book from './screens/Book'
import Bookmodel from './compnents/Bookmodel'
import Button from 'react-bootstrap/Button';


export class BestBooks extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          userEmail: 'mahmoud@gmail.com',
          books: [],
      }
  }

  componentDidMount = async () => {
}

showAddForm = (boolean) => {
    this.setState({
        showForm: boolean,
    });
}


handleAddBook = async (e) => {
    e.preventDefault();
    let potato = "Not available";
    if (e.target.status.checked) {
        potato = 'Available';
    }

    let requestBody = {
        email: this.state.userEmail,
        book: {
            name: e.target.bookName.value,
            description: e.target.description.value,
            status: 'good'
        }
    }

    await axios.post(`${process.env.REACT_APP_URL}/book`, requestBody)
        .then(response => {
            console.log(response.data);
            this.setState({
                books: response.data.books,
            })
        })
        .catch(error => alert(error.message))
}

handleDelete = async (index, event) => {
    event.preventDefault();
    console.log(index);
    await axios.delete(`${process.env.REACT_APP_URL}/book/${index}?email=${this.state.userEmail}`).then(response => {
        this.setState({
            books: response.data.books,
        })
    })
        .catch(error => alert(error.message))

}

handleUpdate = async (index, e) => {
    e.preventDefault();
    console.log(index);
    let potato = "Not available";
    if (e.target.status.checked) {
        potato = 'Available';
    }
    let reqBody = {
        email: this.state.userEmail,
        book: {
            name: e.target.bookName.value,
            description: e.target.description.value,
            status: potato
        }

    }
    console.log(reqBody);
    await axios.put(`${process.env.REACT_APP_URL}/book/${index}`, reqBody).then(response => {
        this.setState({
            books: response.data.books,
        })
    })
        .catch(error => alert(error.message))

}
   

render() {
    return (
        <div>
            <Button variant="primary" size="sm" onClick={() => this.showAddForm(true)} >
                Add Book
            </Button>
            <br /><br />

            {
                <Bookmodel show={this.state.showForm} onHide={() => this.showAddForm(false)} handleAddBook={this.handleAddBook} />
            }

            {
                this.state.books.length > 0 &&
                this.state.books.map((obj, ind) => <Book key={this.state.books[ind].name} bookData={this.state.books[ind]} index={ind} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />)
            }
        </div>
    )
}
}

  export default withAuth0(BestBooks);

