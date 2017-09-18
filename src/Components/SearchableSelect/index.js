import React from 'react';
import styled from 'styled-components';

//styled components
import Wrapper from './Components/Wrapper';

/*
	TODO: don't only return the selected item, but return the full state of the selected items !!!!!!
*/

const styles = {
	list: {
		listStyle: "none",
		webkitMarginAfter: "0",
		webkitMarginBefore: "0",
		padding: 0
	},
	item_selected: {
		paddingLeft: 5,
    	color: "white", 
    	backgroundColor: "rgba(0, 150, 110, 0.8)"
	},
	input: {
		height: 22,
	}
}

const Tag = styled.button`
	background-color: rgba(0, 150, 110, 0.8);
	color: #FFF;
	border: none;
    border-radius: 3px;
    margin: 1px;
    cursor: pointer;
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;

    &:after {
    	content: "x";
    	padding: 0px 5px;
    }
`;

const Clear = styled.button`
	background: none;
	background-color: #fff;
	border: none;
	margin-top: 10px;
	outline: none;

	&:focus {
		outline: none;
	}
`;

const Input = styled.input`
	height: 25px;
	margin-top: 10px;
    width: 100%;
    border: none;
    border-radius: 0px;
    padding-left: 5px;
    font-size: 16px;
	
	&:focus {
		outline-width: 0;
	}
`;

const Item = styled.li`
	padding: 5px;
    color: #76838f;
    font-size: 16px;
    padding-bottom: 2px;
    cursor: pointer;
    -webkit-transition: background-color 0.2s;
    transition: background-color 0.2s;
`;

const Scroll = styled.div`
	overflow-y: scroll;
	height: auto;
	max-height: 120px;
    background-color: #f3f7f9;

    &::-webkit-scrollbar {
	    width: 12px;
	}
	 
	&::-webkit-scrollbar-track {
	    backrgound-color: rgb(241, 241, 241); 
	}
	 
	&::-webkit-scrollbar-thumb {
	    background-color: rgb(193, 193, 193);
	}

`;

class SearchableSelect extends React.Component {

	constructor(){
		super();

		this.state = {
			text: "", 
			fullList: [],
			searchList: [],
			open: false
		}
	}

	componentWillMount(){
		this.setState({ searchList: this.props.list, fullList: this.props.list })
	}

	componentWillReceiveProps(nextProps){
		if(this.props.list.length !== nextProps.list.length)
			this.setState({ fullList: nextProps.list, searchList: nextProps.list })
	}

	renderListItem(item, i){
		return (
			<Item key={"_item"+i} 
				onClick={() => this.onClick(item)}>
				{item.label}
			</Item>
			)
	}

	onClick(item, selected){
		//check if the clicked item was selected or not, toggle the item, and return the selected values arra, as props.value
		const newValue = selected ?
			this.props.value.filter(x => x.value !== item.value) : //remove the already selected item from the values, or if it wasn't selected yet
			[...this.props.value, ...[item]]; //return the concated value to the parent
		//send the new value to parent
		this.props.onChange(newValue);
		//clear the search input field
		this.handleSearch("");
	}

	handleSearch(e){
		const lower = e.toLowerCase()
        const list = this.state.fullList.filter(x =>
            x.label.toLowerCase().indexOf(lower) > -1 && (this.props.value.findIndex(item => item === x.value) < 0) 
        )
		this.setState({ text: e, searchList: list})
	}

	//function to sort the list ascending
    compareNames(a, b){
        if(a.label < b.label)
            return -1;
        if(a.label > b.label)
            return 1;

        return 0;
    }

    handleSortLists(){
    	this.props.value.sort(this.compareNames);
		this.props.list.sort(this.compareNames);
    }

    handleListFiltering(){
    	this.list = this.state.searchList.filter(x => this.props.value.findIndex(item => item.value === x.value) < 0)
    }

    toggleList(){
    	this.setState({ open: true });
    }

	render(){

		//sort both lists every time, when rendering
		this.handleSortLists();

		//filters the shown list before each render, so user only sees the unchosen options
		this.handleListFiltering();

		return (
			<Wrapper>
				<div>
					{ this.props.value.map((item, i) => {
							return <Tag key={"_tag"+i} onClick={() => this.onClick(item, true)}>{item.label}</Tag>
						})	
					}
				</div>
				<div style={{ display: "flex" }}>
				    <Input 	type="text" 
				    		placeholder={this.props.placeholder || "Search..."}
							value={this.state.text}
							onChange={(e) => this.handleSearch(e.target.value)}
							onFocus={() => this.toggleList()}
					/>
					<Clear 	type="button" 
							onClick={() => this.handleSearch("")}>X</Clear>
				</div>
				{ this.state.open &&
					<Scroll >
						<ul style={ styles.list }>
							{ this.props.empty ?
								<li style={ styles.item }>Wähle zuerst einen Bereich aus.</li> :
								this.list.map((item, i) => {
									return this.renderListItem(item, i);
								})} 
						</ul> 
					</Scroll> }
			</Wrapper>
			)
	}

}

export default SearchableSelect;