import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import useApiError from './hooks/useApiError';

const { handleError } = useApiError;
const queryClient = new QueryClient({
    defaultOptions: {
        onError: handleError,
        queries: {
            retry: 0,
            suspense: true,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            {/* devtools */}
            <ReactQueryDevtools initialIsOpen={true} />
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
);
