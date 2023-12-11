import React ,{Suspense} from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Spinner from 'react-bootstrap/Spinner';

const App = React.lazy(()=>{
  return new Promise(resolve =>{
    setTimeout(()=>{
      resolve  (import('./App.jsx')) 

    },3000)
  })
  
  // return import('./App.jsx')
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={ <div className='d-flex  justify-content-center align-items-center vh-100 w-50 m-auto'> <Spinner  animation="grow" role='status'/> </div> }>
    <App />

    </Suspense>
  </React.StrictMode>,
)
