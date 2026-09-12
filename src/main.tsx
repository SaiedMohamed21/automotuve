import React, { Component, type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6 font-sans">
          <div className="bg-[#1e293b] border border-red-500/30 rounded-2xl p-8 max-w-lg w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-white mb-2">حدث خطأ غير متوقع</h2>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              حدث خطأ أثناء عرض الصفحة. يمكنك إعادة تحميل الصفحة للعودة فوراً إلى العمل.
            </p>
            {this.state.error && (
              <div className="bg-[#0f172a] border border-gray-700 rounded-lg p-3 text-left font-mono text-xs text-red-400 mb-6 overflow-x-auto max-h-36">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg transition-colors shadow-lg shadow-blue-500/30"
              >
                🔄 إعادة تحميل الصفحة
              </button>
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold text-sm rounded-lg transition-colors"
              >
                محاولة المتابعة
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
