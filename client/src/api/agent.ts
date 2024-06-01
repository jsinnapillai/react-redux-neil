import axios, { AxiosError, AxiosResponse } from "axios";
import { Route } from "react-router-dom";
import { toast } from "react-toastify";
import { router } from "../app/router/Routes";

axios.defaults.baseURL = "http://localhost:5159/api/"

const sleep = ()=> new Promise(resolve => setTimeout(resolve,500 ));

const responseBody = (response:AxiosResponse) => response.data;

axios.interceptors.response.use( async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
 
    const {data,status} = error.response! as AxiosResponse;
 

    switch(status)
    {
        case 400:
                if(data.errors){
                    const modalStateErrors: string[] = []
                    for(const key in data.errors )
                        {
                            if (data.errors[key] ){
                                modalStateErrors.push(data.errors[key])
                            }
                        }
                        throw modalStateErrors.flat();
                }

            toast.error(data.title);
            break;
        case 401:
             toast.error(data.title);    
             break;
        case 404:
             toast.error(data.title);
             break
        case 500:
            router.navigate("/server-error",{state:{error:data}})
            break;
        default:
            break;

    }
    return Promise.reject(error.response);

});

// Sample for regular function
// conat responseBodyFn = (response:AxiosResponse) => {
//     return response.data
// }

// function responseBodyFn1(response:AxiosResponse)  {
//     return response.data
// }

const request = {
    get:(url:string) => axios.get(url).then(responseBody),
    post:(url:string, body:{}) => axios.post(url,body).then(responseBody),
    put:(url:string, body:{}) => axios.put(url,body).then(responseBody),
    delete:(url:string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => request.get('products'),
    details: (id:number) => request.get(`products/${id}`)
}


const TestErrors = {
    get400Error: () => request.get('Buggy/bad-request'),
    get401Error: () => request.get('Buggy/unauthorized'),
    get404Error: () => request.get('Buggy/not-found'),
    get500Error: () => request.get('Buggy/server-error'),
    getValidationError: () => request.get('Buggy/validation-error'),




}
const agent = {
    Catalog,
    TestErrors
}

export default agent;