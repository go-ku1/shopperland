import { useState } from "react";
import { createContext } from "react";
import SHOP_DATA from "../shop-data";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
import { useEffect } from "react";

export const CategoriesContext=createContext({
    categoriesMap:[],
})
export const CategoriesProvider=({children})=>{
    const [categoriesMap,setCategoriesMap]=useState({});

    useEffect(()=>{
       const getCategoriesMap=async()=>{
            const categoryMap=await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
       }
       getCategoriesMap();
       
    },[])

    const value={categoriesMap};
  
    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
} 