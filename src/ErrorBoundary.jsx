import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  ComponentDidCatch(error, info) {
    // typically you would log the error to something like TrackJS or New Relic
    console.error("ErrorBoundary component caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>This listing has an error.</h2>
          <Link to="/">Click here</Link> to go back to the home page.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
