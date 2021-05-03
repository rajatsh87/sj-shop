import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router'

import { TransactionService } from '../add-transaction.service';


@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  // @ViewChild('f', { static: false }) createEventForm: NgForm
  id:any
  name:string=""
  address:string=""
  mobile:any
  pgNo:any
  amount:any
  message=false
  constructor(private tService:TransactionService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this. id=this.route.snapshot.params['id']
    if(this.id){
      const data=this.tService.getTransactionById(this.id)
      console.log(this.tService.getTransactionById(this.id))
      this.name=data.name
      this.address=data.address
      this.mobile=data.mobileNo
      this.pgNo=data.pageNo
      this.amount=data.amount
    }
  }

  submit(formDetails:NgForm){
    let data=formDetails.form.value
    if(!this.id)
      this.tService.addTransaction(data)
    else{
      // console.log("updated log:",data)
      data={...data,id:this.id}
      const pos=this.tService.getPosById(this.id)
      console.log('pos:',pos)
      this.tService.updateTransaction(data, pos)
    }
    this.message=true
  }
}
