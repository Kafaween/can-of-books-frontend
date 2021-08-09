import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Book from './screens/Book';

export class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount = async () => {
    const { user, isAuthenticated } = this.props.auth0;
    await axios
      .get(`${process.env.REACT_APP_SERVER}/books?email=${user.email}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    return <div>{this.state.data.title && <Book dd={this.state.data} />}</div>;
  }
}

export default withAuth0(BestBooks);
