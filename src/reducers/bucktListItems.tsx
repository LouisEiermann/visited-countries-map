export const reducer = (state, action) => {
  switch (action.type) {
    case "add_all":
      return {
        ...state,
        items: action.payload,
      };
    case "add":
      return {
        ...state,
        items: state.items.concat(action.payload),
      };
    case "remove":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "update":
      return {
        ...state,
        items: state.items
          .filter((item) => item.id !== action.payload._id)
          .concat([action.payload]),
      };

    default:
      return state;
  }
};

export const initialState = {
  items: [],
};
