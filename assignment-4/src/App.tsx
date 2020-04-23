import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { RequestListReducer } from './components/request/list';
class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div className="App">
        <ErrorBoundary>
          <RequestListReducer></RequestListReducer>
        </ErrorBoundary>
    </div>
  );
}

export default App;
