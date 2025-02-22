import React from "react";
import ThemeProvider from "../../contexts/themeContext";
import GlobalStyle from "../../theme/global";
import { Wrapper, Main } from "./style";
import AppBar from "../AppBar/AppBar";
import VisitedCountryContextProvider from "../../contexts/visitedCountryContext";
import { BucketListItemsProvider } from "../../contexts/bucketListItemsContext";
import MapContainer from "../MapContainer/MapContainer";
import SearchContainer from "../SearchContainer/SearchContainer";
import SummaryBox from "../SummaryBox/SummaryBox";
import Accordions from "../Accordions/Accordions";
import Bucketlist from "../Bucketlist/Bucketlist";

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppBar />
      <Wrapper>
        <VisitedCountryContextProvider>
          <Main>
            <SearchContainer />
            <SummaryBox />
            <MapContainer />
            <Accordions />
          </Main>
        </VisitedCountryContextProvider>
      </Wrapper>
      <Wrapper>
        <BucketListItemsProvider>
          <Bucketlist />
        </BucketListItemsProvider>
      </Wrapper>
    </ThemeProvider>
  );
};
export default App;
