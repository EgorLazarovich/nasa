import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <ListGroup>
                <ListGroupItem>
                    <Link to="/Details/1111">qqq</Link>
                </ListGroupItem>
                <ListGroupItem>Item 2</ListGroupItem>
                <ListGroupItem>...</ListGroupItem>
            </ListGroup>
        )
    }
}
