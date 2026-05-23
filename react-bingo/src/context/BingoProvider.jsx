import { createContext, useState } from "react";
const BingoContext = createContext();
import { useCartones } from '../hooks/useCartones';

const BingoProvider = ({children}) => { 

    // Valores Hook Cartones

    const {
      cartones,
      cartonesLoading,
      cartonesError,
      mutateCartones
    } = useCartones()

    const [ cantCartones, setCantCartones ] = useState(0);
    const [ cartonesSelect, setCartonesSelect] = useState([]);
    const [ totalCostoCartones, setTotalCostoCartones ] = useState(0)

    return (
          <BingoContext.Provider
              value={{

                  //Listado Cartones
                  cartones,
                  cartonesLoading,
                  cartonesError,
                  mutateCartones,

                  //Valores Generales
                  cantCartones,
                  setCantCartones,
                  cartonesSelect,
                  setCartonesSelect,
                  totalCostoCartones,
                  setTotalCostoCartones
                  
              }}
          >{children}</BingoContext.Provider>
    )
}

export {
  BingoProvider
}

export default BingoContext