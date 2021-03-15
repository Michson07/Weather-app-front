import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      console.log('error: ' + {error});  
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Error occurred!</h1>;
      }
      return this.props.children;
    }
  }

export default ErrorBoundary;
