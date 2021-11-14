import React from "react";
import { reducer, initialState } from "../reducers/bucktListItems";

export const BucketListItemsContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const BucketListItemsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    // @ts-ignore
    <BucketListItemsContext.Provider value={[state, dispatch]}>
      {children}
    </BucketListItemsContext.Provider>
  );
};
