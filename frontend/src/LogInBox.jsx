import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LogInBox(saveLogin) {

    const [inputName, setInputName]= useState();
    const [inputPassword, setInputPassword]= useState();
    const [passwordVisable, setPasswordVisability] = useState(false);

    
    function handleNameChange(event) {
        setInputName(event.target.value)
    }
    
    function handlePasswordChange(event) {
        setInputPassword(event.target.value)
    }

    function togglePasswordVisability() {
        setPasswordVisability(!passwordVisable);
    }

    function submitForm() {
        if(!inputName.trim() || !inputPassword.trim()) {
            console.log("enter both username and password");
        }

        console.log({username: inputName, password: inputPassword})
    }

    return(
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card" style={{width: '25rem'}}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-5 h3">GameReview!</h3>
                    <form>
                        <div className='mb-5'>

                            <input type="text" 
                                className='form-control mb-2' 
                                placeholder='username' 
                                onChange={handleNameChange} 
                                // value={inputName}
                                />

                            <input type={passwordVisable ? "text" : "password"} 
                                className='form-control mb-2' 
                                placeholder='password' 
                                onChange={handlePasswordChange} 
                                // value={inputPassword}
                                />
                            <div className="d-flex justify-content-between p-2">

                                <button type="button" 
                                    onClick={togglePasswordVisability}
                                    className='btn btn-outline-secondary btn-sm'>
                                        {passwordVisable ? "Hide password": "Show Password"}</button>

                                <button type="button" 
                                    onClick={submitForm}
                                    className='btn btn-outline-primary btn-sm'>
                                        Login</button>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogInBox