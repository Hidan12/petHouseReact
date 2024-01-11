import { useState, useEffect } from 'react'
import { Carrusel } from '../../conponents/carrusel/carrusel';
import "./home.css"
export function Home() {
    const [data, setData] = useState();
    const [carga, setCarga] = useState(false)
    useEffect(()=>{
        const product = async()=>{
          if (!data) { 
            try{
              const res = await fetch('http://localhost:3000/product/offerProduc')
              if(!res){console.log("error al hacer el fetch");}
              const resul = await res.json();
              setData(resul);
            }catch (error){
              console.log(error);
            }finally{
              setCarga(true)
            }
          }
        }
        product();
    },[data])

    if(carga){
      return(
        <>
          <section className='title'><p>Ofertas</p></section>
            <Carrusel dat={data} />
          <section className='arrows'>
          <i className="fa-solid fa-arrow-left"></i>
          <i className="fa-solid fa-arrow-right"></i>
          </section>
        </>
      )
    }
    return(
      <p>cargaando........</p>
    )

}