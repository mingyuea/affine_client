const initialState = {
	flickrData: [],
};

const rootReducer = (state = initialState, action) => {
	switch(action.type){
		case "NEW_DATA":
			return {...state, flickrData: action.payload};
		default:
			return state
	}
};

export default rootReducer;