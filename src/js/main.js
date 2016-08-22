import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/styles.css';

class App extends Component {

	render() {
		const { props } = this;
		return (<p>Hellos {props.world}!</p>);
	}
}

render(<App world="earth"/>, document.getElementById('app'));
