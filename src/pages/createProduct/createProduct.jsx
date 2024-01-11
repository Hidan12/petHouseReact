import { useEffect, useState } from "react"
import { Inputs } from "../../conponents/inputs/inputs"
import './styleCreateProduct.css'
import logo from '../../image/logo/logo.png'
export const CreateProduct = () => {
  
  const [categoryList, setCategoyList] = useState([])
  const [selctCategory, setSelectCategory] = useState();
  const [typePet, setTypePet] = useState([]);
  const [selcetType, setSelectType] = useState();
  const [brandList, setBrandList] = useState([]);
  const [selectBrand, setSelectBrand] = useState();

  const [infobd, setInfoBd] = useState([])
  const [peso, setPeso] = useState([]);
  const pesoBd = [
  {
    id: 0,
    peso: 1
  },
  {
    id: 1,
    peso: 2
  },
  {
    id: 2,
    peso: 2.5
  },
  {
    id: 3,
    peso: 3
  },
 ];
  
 useEffect(()=>{
   const databd = async()=>{
     if (Object.keys(infobd).length == 0) {
       try {
         let data = await fetch("http://localhost:3000/product/createProduct");
         data = await data.json()
                if(data){
                    setCategoyList(data && data.categorias);
                    setTypePet(data && data.tipoMascotas);
                    setBrandList(data && data.marcas);
                    setPeso(pesoBd.map((pes)=>{
                      return({
                        [pes.id]: false
                      })
                    }));
                }else{
                  setPeso(pesoBd.map((pes)=>{
                    return({
                      [pes.id]: false
                    })
                  }));
                  setInfoBd(null)
                }
            } catch (error) {
                console.log(error);                
            }
        }
    }
    databd();
  },[]);

  const loadCategory = (event)=>{
    setSelectCategory(event.target.value);
  }

  const loadBrand = (event)=>{
    setSelectBrand(event.target.value);
  }

  const loadType = (event)=>{
    setSelectType(event.target.value);
  }
  
  const changeCheck = (event)=>{
    const pesoIndex = Number(event.target.name);
    setPeso((prevPeso) => {
      const nuevoPeso = [...prevPeso]; // Hacer una copia del estado actual
      nuevoPeso[pesoIndex] = {
        [pesoIndex]: !nuevoPeso[pesoIndex][pesoIndex],
      };
      return nuevoPeso;
    });
  }
 
  
    return (
      <form action="" method="post">
        <section className="create-product">
          <article className="first">
            <picture className="cont-creat-img">
              <img src={logo} alt="" className="creat-img"/>
            </picture>
            <section className="create-dat">
              <Inputs type="input" txt="Nombre" name={'nameProduct'} placeholder="Nombre" styleName="name"/>
              <Inputs type="textarea" txt="Descripcion" placeholder="ingrese detalles del producto" styleName="description" name={'description'}/>
            </section>
          </article>
          <article className="second">
            <section className="weight-ch">
              <h4>Peso: </h4>
              {pesoBd.map((weig, index)=>{
                return(
                  <div key={index} className="weight-chek">
                    <input type="checkbox" name={weig.id} id={weig.id} onChange={changeCheck}/>
                    <label htmlFor={weig.id}>{weig.peso}kg</label>
                  </div>
                )
              })}
            </section>
            <section className="price">
              {peso.map((p, inde) =>{
                if (p[inde]) {
                  return(
                    <div key={inde+p} className="priceStock">
                      <Inputs type={"number"} txt={`precio de ${pesoBd[inde].peso}kg`} name={`price-${pesoBd[inde].peso}`} styleName={'specialPrice'} />
                      <Inputs type={"number"} txt={`stock de ${pesoBd[inde].peso}kg`} name={`stock-${pesoBd[inde].peso}`} styleName={'specialPrice'} />
                    </div>
                  )
                }
              })}
            </section>
          </article>
          <article className="three">
              <Inputs type={"select"} func={loadCategory} valueSet={selctCategory} txt={"Categoria"} optionSect={categoryList} name={'categoria'} styleName={"selectCreate"}/>
              <Inputs type={"select"} func={loadBrand} valueSet={selectBrand} txt={'Marcas'} optionSect={brandList} name={'nombre'} styleName={"selectCreate"}/>
              <Inputs type={"select"} func={loadType} valueSet={selcetType} txt={'Tipo de mascota'} optionSect={typePet} name={'tipo_mascota'} styleName={"selectCreate"}/>
          </article>      
        
        </section>
      </form>
  )
}
