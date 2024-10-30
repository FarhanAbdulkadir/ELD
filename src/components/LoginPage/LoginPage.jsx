import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function LoginPage() {
  const user = useSelector((store)=> store.user)
  const history = useHistory();

//console.log(user.Roles);
  if(user.Roles===0){
    return <Redirect to="/driver-dashboard" />
  } else if(user.Roles===1){
    return <Redirect to="/dispatcher-dashboard"/>
  }

  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
