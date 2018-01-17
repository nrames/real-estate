import React from 'react';
import axios from 'axios';
import { Form, List } from 'semantic-ui-react';

class FindHome extends React.Component {
  state = { agents: [], agent: '', buyers: [], buyer: '', properties: [] }

  componentDidMount() {
    axios.get('/api/agents')
      .then( res => this.setState({ agents: res.data }) )
  }

  showProperties = () => {
    const { properties } = this.state;
    return properties.map( p =>
    <List key={p.id}>
      <List.Content>
        <List.Header>${p.price} - {p.sq_ft}sqft.</List.Header>
        <List.Description>{p.city}</List.Description>
      </List.Content>
    </List>    
    )
  }

  getProperties = (e, { value }) => {
    this.setState({ buyer: value }, () => {
      axios.get(`/api/buyers/${this.state.buyer}`)
        .then( res => this.setState({ properties: res.data }) )
    })
  }

  buyerList = () => {
    const { buyers } = this.state;
    return buyers.map( buyer => {
      return { key: buyer.id, text: `${buyer.first_name} ${buyer.last_name}`, value: buyer.id }
    });
  }

  getBuyers = (e, { value }) => {
    this.setState({ agent: value }, () => {
      axios.get(`/api/agents/${this.state.agent}`)
        .then( res => this.setState({ buyers: res.data }) );
    });
  }

  agentList = () => {
    const { agents } = this.state;
    return agents.map( agent => {
      return { key: agent.id, text: `${agent.first_name} ${agent.last_name}`, value: agent.id }
    });
  }

  render() {
    return (
      <div>
        <Form.Select options={this.agentList()} onChange={this.getBuyers} />
        { this.state.agent &&
          <Form.Select
            label="Buyer"
            options={this.buyerList()}
            onChange={this.getProperties}
          />  
        }
        { this.state.properties.length > 0 && this.showProperties() }
      </div>  
    )
  }
}

export default FindHome;