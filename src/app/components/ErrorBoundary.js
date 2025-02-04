"use client"

import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render shows the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Log the error to an error reporting service
      console.error("Caught an error:", error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can customize this fallback UI
        return null; // Or render an empty div to prevent flashing errors
      }
  
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;