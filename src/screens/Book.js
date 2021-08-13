import React, { Component } from 'react';

export class Book extends Component {
  render() {
    console.log(this.props.data);
    return (
      <div>
        {this.props.data.map((e) => {
          return (
            <>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <p>{e.status}</p>
              <p>{e.email}</p>
            </>
          );
        })}
      </div>
    );
  }
}

export default Book;
