import './App.css';
import BasicLayout from 'components/layout/BasicLayout';
import { Route, useLocation } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { Loading as LoadingAnimation } from 'components/animation/Animations';
import { Font1 } from 'components/styled/Font';

const HomeView = lazy(() => import("view/Home"));
const PositionResultView = lazy(() => import("view/PositionResult"));
const SearchResultView = lazy(() => import("view/SearchResult"));
const CitySearchResultView = lazy(() => import("view/CitySearchResult"));
const BusView = lazy(() => import("view/Bus"));
const GPSView = lazy(() => import("view/GPS"));
const DetailView = lazy(() => import("view/Detail"));


const BigLoadingAnimation = styled(LoadingAnimation)`
    width: 200px;
    height: 200px;
`
const LoadingContent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Label = styled.h3`
  ${Font1}
`

function App() {
  return (
    <Suspense fallback={
      <LoadingContent>
        <BigLoadingAnimation />
        <Label>Loading ...</Label>
      </LoadingContent>}
    >
      <BasicLayout>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/home" component={HomeView} />
        <Route exact path="/searchResult" component={SearchResultView} />
        <Route exact path="/citySearchResult" component={CitySearchResultView} />
        <Route exact path="/positionResult" component={PositionResultView} />
        <Route exact path="/bus" component={BusView} />
        <Route exact path="/gps" component={GPSView} />
        <Route exact path="/detail" component={DetailView} />
      </BasicLayout>
    </Suspense>
  );
}

export default App;
