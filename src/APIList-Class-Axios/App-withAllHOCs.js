import React from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";
import "./App.css";
import { compose } from "recompose";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

//HOCs for conditional render
const withEither = (conditionFn, EitherComp) => (Comp) => (props) =>
  conditionFn(props) ? <EitherComp /> : <Comp {...props} />;
const errorCond = (props) => props.error != null;
const loadingCond = (props) => props.isLoading;
const errorIndicator = () => (
  <div>
    <p>Something went wrong ...</p>
  </div>
);
const loadingIndicator = () => <ContentLoader />;

//HOC for data fetching, takes arguments url and query and returns a function that takes a component and gives it state and data fetching capabilities in the mount phase
const withFetching = (url, query) => (Comp) =>
  class withFetching extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hits: [],
        isLoading: false,
        error: null,
      };
    }
    componentDidMount() {
      this.setState({ isLoading: true });
      axios
        .get(url + query)
        .then((result) =>
          this.setState({ hits: result.data.hits, isLoading: false })
        )
        .catch((error) => this.setState({ error, isLoading: false }));
    }
    render() {
      return <Comp {...this.props} {...this.state} />;
    }
  };

//Base component only looks after the render
const APIList = ({ hits, others }) => (
  <ul>
    {hits.map((hit) => (
      <li key={hit.objectID}>
        <a href={hit.url}>{hit.title}</a>
      </li>
    ))}
  </ul>
);

//Compose conditional renderings together, wrap the component in them first, then in data fetching HOC
const withConditionalRenderings = compose(
  withEither(errorCond, errorIndicator),
  withEither(loadingCond, loadingIndicator)
);
const APIListWithCondRend = withConditionalRenderings(APIList);
const APIListWithCondRendAndFetching = withFetching(
  API,
  DEFAULT_QUERY
)(APIListWithCondRend);

const App = () => (
  <div>
    <APIListWithCondRendAndFetching />
  </div>
);

export default App;
