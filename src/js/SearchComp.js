import React from 'react';
import Style from '../scss/SearchComp.scss';

class SearchComp extends React.Component{
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSearch();
	}

	handleChange(e){
		let val = e.target.value;
		this.props.onChange(val);
	}

	render(){
		return(
			<div className={Style.wrapper} style={this.props.style}>
				<form onSubmit={this.handleSubmit}>
					<label>
						<input className={Style.inputCont} type="text" value={this.props.searchIn} onChange={this.handleChange} />
					</label>
					<div className={Style.btnCont}>
						<input type="submit" value="Search" />
					</div>
				</form>
			</div>
		)
	}
}

export default SearchComp;