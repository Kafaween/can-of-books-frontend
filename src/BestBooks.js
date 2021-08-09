import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Book from './screens/Book'


export class BestBooks extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          userEmail: 'mahmoud@gmail.com',
          books: [],
      }
  }

  componentDidMount = async () => {
      await axios.get(`${process.env.REACT_APP_URL}/books?email=${this.state.userEmail}`).then(response => {
          console.log(response);
          this.setState({
              books: response.data[0].books,
          })
      }).catch(error => {
          console.log(error.message);
      });
    }

  render() {
      return (
          <div>
              {
                  this.state.books.length>0 && 
                  this.state.books.map((value,indx) => <Book key={this.state.books.name} bookData={this.state.books[indx]} />)  
              }
          </div>
      )
  }
}

  export default withAuth0(BestBooks);

