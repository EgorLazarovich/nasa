import React, { Component } from 'react';
import axios from 'axios';
import { API_KEY, URL_LIST_ITEMS } from '../constants';
import { Pagination, Grid, Row, Col } from 'react-bootstrap';
import List from './List'
import Filter from '../Filter'

export default class MainLayout extends Component {

    state = {
        isLoading: true,
        filterValue: '',
        currentPage: 1,
        pagesCount: 1,
        listData: {}
    };

    componentDidMount() {
        this.loadListData();
    }

    componentWillUnmount() {
        this.clearQuery();
    }

    loadListData() {
        this.clearQuery();
        this.setState({ isLoading: true });

        const self = this;
        this.query = axios.get(URL_LIST_ITEMS, {
            params: {
                page: this.state.currentPage,
                api_key: API_KEY
            }
        }).then(({ data: asteroids }) => {
            self.setState({
                listData: asteroids.near_earth_objects,
                isLoading: false,
                pagesCount: asteroids.page ? asteroids.page.total_pages : 1
            });
        }, () => {
            self.setState({ listData: [] });
        });
    }

    clearQuery() {
        if (this.query && this.query.abort) {
            this.query.abort();
        }
        this.query = null;
    }

    onChangePage(currentPage) {
        this.setState({ currentPage }, () => {
            this.loadListData();
        });
    }

    onChangeFilter(filterValue) {
        this.setState({ filterValue })
    }

    getFilteredListData() {
        const { listData, filterValue } = this.state;
        return !filterValue ?
            listData
            : listData.filter(({ name }) => (name.indexOf(filterValue) >= 0));
    }

    getLoadingTemplate() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12} style={{
                        height: '500px',
                        textAlign: 'center'
                    }}>
                        <h3>Loading...</h3>
                    </Col>
                </Row>
            </Grid>
        );
    }

    render() {
        const { currentPage, isLoading } = this.state;
        if (isLoading) {
            return this.getLoadingTemplate();
        }

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={4}>
                        <Filter onChange={this.onChangeFilter.bind(this)} />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <List data={this.getFilteredListData()}/>
                    </Col>
                </Row>

                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <Pagination
                            items={this.state.pagesCount}
                            maxButtons={5}
                            activePage={currentPage}
                            onSelect={this.onChangePage.bind(this)} />
                    </Col>
                </Row>

            </Grid>
        );
    }
}
