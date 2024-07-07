export interface UserLogin {
    email:string; 
    password:string;
}
export interface UserRegister {
    name:string; 
    email:string; 
    password:string;
}
export interface UserRegisterResp{
    id:string;
    name:string; 
    email:string; 
    password:string; 
}

export interface User {
    name: string;
    email: string;
    phone_number: string;
    locationName: string;
    address: string;
    state: string;
    city: string;
    zipcode: string;
    county: string;
    id: number;
    tenantId: number;
  }
  