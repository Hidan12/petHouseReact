import { ComponentForm } from "../../conponents/componetForm/componetForm"
import './styleLogin.css'
import perrito from '../../image/prrito/perrito.png'

export const Login = () => {
  const crearForm = {
    name:"usuario",
    password: "password"
  }
  const sendDate = async (event)=>{
    event.preventDefault();
    const user = event.target.name.value;
    const password = event.target.password.value;
    const response = await fetch("http://localhost:3000/user/searchUser", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user,
        password: password
      })
    });

    const data = await response.json()
    
    console.log(data);
    console.log(user);
  }

  return (
    <>
    <div className="pr">
      <form onSubmit={sendDate}>
        <div className="conten-padre">
          <picture className="img-perrito">
            <img src={perrito} alt="perrito" />
          </picture>
          <div className="contenForm">
          <ComponentForm objDate={crearForm}/>
          <div className="chkbox">
            <input type="checkbox" id="userSave" value={"saveUsr"}></input>
            <label htmlFor="userSave">Recordarme</label>
          </div>
          <button className="no-btn">recuperar contraseña</button>
          <div>
            <button>Ingresar</button>
          </div>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}
