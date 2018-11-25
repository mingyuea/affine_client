import React from 'react';
import SearchComp from './SearchComp.js';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Style from '../scss/MapCont.scss';


const mapStyles = {
	width: '100%',
	height: '100%',
}

class MapCont extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			'latlng': {},
			'searchVal': "",
			'serverURL': "http://127.0.0.1:5000/",
			'response': "",
			'mapMount': false,
			'serverErr': null,
			'formatAdd': ''
		}

		this.fetchPlaces = this.fetchPlaces.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.inputChange = this.inputChange.bind(this);
	}

	inputChange(inVal){
		this.setState({
			"searchVal": inVal
		});
	}

	handleSearch(){
		let searchObj = {}
		let url = this.state.serverURL+'operations/search';
		searchObj['searchVal'] = this.state.searchVal;

		fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(searchObj)
		})
		.then(res => res.json())
		.then(data => {
			if(data.searchSuccess){
				this.setState({
					'response': data.searchRes,
					'serverErr': null
				});

				return true;
			}
			else{
				this.setState({
					'serverErr': data.searchErr
				});

				return false
			}
		})
		.then(resBool => {if(resBool){
					this.fetchPlaces()
				}
		})
	}


	fetchPlaces(){
		let address = this.state.response;
		const service = new google.maps.Geocoder().geocode({'address': address}, (res, status) => {
			if (status == 'OK'){
				console.log(res[0]);
				this.setState({
					'latlng': res[0].geometry.location,
					'formatAdd': res[0].formatted_address
				})
			}
			else{
				alert('Geocode failed: '+ status);
			}
		})
	}

	render(){
		let infoRender;
		if(this.state.serverErr){
			infoRender = <div className={Style.err}>{this.state.serverErr}</div>
		}
		else{
			infoRender = <div className={Style.resInfo}>{this.state.formatAdd}</div>
		}

		return(
			<div>
				
				<SearchComp onSearch={this.handleSearch} onChange={this.inputChange} searchIn={this.state.inVal} />
				{infoRender}
				<div className={Style.mapDiv}>
				<Map google={this.props.google} zoom={14} style={mapStyles} center={this.state.latlng} >
					<Marker position={this.state.latlng} />
				</Map>
				</div>
			</div>
		)
	}
}

export default GoogleApiWrapper({
  apiKey: ('')
})(MapCont);