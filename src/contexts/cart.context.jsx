import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

const addCartItems=(cartItems,productToAdd)=>{
    const existingCartItem=cartItems.find((cartItem)=>
        cartItem.id==productToAdd.id);

    if(existingCartItem){
        return cartItems.map((cartItem)=>
        cartItem.id==productToAdd.id?{...cartItem,quantity:cartItem.quantity+1}:cartItem
        )
    }

    return [...cartItems,{...productToAdd,quantity:1}]
}

const removeCartItems=(cartItems,cartItemToRemove)=>{
    const existingCartItem=cartItems.find((cartItem)=>
            cartItem.id==cartItemToRemove.id);

    if(existingCartItem.quantity==1){
        return cartItems.filter((cartItem)=>
        cartItem.id!=cartItemToRemove.id)
    }

    return cartItems.map((cartItem)=>
            cartItem.id==cartItemToRemove.id?
            {...cartItem,quantity:cartItem.quantity-1}:cartItem
        
        )

}

const clearCartItem=(cartItems,cartItemToClear)=>{
    return cartItems.filter((cartItem)=>
        cartItem.id!=cartItemToClear.id)
}

export const CartContext=createContext({
    isCartOpen:false,
    setIsCartOpen:()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    cartCount:0,
    removeItemToCart:()=>{},
    clearItemFromCart:()=>{},
    cartTotal:0,
})

export const CartProvider=({children})=>{
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);
    const [cartTotal,setCartTotal]=useState(0);

    useEffect(()=>{
        const newCartCount=cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0)
        setCartCount(newCartCount);
    }
    ,[cartItems])
    

    const addItemToCart=(productToAdd)=>{
        setCartItems((addCartItems(cartItems,productToAdd)))
    }

    const removeItemToCart=(cartItemToRemove)=>{
        setCartItems((removeCartItems (cartItems,cartItemToRemove)))
    }

    const clearItemFromCart=(cartItemToClear)=>{
        setCartItems((clearCartItem(cartItems,cartItemToClear)))
    }

    useEffect(()=>{
        const newCartTotal=cartItems.reduce((total,cartItem)=>
            total+cartItem.quantity*cartItem.price,0);
            setCartTotal(newCartTotal);
    }
    ,[cartItems])

    const value={
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemToCart,
        clearItemFromCart,
        cartTotal,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
    
} 