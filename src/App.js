import React from 'react';
import Header from './Components/Header';
import SearchableSelect from './Components/SearchableSelect';
import styled from 'styled-components';

const styles = {
	main: {
		width: 1000,
		margin: "0px auto"
	}
}

const list = [
	{
		label: "something",
		value: 1
	},
	{
		label: "else",
		value: 3
	},
	{
		label: "item",
		value: 4
	},
	{
		label: "another",
		value: 5
	},
	{
		label: "oneee",
		value: 6
	},
	{
		label: "moreee",
		value: 34
	},
	{
		label: "andmoreee",
		value: 34
	},
	{
		label: "andmoree",
		value: 46
	}
]

const Wrapper = styled.div`
	background-color: white;
	padding: 50px;
	margin-top: 50px;
`;

class App extends React.Component {

	constructor(){
		super();

		this.state = {
			value: []
		}

		this._onChange = this._onChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	_onChange(value){
		this.setState({ value })
	}

	handleSearch(searchValue){
		this.setState({ searchValue })	
	}
 
	render(){

		return (
			<div style={styles.main}>
				<Header />
				<Wrapper style={{display: "flex", justifyContent: "center"}}>
					<SearchableSelect 
						onChange={this._onChange}
						value={this.state.value}
						list={list}
						placeholder="Search..."
					/>
				</Wrapper>
			</div>
			)

	}
    
}

export default App;