import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default class Filter extends Component {

    static props = {
        onChange() {}
    };

    onChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <FormGroup>
                <FormControl placeholder="Filter by name" type="text" onChange={this.onChange.bind(this)}/>
            </FormGroup>
        )
    }
}
