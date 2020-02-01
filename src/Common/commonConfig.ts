

export interface ICommonConfig{
    formFieldToCheck:string[];
    userMangementBaseUrl:string;
    defaultPageSize:number
}


export const config:ICommonConfig={
    formFieldToCheck:['firstName','lastName','email','password','position'],
    userMangementBaseUrl:'http://localhost:8000',
    defaultPageSize:10
}