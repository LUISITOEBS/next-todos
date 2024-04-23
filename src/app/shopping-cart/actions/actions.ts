'use client';

import { getCookie, hasCookie, setCookie } from "cookies-next";

/*
cart: {
    'uuid': 4,
    'uuid': 8,
    'uuid': 2,
}
*/


export const getCookieCart = (): { [uuid: string]: number } => {
    if( hasCookie('cart') ){
        const cookieCart = JSON.parse( getCookie('cart') as string ?? '{}');
        return cookieCart;
    }
    return {};
}

export const addProduct = ( uuid: string ) => {
    const cookieCart = getCookieCart();
    if( cookieCart[uuid] ){
        cookieCart[uuid] = cookieCart[uuid] + 1;
    }else{
        cookieCart[uuid] = 1;
    }
    setCookie('cart', JSON.stringify( cookieCart ));
}

export const deleteOneProduct = ( uuid: string ) => {
    const cookieCart = getCookieCart();
    if(!cookieCart[uuid]) return;

    if(cookieCart[uuid] > 1 ){
        cookieCart[uuid] = cookieCart[uuid] - 1;
    }else{
        delete cookieCart[uuid];
    } 
    setCookie('cart', JSON.stringify( cookieCart ));
}

export const deleteProduct = ( uuid: string ) => {
    const cookieCart = getCookieCart();
    delete cookieCart[uuid];
    setCookie('cart', JSON.stringify( cookieCart ));
}