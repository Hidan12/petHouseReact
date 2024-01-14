import { Card } from "../../conponents/card/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './listProduct.css'
export const ListProduct = ()=>{
    const {params} = useParams();
    const [data, setData] = useState([]);
    const [carga, setCarga] = useState(false)
    
    useEffect(()=>{
        const product = async ()=>{
            try {
                if(params != undefined){
                    let info = await fetch(`http://localhost:3000/apis/${params}`);
                    const infoPas = await info.json();
                    if(!infoPas){
                        console.log("error al hacer el fetch");
                    }
                    else{
                        setData(infoPas.product)
                    }
                }else{
                    let info = await fetch('http://localhost:3000/product/listProduct');
                    const infoPas = await info.json();
                    if(!infoPas){
                        console.log("error al hacer el fetch");
                    }
                    else{
                        setData(infoPas.product)
                    }
                }
            } catch (error) {
                console.log("error: ", error);
            }
        }
        if (!carga){
            setCarga(true);
            product()
        }
        if(data){
            setCarga(true)
        }
    }, [carga, params, data])

    return(
        <>
        <section className="listProduct">
          {carga ? data.map((info, index)=>{
            return(
                <Card 
                    key={`${index}${info.nombre}`} 
                    name={info.nombre} 
                    price={info.precio} 
                    img={'http://localhost:3000/img/product/' + info.img} 
                    classNam={"listProduc"} 
                    category={info.categoria} 
                    description={info.descripcion} 
                    linkP={info.detail}
                    />
            );
          }) : <p>cargando.........</p>}  
        </section>
        </>
    )
}