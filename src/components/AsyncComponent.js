import React from 'react';

class AsyncComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        Component: null
      };
    }
  
    componentDidMount() {
      const { componentPromise } = this.props;
      componentPromise.then(component => this.setState({
        Component: component
      }));
    }
  
    render() {
      const { Component } = this.state;
  
      if (!Component) {
        return null; // You can return some spinner here
      }

      return Component
    }
  }

export default AsyncComponent;
