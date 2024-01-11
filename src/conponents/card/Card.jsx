import { Link } from 'react-router-dom';
import './style.css'

// eslint-disable-next-line react/prop-types
export function Card ({ name, price, img, category, classNam, description, dto, linkp}){
        let formatDesc = "";
        const formatPrice = price.toLocaleString('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
        });
        if(dto > 0){
            const desc = price - ((dto * price) / 100);
            formatDesc = desc.toLocaleString('es-ES', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
            })
        }
    return(
        
            <article className={`tw-card-${classNam}`}>
                <Link to={`/detail/` + linkp}>
                <section className={`tw-card-section-img-${classNam}`}>
                    <img src={img} alt={img} />
                </section>
                <section className={`tw-card-section-info-${classNam}`}>
                    <p>{name}</p>
                    {description ? <p className='description'>{description}</p>: ""}
                    {dto > 0 ? <p className='tach'>${formatPrice}</p> : ""}
                    {dto > 0 ? <p className='price'>${formatDesc}</p>: <p>{formatPrice}</p>}
                    {dto > 0 ? "" :<p>{category}</p>}
                </section>
                </Link>
            </article>
        
        

    )
    
    
}