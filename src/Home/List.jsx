import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ({ data = [] }) {
    const listItems = [];
    let listItemKey = 0;
    data.forEach(({ name, neo_reference_id: id }) => {
        const detailsLink = `/Details/${id}`;
        listItems.push(
            <ListGroupItem key={listItemKey}>
                <Link to={detailsLink}>{name}</Link>
            </ListGroupItem>
        );
        listItemKey++;
    });

    return <ListGroup>{listItems}</ListGroup>;
}
