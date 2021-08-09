import React, { Component } from 'react';

export class Book extends Component {
  render() {
    console.log(this.props.dd);
    return (
      <div>
        <h3>{this.props.dd.title}</h3>
        <p>{this.props.dd.description}</p>
        <p>{this.props.dd.status}</p>
        <p>{this.props.dd.email}</p>
      </div>
    );
  }
}

export default Book;
