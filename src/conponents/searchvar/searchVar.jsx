import { useEffect, useState } from "react";
import { Inputs } from "../inputs/inputs";
import './searchStyle.css';
import { Link } from "react-router-dom";

export const SearchVar = () => {
    const [info, setInfo] = useState([]);
    const [searchIn, setSearchIn] = useState('');

    useEffect(() => {
        console.log("entro al usee", searchIn);
        const searchData = async () => {
            if (searchIn != "") {
                try {
                    const infoDB = await fetch(`http://localhost:3000/product/search?search=${searchIn}`)
                    const dataBd = await infoDB.json();
                    console.log(dataBd);
                    setInfo(dataBd);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        searchData()
    }, [searchIn]);

    console.log(info);
    const setInput = (e) => {

        setSearchIn(e.target.value);
    }

    return (
        <div className="searchComponent">
            <Inputs
                type={'input'}
                name={'search'}
                func={setInput}
                txt={'buscador'}
                styleName={'search'}
            />
            {searchIn && info ? <section className={'countsearch'}>
                {

                    info.map((pr, index) => (
                        <Link  to={`/detail/${pr.id}`} key={pr + index} >
                            <article className="searchPr" >
                                <img src={`http://localhost:3000/img/product/${pr.img}`} alt={pr.img} />
                                <p>{pr.nombre}</p>
                            </article>
                        </Link>
                    ))
                }
            </section> : ""}
        </div>
    )
}
