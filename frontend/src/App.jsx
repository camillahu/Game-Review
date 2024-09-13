import 'bootstrap/dist/css/bootstrap.min.css' //ikke fjern!
import LogInBox from './LogInBox'

function App() {

  let page = 'login';

  function view() {
    
    switch (page) {
      case 'login':
        return <LogInBox/>
        break;

      default: 
      return console.log("error changing page")
    }
      
  }

  return (
    <>
      {view()}
    </>
  )
}

export default App
