import { useEffect, useState } from "react"
import { Inputs } from "../../conponents/inputs/inputs"
import { ImageCorp } from "../../conponents/imageCorp/imageCorp"
import './styleCreateProduct.css'
// import logo from '../../image/logo/logo.png'





const searchWord = (string, search)=>{
  const match = string.match(new RegExp(search), "i");
  return(!!match)
};
const searchNum =(string)=>{
  const match = string.match(/\d+/);
  return match ? Number(match[0]): null;
}


export const CreateProduct = () => {
  
  const [categoryList, setCategoyList] = useState([])
  const [selctCategory, setSelectCategory] = useState(1);
  const [typePet, setTypePet] = useState([]);
  const [selcetType, setSelectType] = useState(1);
  const [brandList, setBrandList] = useState([]);
  const [selectBrand, setSelectBrand] = useState(1);
  const [selectSalient, setSelectSalient] = useState(1);
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

  const loadSalient = (event)=>{
    setSelectSalient(event.target.value);
  }
  
  const changeCheck = (event)=>{
    const pesoIndex = searchNum(event.target.name);
    setPeso((prevPeso) => {
      const nuevoPeso = [...prevPeso]; // Hacer una copia del estado actual
      nuevoPeso[pesoIndex] = {
        [pesoIndex]: !nuevoPeso[pesoIndex][pesoIndex],
      };
      return nuevoPeso;
    });
  }
 
  const sendData = (event)=>{
    event.preventDefault();
    const date = Array.from(event.target);
    let objSelect = [];
  
    let dateForm = date.map(dt =>{
      let name = dt.name;
      if (searchWord(name,"price") || searchWord(name,"stock")) {
        const num = searchNum(name);
        if(objSelect[num]){
          objSelect[num] = {...objSelect[num], [name]: dt.value}
        }else{
          objSelect[num] = {[name]: dt.value}
        }
      }else{
        return({
          [name]:event.target[name].value
        })
      }
    })


    console.log("dato formateado? ", dateForm);
    console.log("obj?", objSelect);
  }

    return (
      <form onSubmit={sendData}>
        <section className="create-product">
          <article className="first">
            <picture className="cont-creat-img">
              <ImageCorp />
            </picture>
            <section className="create-dat">
              <Inputs type="input"
                txt="Nombre" 
                name={'name'} 
                placeholder="Nombre" 
                styleName="name"
                />
              <Inputs type="textarea" 
                txt="Descripcion" 
                placeholder="ingrese detalles del producto" 
                styleName="description" 
                name={'description'}
                />
            </section>
          </article>
          <article className="second">
            <section className="weight-ch">
              <h4>Peso: </h4>
              {pesoBd.map((weig, index)=>{
                return(
                  <div key={index} className="weight-chek">
                    <input type="checkbox" name={`peso-id${weig.id}`} id={weig.id} onChange={changeCheck}/>
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
                      <Inputs type={"number"} 
                        txt={`precio de ${pesoBd[inde].peso}kg`} 
                        name={`price${pesoBd[inde].id}`} 
                        styleName={'specialPrice'} 
                        />
                      <Inputs type={"number"} 
                        txt={`stock de ${pesoBd[inde].peso}kg`} 
                        name={`stock${pesoBd[inde].id}`} 
                        styleName={'specialPrice'} 
                        />
                    </div>
                  )
                }
              })}
            </section>
          </article>
          <article className="three">
              <Inputs type={"select"} 
                func={loadCategory} 
                valueSet={selctCategory} 
                txt={"Categoria"} 
                name={"category"} 
                optionSect={categoryList} 
                objName={'categoria'} 
                styleName={"selectCreate"}
              />
              
              <Inputs type={"select"} 
                func={loadBrand} 
                valueSet={selectBrand} 
                txt={'Marcas'} 
                optionSect={brandList} 
                name={"brand"} 
                objName={'nombre'} 
                styleName={"selectCreate"}
                />
              <Inputs type={"select"} 
                func={loadType} 
                valueSet={selcetType} 
                txt={'Tipo de mascota'} 
                optionSect={typePet} 
                name={"typePet"} 
                objName={'tipo_mascota'} 
                styleName={"selectCreate"}
                />
              <article className={`contenF selectCreate`} data-txt={"Destacado"}>
                <select value={selectSalient} onChange={loadSalient} name={"destacado"}>
                    <option value={0}>No</option>
                    <option value={1}>Si</option>
                </select> 
            </article>
          </article>      
          <article className="btns btn-create">
            <button name="btn">crear Producto</button>
          </article>
        </section>
      </form>
  )
}
