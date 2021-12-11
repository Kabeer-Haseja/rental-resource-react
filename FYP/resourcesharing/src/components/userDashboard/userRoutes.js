import DetailedShopProduct from "../Products/DetailedShopProduct";
import Main from "./Main";
import Products from "./Products";

const userRoutes=[

    { path:'/Main',exact:true, name:'Main'},
    { path:'/Main',exact:true, name:'Products', component:Products},
    { path:'/Main/DetailedProduct',exact:true, name:'DetailedProducts', component:DetailedShopProduct},
    

    
]
export default userRoutes;