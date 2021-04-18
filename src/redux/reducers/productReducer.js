const { FETCH_PRODUCTS } = require("../actionTypes");

export const productReducer = (state = {items: []}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        items: action.payload,
      };
    default:
      return state;
  }
};
