import React, { error } from "react";
import ContentLoader from "react-content-loader";
import "./App.css";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

const App = () => (
  <div>
    <APIList />
  </div>
);

class APIList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  //Functions that run after initial rendering with default state
  //These are tantamount to an asynchronous call (remmber: componentDidMount is an ideal place to make async calls)
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API + DEFAULT_QUERY)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Something went wrong...");
      })
      .then((data) => this.setState({ hits: data.hits, isLoading: false }))
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    const { hits, isLoading } = this.state;
    if (error) return <p>{error.message}</p>; //Conditional render statements if there is an error or if still loading
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
}

export default App;
