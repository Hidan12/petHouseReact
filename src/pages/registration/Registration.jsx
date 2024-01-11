import { ComponentForm } from "../../conponents/componetForm/componetForm"
import './registration.css'
export const Registration = ()=>{
    const form = {
        name: "Ingresa tu nombre completo",
        user: "Crear nombre de usuario",
        email: "Correo electronico",
        address: "Direcion",
        password: "Contraseña"
    };

    const obtenerInfo  = (e)=>{
        e.preventDefault();
        let crearObj = {}
        const inform = e.target.elements
        Object.keys(form).map(inf =>{
            crearObj={
                ...crearObj,
                [inf]:inform[inf].value,
            }
        })
        
    };
    return(
        <>
            <form onSubmit={obtenerInfo} className="reg-form">
                <section className="contenRegis">

                    <ComponentForm objDate={form} />
                </section>
                <section className="btns">
                    <button type="submit">Crear</button>
                </section>
                
            </form>
            
            
        </>
    )
}