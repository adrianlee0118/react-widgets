import React, { error } from "react";
import axios from "axios";
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
    axios
      .get(API + DEFAULT_QUERY) //axios GET request (change to post for POST), don't need to check result.ok because catch() handles all errors in axios
      .then((result) =>
        this.setState({
          hits: result.data.hits, //no '.json()'; axios returns data in json form
          isLoading: false,
        })
      )
      /*fetch(API + DEFAULT_QUERY)     //Fetch API method comparison, same catch statement
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Something went wrong...");
      })
      .then((data) => this.setState({ hits: data.hits, isLoading: false }))*/
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
