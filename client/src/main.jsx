import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Router
import { BrowserRouter } from 'react-router-dom';

// CSS Reset
// Removes default styling on HTML elements
// Default styling can be seen as 'user agent stylesheet' when inspecting the webpage
// user agent stylesheet - browser stylesheet
import './styles/resets.css.js'

// Global styling
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
// import './styles/index.css'

//
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
