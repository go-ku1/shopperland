import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss"
const Checkout=()=>{
    const {cartItems,addItemToCart,removeItemToCart,cartTotal}=useContext(CartContext);
    return(
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>description</span>
                </div>
                <div className="header-block">
                    <span>quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
                {
                cartItems.map((cartItem)=>{
                    const {id,name,quantity}=cartItem;
                    return(
                        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                    )
                }
                )
            }
            <span className="total">Total:${cartTotal}</span>
                       
        </div>
    )
}
export default Checkout;