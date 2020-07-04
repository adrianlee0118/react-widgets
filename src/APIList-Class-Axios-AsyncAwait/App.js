import React, { error } from "react";
import ContentLoader from "react-content-loader";
import axios from "axios";
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

  //Using async/await instead of .then() in the componentDidMount method to fetch data asynchronously using axios
  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get(API + DEFAULT_QUERY); //asynchronously fetch data; await keyword makes it so that next line does not execute bfore await request resolves
      this.setState({
        hits: result.data.hits, //return data in json format from axios as before
        isLoading: false,
      });
    } catch (error) {
      //catch all errors using axios as before including request fail
      this.setState({
        error,
        isLoading: false,
      });
    }
  }
  /*        //same code without async/await
  componentDidMount() {
    axios
      .get(API + DEFAULT_QUERY)
      .then((result) =>
        this.setState({
          hits: result.data.hits,
          isLoading: false,
        })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
  }*/

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
