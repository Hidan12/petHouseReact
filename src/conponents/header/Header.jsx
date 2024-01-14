import logo from '../../image/logo/logo.png'
import './style.css'
import { Login } from '../../pages/login/login'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchVar } from '../searchvar/searchVar'

// eslint-disable-next-line react/prop-types
export function Header({user}){
    let css = user ? 'hiden': 'cont-left'
    const [loginClick, SetloginClick] = useState(false);
    
    const login = (event)=>{
        event.preventDefault();
        if(loginClick){
            SetloginClick(false);
        }else{
            SetloginClick(true);
        }
        
    }  
    return(
        <header>
            
            <section className='cont-first'>
                <section className="cont-logo">
                    <Link to='/'>
                    <picture>
                        <img src={logo} alt="logo" />
                    </picture>
                    </Link>
                </section>
                <section className="cont-search">    
                    <SearchVar/>
                </section>
                {user ? 
                <section className='cont-perfil'>
                    
                        <article className='img'>
                            <Link to='/'>
                            <img src={logo} alt="" />
                            </Link>
                        </article>
                    
                    <article>
                        <p>nombre</p>
                    </article>
                </section> :
                <section>

                </section>
                }
                
            </section>

            <section className="cont-nav-bar">
                <nav>
                    <ul className='cont-r'>
                        <li>
                            <a href="">Ofertas</a>
                        </li>
                        <li>
                            <a href="">Perros</a>
                        </li>
                        <li>
                            <a href="">Gatos</a>
                        </li>
                    </ul>
                    <ul className={css}>
                        <li><Link to="/regis">Registarte</Link></li>
                        <li><a href="" onClick={login}>Ingresar</a></li>
                    </ul>
                </nav>
            </section>
            {loginClick ? <Login />: ""}
        </header>
    )
}