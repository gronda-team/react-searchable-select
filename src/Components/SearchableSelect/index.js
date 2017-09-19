import React from 'react';
import PropTypes from 'prop-types';

// styled components
import Wrapper from './Components/Wrapper';
import Tag from './Components/Tag';
import Item from './Components/Item';
import ScrollArea from './Components/ScrollArea';
import Input from './Components/Input';
import ClearButton from './Components/ClearButton';
import ScrollList from './Components/ScrollList';

// clickoutside component
import onClickOutside from 'react-onclickoutside';

class SearchableSelect extends React.Component {
	constructor() {
		super();

		this.state = {
			text: '',
			fullList: [],
			searchList: [],
			listVisibile: false,
		};

		this.openList = this.openList.bind(this);
	}

	componentWillMount() {
		this.setState({ searchList: this.props.list, fullList: this.props.list });
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.list.length !== nextProps.list.length)
			this.setState({ fullList: nextProps.list, searchList: nextProps.list });
	}

	renderList() {
		const noResult = this.list.length < 1;
		const searchTextExist = this.state.text.length > 0;

		if (noResult && searchTextExist)
			return this.renderNoResult();
		else
			return this.renderSearchList();
	}

	renderNoResult() {
		return (
			<Item>
				{this.props.noResult}
			</Item>
		)
	}

	renderSearchList() {
		return this.list.map((item, i) => (
			<Item 
                key={"_item"+i} 
				onClick={() => this.onClick(item)}
            >
				{item.label}
			</Item>
		));
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

	handleClickOutside(e){
    	this.toggleOpen(false);
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
    	//remove the already selected items from the actual list
    	this.list = this.state.searchList.filter(x => this.props.value.findIndex(item => item.value === x.value) < 0)
    }

    openList() {
    	this.toggleOpen(true);
    }

    toggleOpen(listVisibile){
    	this.setState({ listVisibile });
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
							onFocus={this.openList}
					/>
					<ClearButton 	
						type="button" 
						onClick={() => this.handleSearch("")}>
						X
					</ClearButton>
				</div>
				{ this.state.listVisibile &&
					<ScrollArea>
						<ScrollList>
							{ this.props.empty ?
								<Item>Wähle zuerst einen Bereich aus.</Item> :
								this.renderList() } 
						</ScrollList> 
					</ScrollArea> }
			</Wrapper>
			)
	}

}

export default onClickOutside(SearchableSelect);

SearchableSelect.propTypes = {
	noResult: PropTypes.string,
}

SearchableSelect.defaultProps = {
	noResult: 'No Result',
}