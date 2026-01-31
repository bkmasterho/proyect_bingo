import { useContext } from "react"
import BingoContext from "../context/BingoProvider"


const useBingo = () => {
    return useContext(BingoContext);
}

export default useBingo