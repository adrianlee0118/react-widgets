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

class APIList extends React.Component {
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
      .get(API + DEFAULT_QUERY)
      .then((result) =>
        this.setState({
          hits: result.data.hits,
          isLoading: false,
        })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    return (
      <ul>
        {this.state.hits.map((hit) => (
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        ))}
      </ul>
    );
  }
}

const withConditionalRenderings = compose(
  withEither(errorCond, errorIndicator),
  withEither(loadingCond, loadingIndicator)
);
const APIListWithCondRend = withConditionalRenderings(APIList);

const App = () => (
  <div>
    <APIListWithCondRend />
  </div>
);

export default App;
