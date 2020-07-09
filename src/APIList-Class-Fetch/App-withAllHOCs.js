import React from "react";
import ContentLoader from "react-content-loader";
import { compose } from "recompose";
import "./App.css";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

//Higher order function wrapping to isolate conditional rendering logic
const withEither = (conditionalRenderFn, EitherComponent) => (Component) => (
  props
) =>
  conditionalRenderFn(props) ? <EitherComponent /> : <Component {...props} />;

const LoadingIndicator = () => <ContentLoader />;
const ErrorMessage = () => (
  <div>
    <p>Something went wrong...</p>
  </div>
);
const isLoadingConditionFn = (props) => props.isLoading;
const errorConditionFn = (props) => props.error != null;

const withConditionalRenderings = compose(
  withEither(isLoadingConditionFn, LoadingIndicator),
  withEither(errorConditionFn, ErrorMessage)
);

//HOC for data fetch
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
      fetch(url + query)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("Something went wrong...");
        })
        .then((data) => this.setState({ hits: data.hits, isLoading: false }))
        .catch((error) => this.setState({ error, isLoading: false }));
    }
    render() {
      return <Comp {...this.props} {...this.state} />;
    }
  };

const APIList = ({ hits, others }) => (
  <ul>
    {hits.map((hit) => (
      <li key={hit.objectID}>
        <a href={hit.url}>{hit.title}</a>
      </li>
    ))}
  </ul>
);

const APIListWithConditionalRendering = withConditionalRenderings(APIList);
const APIListWithCondRendAndFetching = withFetching(
  API,
  DEFAULT_QUERY
)(APIListWithConditionalRendering);
const App = () => (
  <div>
    <APIListWithCondRendAndFetching />
  </div>
);

export default App;
