import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
