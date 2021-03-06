import React from "react";
import "./App.css";

const App = ({ items }) => (
  <div>
    {items.map((item) => (
      <div key={item.id}>
        <Blurb name={item.name} />
      </div>
    ))}
  </div>
);

const Blurb = ({ name }) => (
  <div>
    <h1>
      <Hello /> <World name={name} />!
    </h1>
    <p>It's a great time to be alive!</p>
    <p>...in Canada at least.</p>
    <p>
      I'm so lucky to have a great and supportive family at this time! Hope I'm
      not disturbing them too much.
    </p>
  </div>
);

const Hello = () => "Hello";

const World = ({ name }) => (name ? name : "World");

export default App;
