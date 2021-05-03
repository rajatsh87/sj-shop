import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {from, Subject} from 'rxjs'

import {Tansaction} from '../model/transaction.model'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor( private http:HttpClient) { }
  transactions:Tansaction[]=[]
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

  updateTransaction(data:any, pos:any){
    this.transactions[pos]=data

    // const id=getIdByData(data)
    console.log(data)
    console.log(this.transactions)
     this.http.put("https://sj-shop-c9d10-default-rtdb.asia-southeast1.firebasedatabase.app/transaction.json",this.transactions).subscribe(data=>{
       console.log("transaction updated",data)
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

  getPosById(id:any){
    let pos=0;
    for(let i=0;i<this.transactions.length;i++){
      if(this.transactions[i].id==id){
        console.log("position found=",pos)
        return pos;
      }
      pos++;
    }
    return pos;
  }

  pushTansactions(){
    this.transactionsChanged.next(this.transactions.slice())
  }

}

