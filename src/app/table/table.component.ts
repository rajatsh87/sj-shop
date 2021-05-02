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
    this.tSrvice.deleteTransaction(id)
  }

  filter() {
    console.log("search:", this.search)
    this.filteredTrans = this.transactions.filter(trans => {
      const conatct: string = "" + trans.mobileNo
      if (trans.name.includes(this.search) || trans.address.includes(this.search)
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
