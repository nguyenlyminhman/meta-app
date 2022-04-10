import * as actionTypes from './type';
const initialState = {
    filterSort: '',
    filterPrice: '',
    isPriceClick: false,
    isSortClick: false,
}; //Initial state of the search

export const getFilterValue = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.GET_FILTER_SORT_VALUE:
            return {
                ...state,
                filterSort: action.payload.sortValue
            };
        case actionTypes.GET_FILTER_PRICE_VALUE:
            return {
                ...state,
                filterPrice: action.payload.priceValue,
            };
        default: return state;
    }
};
