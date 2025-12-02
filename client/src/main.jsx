import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



// CSS Reset
// Removes default styling on HTML elements
// Default styling can be seen as 'user agent stylesheet' when inspecting the webpage
// user agent stylesheet - browser stylesheet
import './styles/resets.css.js'

// Global styling
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext.jsx';
import App from './App.jsx'

// TanStack + Cache
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
