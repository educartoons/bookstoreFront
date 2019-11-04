import { createContext } from "react";
import { itemTotal } from "../core/cartHelper";

const CartContext = createContext([itemTotal(), () => {}]);

export default CartContext;
