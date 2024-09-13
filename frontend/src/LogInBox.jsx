import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LogInBox() {

    return(
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card" style={{width: '25rem'}}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-5 h3">Login</h3>
                    <form>
                        <div className='mb-5'>
                            <input type="text" className='form-control mb-2' placeholder='username' />
                            <input type="text" className='form-control mb-2' placeholder='password' />

                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default LogInBox