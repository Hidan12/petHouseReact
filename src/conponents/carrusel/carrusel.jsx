import { Card } from "../card/Card";


import "./carrusel.css"
// eslint-disable-next-line react/prop-types
export const Carrusel = ({ dat })=>{
    console.log('carrusel', dat);
    return (
        <div className="contenFather">
            <section className='conten'>
                {dat.map((car, index)=>(
                    <Card key={index}  name={car.nombre} price={car.precio} dto={car.descuento} category={car.categoria} img={'http://localhost:3000/img/product/'+ car.img} linkp={car.id} classNam={"carrusel"}></Card>))
                }
            </section>
        </div>
    )
}