import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  _allTransactions;
  
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(){
    this._allTransactions = this._httpService.getTransactions();
    console.log("Got Transactions:", this._allTransactions);
  }

  getDetails(){
    this._route.params.subscribe((params: Params) => {
      console.log(params['id']) // *********** NEEDS FIXIN!!!! ***************************8
    });
  }
}
