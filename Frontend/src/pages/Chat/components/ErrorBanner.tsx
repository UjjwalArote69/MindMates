interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  onDismiss: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onRetry, onDismiss }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-4 rounded flex items-center justify-between">
    <span className="text-sm">{message}</span>
    <div className="flex space-x-2">
      {onRetry && (
        <button onClick={onRetry} className="text-red-700 hover:text-red-900 text-sm font-medium">
          Retry
        </button>
      )}
      <button onClick={onDismiss} className="text-red-700 hover:text-red-900 ml-2">
        ×
      </button>
    </div>
  </div>
);


export default ErrorBanner;