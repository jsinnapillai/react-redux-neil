import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../app/router/Routes";
import { PaginatedResponse } from "../app/models/pagination";
import { store } from "../app/store/configureStore";

axios.defaults.baseURL = "http://localhost:5159/api/"
axios.defaults.withCredentials = true;


const sleep = ()=> new Promise(resolve => setTimeout(resolve,500 ));



// passing response
const responseBody = (response:AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
 
    const token = store.getState().account.user?.token;

    if(token)
        {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
})



// handling paginarion
axios.interceptors.response.use( async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) 
        {
            response.data = new PaginatedResponse(response.data,JSON.parse(pagination));
            return response;
        }
    return response
}, (error: AxiosError) => {
 
    const {data,status} = error.response! as AxiosResponse;
 
    // console.log('data',data)
    // console.log('status',status)

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
             toast.error("Unauthorized")
            //  toast.error(data.title || 'status === 401');    
             break;
        case 404:
             toast.error(data.title );
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
    get:(url:string, params?:URLSearchParams ) => axios.get(url,{params}).then(responseBody),
    post:(url:string, body:{}) => axios.post(url,body).then(responseBody),
    put:(url:string, body:{}) => axios.put(url,body).then(responseBody),
    delete:(url:string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: ( params?:URLSearchParams ) => request.get('products',params),
    details: (id:number) => request.get(`products/${id}`),
    fetchFilters : () => request.get("products/filters")
}


const Basket = {
    get: () => request.get('Basket'),
    addItem: (productId: number,quantity:number) => request.post(`Basket?proudctId=${productId}&quantity=${quantity}`,{}),
    removeItem: (productId: number,quantity:number) => request.delete(`Basket?productId=${productId}&quantity=${quantity}` )

}


const TestErrors = {
    get400Error: () => request.get('Buggy/bad-request'),
    get401Error: () => request.get('Buggy/unauthorized'),
    get404Error: () => request.get('Buggy/not-found'),
    get500Error: () => request.get('Buggy/server-error'),
    getValidationError: () => request.get('Buggy/validation-error'),
}

const Account = {
    login:(values:any) => request.post('account/login',values),
    register:(values:any) => request.post('account/register',values),
    currentUser:(() => request.get('account/CurrentUser'))


}



const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account
}

export default agent;