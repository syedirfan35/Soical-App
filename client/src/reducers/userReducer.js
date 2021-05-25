import { FIND_PEOPLE } from "../actions/types";

const initialState = {
  findPeople: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PEOPLE:
      return {
        ...state,
        findPeople: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
