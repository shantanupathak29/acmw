import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Production-safe error logging
    if (import.meta.env.DEV) {
      // Enhanced error logging in development only
      const userAgent = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
      const deviceInfo = {
        userAgent,
        isIOS,
        isSafari,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        memory: navigator.deviceMemory || 'unknown',
        connection: navigator.connection?.effectiveType || 'unknown'
      };
      
      console.error('Error Boundary caught an error:', {
        error: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        deviceInfo
      });
      
      if (isIOS) {
        console.error('iOS-specific error context:', {
          standalone: window.navigator.standalone,
          cookieEnabled: navigator.cookieEnabled,
          onLine: navigator.onLine,
          language: navigator.language
        });
      }
    } else {
      // Production: Log minimal error info
      // In production, you should integrate with error tracking service
      // like Sentry, LogRocket, or similar
      if (typeof window !== 'undefined' && window.errorTracker) {
        window.errorTracker.captureException(error, {
          extra: {
            componentStack: errorInfo.componentStack
          }
        });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000000] flex items-center justify-center p-4">
          <div className="bg-red-950/30 border border-red-500/50 rounded-lg p-6 max-w-2xl w-full text-white">
            <h2 className="text-xl font-bold mb-4 text-red-400">Something went wrong</h2>
            <p className="text-gray-300 mb-4">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {import.meta.env.DEV && (
              <details className="mb-4">
                <summary className="cursor-pointer text-red-300 hover:text-red-200">
                  Error Details (Development Only)
                </summary>
                <div className="mt-2 text-sm bg-black/30 p-3 rounded">
                  <p className="text-red-300 mb-2">Error: {this.state.error && this.state.error.toString()}</p>
                  <pre className="text-gray-300 text-xs overflow-auto">
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
