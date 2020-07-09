import React from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";
import { compose } from "recompose";
import "./App.css";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

//Standard higher order function for components extracting data from a url
//also adds state which is destructured inside the APIList component for access
const withFetching = (url, query) => (Component) =>
  class withFetching extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hits: [],
        isLoading: false,
        error: null,
      };
    }
    async componentDidMount() {
      this.setState({ isLoading: true });
      try {
        const result = await axios.get(url + query);
        this.setState({
          hits: result.data.hits,
          isLoading: false,
        });
      } catch (error) {
        this.setState({
          error,
          isLoading: false,
        });
      }
    }
    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

//Higher order functions for conditional rendering
const withEither = (conditionalRenderFn, EitherComponent) => (Component) => (
  props
) =>
  conditionalRenderFn(props) ? <EitherComponent /> : <Component {...props} />;

const errorConditionFn = (props) => props.error != null;
const loadingConditionFn = (props) => props.isLoading;
const ErrorMessage = () => (
  <div>
    <p>Something went wrong...</p>
  </div>
);
const LoadingIndicator = () => <ContentLoader />;

const withConditionalRenderings = compose(
  withEither(errorConditionFn, ErrorMessage),
  withEither(loadingConditionFn, LoadingIndicator)
);

//Base component
const APIList = ({ hits, others }) => (
  <ul>
    {hits.map((hit) => (
      <li key={hit.objectID}>
        <a href={hit.url}>{hit.title}</a>
      </li>
    ))}
  </ul>
);

//Wrapping base component and rendering--add the conditional renderings first
const APIListWithConditionalRender = withConditionalRenderings(APIList);
const APIListWithConditionalRenderAndFetch = withFetching(
  API,
  DEFAULT_QUERY
)(APIListWithConditionalRender);
const App = () => (
  <div>
    <APIListWithConditionalRenderAndFetch />
  </div>
);

/*  replaced by combination of base class and HOC for data fetching
class APIList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get(API + DEFAULT_QUERY);
      this.setState({
        hits: result.data.hits,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }
  render() {
    const { hits, isLoading } = this.state;
    if (error) return <p>{error.message}</p>;
    if (isLoading) return <ContentLoader />;
    return (
      <ul>
        {hits.map((hit) => (
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        ))}
      </ul>
    );
  }
}*/

export default App;
