import { Routes, Route  } from "react-router-dom"
import { Home } from "../pages/home/home"
import { ListProduct } from "../pages/listProduct/listProduct"
import { Registration } from "../pages/registration/registration"
import { Detail } from "../pages/detail/detail"
import { CreateProduct } from "../pages/createProduct/createProduct"
export const RouterAp = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/regis" element={<Registration/>}/>
        <Route path="/listproduc/:params?" element={<ListProduct/>}/>
        <Route path="/detail/:id?" element={<Detail/>} />
        <Route path="/createProduct" element={<CreateProduct/>} />
    </Routes>
  )
}
