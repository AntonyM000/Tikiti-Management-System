// Inside the src folder, create a new file called 'MyClassComponent.jsx'
import React, { Component } from 'react';

// Define a class component
class MyClassComponent extends Component {
  // Set the initial state
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    // Binding methods
    this.increment = this.increment.bind(this);
  }

  // Lifecycle method: componentDidMount
  componentDidMount() {
    console.log('Component did mount');
  }

  // Lifecycle method: componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Component did update: Count is now', this.state.count);
    }
  }

  // Lifecycle method: componentWillUnmount
  componentWillUnmount() {
    console.log('Component will unmount');
  }

  // A method to increment the count
  increment() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  // Render method
  render() {
    return (
      <div>
        <h2>Simple Counter</h2>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default MyClassComponent;
