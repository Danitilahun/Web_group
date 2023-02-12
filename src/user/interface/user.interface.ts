export interface User {
    id?:string;
    firstname: string,
    lastname: string,
    phonenumber:string,
    password:string,
    email:string,
    securityquestion: {
        question : string,
        answer : string },
    status:string,
    country:string,
    city:string,
    date:string,
}