import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../../app/models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket:Basket) => void
    removeItem: (prouductId:number,quantity:number) => void

}

export const StoreContext = createContext<StoreContextValue | unknown>(undefined);

export function useStoreContext(){
    const context = useContext(StoreContext);

    if(context ===undefined){
        throw Error('Opps we do not seem to be inside the provider');
    }

    return context;
}


export function StoreProvider({children}: PropsWithChildren<unknown>) {
    const [basket,setBasket] = useState<Basket | null>(null);

    function removeItem(prouductId:number,quantity:number) {
        if(!basket) return;

        const items = [...basket.items];
        const itemIndex = items.findIndex(x => x.productId === prouductId);
        if(itemIndex >=0){
            items[itemIndex].quantity -=quantity;
            if(items[itemIndex].quantity ==0 )
                items.splice(itemIndex,1);
            setBasket(prevState => {return {...prevState!,items }})

        }


    }

    return (<StoreContext.Provider value={{basket,setBasket,removeItem}}>
        {children}
    </StoreContext.Provider>)
}
