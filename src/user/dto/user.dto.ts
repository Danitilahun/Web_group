export class CreateUserDto{ 

 readonly  firstname: string;  
 readonly  lastname: string;  
 readonly  phonenumber:string;  
 readonly  password:string;  
 readonly  email:string;  
 readonly  securityquestion: {
    question : string,
    answer : string };  
 readonly  status:string;  
 readonly  country:string;  
 readonly  city:string;  
 readonly  date:string; 
}