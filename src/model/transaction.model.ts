export class Tansaction{
    name:string
    address:string
    amount:number
    mobileNo:number
    pageNo:number
    id:string
    
    constructor(name:string,address:string,amount:number,mobile:number,page:number,id:string){
        this.name=name
        this.address=address
        this.amount=amount
        this.mobileNo=mobile
        this.pageNo=page
        this.id=id
    }
}