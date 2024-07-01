import React from 'react'

export const fetchData = (key: string): any | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};


export const useLoaderData = (): { userName: string | null } => {
    const userName = fetchData('userName');
    return { userName };
};


export const deleteItem = (key:string):void => {
    return localStorage.removeItem(key)
}

export const formDataToObject = (formData: FormData): { userName: string } => {
    const data = Object.fromEntries(formData.entries()) as { [key: string]: string };
    return { userName: data.userName };
  };
  
