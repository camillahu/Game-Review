import 'bootstrap/dist/css/bootstrap.min.css' 
import LogInBox from './LogInBox'
import React, {useState, useRef} from 'react'

function App() {

  const [page, setPage] = useState('login');
  const loginref = useRef({username: null, password: null});
  

  function handlePageChange(page) {
    setPage(page);
  }

  function updateView() {
    switch (page) {
      case 'login':
        return <LogInBox saveLogin={loginref} changePage={handlePageChange}/>
        break;
      case 'home':
        return (<></>)
        break;

      default: 
      return console.log("error changing page")
    }
  }

  return (
    <>
      {updateView()}
    </>
  )
}

export default App
