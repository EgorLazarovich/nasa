import axios from 'axios';
import React, { Component } from 'react';
import { API_KEY, URL_LIST_ITEM } from '../constants';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Details extends Component {
    state = {
        isLoading: true,
        data: { orbital_data: {} }
    };

    componentDidMount() {
        this.loadData();
    }

    componentWillUnmount() {
        this.clearQuery();
    }

    loadData() {
        this.clearQuery();
        this.setState({ isLoading: true });

        const self = this;
        const dataId = this.props.match.params.id;
        this.query = axios.get(`${URL_LIST_ITEM}${dataId}`, {
            params: {
                api_key: API_KEY
            }
        }).then(({ data }) => {
            this.setState({ isLoading: false });
            self.setState({ data });
        }, () => {
            self.props.history.push('/NotFound');
        });
    }

    clearQuery() {
        if (this.query && this.query.abort) {
            this.query.abort();
        }
        this.query = null;
    }

    getFieldsTemplate() {
        const {
            name,
            absolute_magnitude_h,
            orbital_data: {
                orbit_determination_date,
                equinox,
                inclination
            }
        } = this.state.data;

        let formItemKey = 0;
        return [
            { label: 'Name', value: name },
            { label: 'Absolute magnitude', value: absolute_magnitude_h },
            { label: 'Orbit determination date', value: orbit_determination_date },
            { label: 'Equinox', value: equinox },
            { label: 'Inclination', value: inclination }
        ].map(({ label, value }) => {
            formItemKey++;
            return (
                <FormGroup key={formItemKey}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl.Static style={{ paddingLeft: 20}}>{value}</FormControl.Static>
                </FormGroup>
            );
        });
    }

    render() {
        const contentTemplate = this.state.isLoading ?
            <h3>Loading...</h3>
            : this.getFieldsTemplate();

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={12}>
                            <form>
                                {contentTemplate}
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}
