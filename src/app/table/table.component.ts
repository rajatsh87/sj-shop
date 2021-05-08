import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../add-transaction.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  search: any
  transactions: any[] = []
  filteredTrans: any[] = []
  constructor(private tSrvice: TransactionService) { }

  ngOnInit(): void {
    this.tSrvice.getTansactions()
    this.tSrvice.transactionsChanged.subscribe(newData => {
      this.transactions = newData
      console.log(newData)
      this.clear()
    })
  }

  delete(id: any) {
    console.log("id for deletion=",id)
    this.tSrvice.deleteTransaction(id)
  }

  filter() {
    this.filteredTrans = this.transactions.filter(trans => {
      const name1=trans.name.toLowerCase();
      const add=trans.address.toLowerCase();
      const conatct: string = "" + trans.mobileNo
      const search1=this.search.toLowerCase();
      console.log("search:", search1)
      if (name1.includes(search1) || add.includes(this.search)
        || conatct.includes(this.search)) {
          // console.log("vaild for:",trans)
        return true
      }
      // console.log("invaild for:",trans)
      return false
    })
  }

  clear() {
    this.filteredTrans = this.transactions
  }

}
