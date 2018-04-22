import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
        }
    }

    componentDidMount() {
        console.log(Urls);
        fetch(Urls['api:books:list']())
            .then(response => response.json())
            .then(data => this.setState({books: data}))
    }

    render() {
        return (
            <div>
                <h1>Books</h1>
                <ul>
                    {this.state.books.map(book =>
                        <li>{book.title}</li>
                    )}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(
    <BookList />
    ,
    document.getElementById('react-root')
);