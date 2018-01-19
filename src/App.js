import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
	state = {
  	cards : []
  }
  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    	cards : prevState.cards.concat(cardInfo)
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <div>
    		    <Form onSubmit={this.addNewCard}/>
      	    <CardList cards={this.state.cards} />
    	    </div>
      </div>
    );
  }
}

const Card = (props) => {
	return (
		<div className='Card'>
    	<img alt="" width="75" src={props.avatar_url} />
      <div>
      	<div>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
	);
};

const CardList = (props) =>{
	return (
  	<div>
			{props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  )
}

class Form extends React.Component {
	state = { userName: '' }
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then (resp =>{
      	this.props.onSubmit(resp.data);
        this.setState({userName : ''})
      });
  }
	render(){
  	return (
    	<form className='AppForm' onSubmit={this.handleSubmit}>
    	  <input type="text" 
					value= {this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value})}
        	placeholder="Github username" required />
        <button type="submit">Add card</button>
    	</form>
    )
  }
}

export default App;
