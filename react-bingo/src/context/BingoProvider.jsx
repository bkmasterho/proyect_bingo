import { createContext, useState } from "react";

const BingoContext = createContext();

const BingoProvider = ({children}) => {

  const [ modal, setModal ] = useState(false);
  const [ cantCartones, setCantCartones ] = useState(0);
  const [ arrCartones, setArrCartones] = useState([]);

  return (
        <BingoContext.Provider
            value={{
                cantCartones,
                setCantCartones,
                arrCartones,
                setArrCartones
            }}
        >{children}</BingoContext.Provider>
  )
}

export {
  BingoProvider
}

export default BingoContext