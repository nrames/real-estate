import React from 'react';
import { Form, Table } from 'semantic-ui-react';
import axios from 'axios';

const cities = [
  'Sandy',
  'Draper',
  'SLC',
  'Orem',
  'Provo',
  'Ogden',
  'Layton',
  'Midvale',
  'Murray,'
]

const options = cities.map( c => { return { key: c, text: c, value: c }} )

class Cities extends React.Component {
  state = { city: null, properties: [], page: 1, total_pages: 0 }

  handleChange = (e, {value}) => {
    this.setState({ city: value, properties: [] }, () => {
      this.getProperties();
    });
  }

  getProperties = () => {
    const { city, page } = this.state;
    axios.get(`/api/cities/${city}?page=${page}`)
      .then( res => {
        const { properties, total_pages } = res.data;
        this.setState({
          properties: [...this.state.properties, ...properties],
          total_pages,
          page: page + 1 
        });
      })
  }
}

export default Cities;