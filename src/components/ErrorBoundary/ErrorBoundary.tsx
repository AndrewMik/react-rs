import { Component, ErrorInfo, ReactNode } from 'react';
import './style.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="search">
            <h2 className="heading">Something went wrong.</h2>
          </div>
          <div className="search-section">
            <button
              className="button restart-button"
              onClick={() => location.reload()}
            >
              Click here to restart
            </button>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
