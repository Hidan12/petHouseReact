import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './styledetail.css'

export const Detail = () => {
  const { id } = useParams();
const [data, setData] = useState({});

console.log("Componente renderizado");

useEffect(() => {
  const product = async () => {
    if (Object.keys(data).length === 0) {
      try {
        let info = await fetch(`http://localhost:3000/product/detail?id=${id}`);
        info = await info.json();
        if (info) {
          setData(info);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  product();
}, [data, id]);


  
  if(Object.keys(data).length > 0){
    let priceDto = 0;
    if (data.descuento > 0) {
      priceDto = data.precio - ((data.descuento * data.precio) / 100);
      priceDto = priceDto.toLocaleString('es-ES', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    })
    }
    
    
    
    
    
    
    return (
    <article className="detail">
      <section className="detail-count">
      <section className="count-img-detail">
        <picture>
          <img src={`http://localhost:3000/img/product/${data.img}`} />
        </picture>
      </section>
      <section className="count-info">
        <div>
          <h2>{data.nombre}</h2>
        </div>
        <div>
          <p>{data.descripcion}</p>
          {priceDto > 0 ? <p className="tach">{data.precio}</p> : ''}
          {priceDto > 0 ? <p>{priceDto}</p> : <p>{data.precio}</p>}
        </div>
  
      </section>
      <section className="detail-botoons">
        <button>comprar</button>
      </section>
  
      </section>
    </article>
  )
  }
  
}
