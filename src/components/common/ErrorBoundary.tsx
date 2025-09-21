import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  componentStack: string | null;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null, componentStack: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, componentStack: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo);
    this.setState({ componentStack: errorInfo.componentStack || null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h1 style={{ marginBottom: 8 }}>Something went wrong.</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.message}</pre>
          {this.state.componentStack && (
            <details style={{ marginTop: 12 }}>
              <summary>Component stack</summary>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
