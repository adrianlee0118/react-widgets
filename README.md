## About

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Some useful widgets created in preparation for my impending website migration to Gatsby, saved to the cloud because of my 6 year-old laptop's imminent demise. Initially a memory device/review tool but has morphed into a gymnastics space where I try to do strange (unnecessary) things in React just cause I can, so it might be a bit disorganized.

## Referring to the Projects

To improve my own understanding, widgets were/are built first in pure React with both classes (with and without render props, higher order components) and function components (with/without render props, react hooks in useState and then with useReducer), then in React-Redux.

## My Definitions

Class: Using React classes to form components complete with state (initialized in constructor) and lifecycle methods (e.g. constructor, didmount, unmount, render).

FcnComp - Function Components: Using functions to represent components, with state managed using React hooks or no state at all.

HOC - Higher Order Component: Style of coding in React where functions within a component are split out on their own, and the components that use the new function are wrapped in it to allow those components to use that functionality. This promotes organization of logic and also allows for common logic patterns to be re-used easily across different components (e.g. data fetching from the same source but isolating different items and condtitional rendering for differing conditions).

RP - Render Prop: Style of coding in React of sharing state between components while keeping them separated (e.g. avoiding lifting state or nesting components) by passing a function that renders child components rather than child components themselves to a parent component. This allows the format of the child components to remain generic (easy to change), and keeps logic of the child components separated from the parent component for organization/performance. State can be shared by passing arguments to the child component function from the parent component.
