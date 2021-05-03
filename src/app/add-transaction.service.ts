import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor( private http:HttpClient) { }
  transactions:any[]=[]
  transactionsChanged=new Subject<any[]>()

  addTransaction (dataV:any){
    const new_id=new Date().getTime()
    console.log(new_id)
    const data={...dataV,id:new_id}
    this.transactions.push(data)

    this.http.put("https://sj-shop-c9d10-default-rtdb.asia-southeast1.firebasedatabase.app/transaction.json",this.transactions).subscribe(data=>{
      // console.log(data)
    })
    this.pushTansactions()
  }

  getTansactions(){
    this.http.get<any[]>("https://sj-shop-c9d10-default-rtdb.asia-southeast1.firebasedatabase.app/transaction.json").subscribe(data=>{
      // console.log(data)
      if(data){
        this.transactions=data
        if(this.transactions)
        this.pushTansactions()
      }
    })
  }

  updateTransaction(data:any,id:number){
    data={...data,id:id}
    this.transactions[id]=data
     this.http.put("https://sj-shop-c9d10-default-rtdb.asia-southeast1.firebasedatabase.app/transaction.json",this.transactions).subscribe(data=>{
      // console.log(data)
    })
    this.pushTansactions()
  }

  deleteTransaction(id:any){
    const newTrans=this.transactions.filter(data=>{
      if(data.id!==id)
        return true
        return false
    })
    this.http.put("https://sj-shop-c9d10-default-rtdb.asia-southeast1.firebasedatabase.app/transaction.json",newTrans).subscribe(data=>{
      // console.log(data)
    })
    this.transactions=newTrans
    this.pushTansactions()
  }

  getTransactionById(id:any){
    const val=this.transactions.filter(trans=>{
      if(trans.id==id)
        return true
        return false
    })
    return val[0]
  }

  pushTansactions(){
    this.transactionsChanged.next(this.transactions.slice())
  }

}

