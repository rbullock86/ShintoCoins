import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  _balance: number;
  _value: number;
  _coinCount: number;
  _numberToSell: number;
  _status: string;

  constructor(private _httpService : HttpService) {
   }

  ngOnInit() {
    this._balance = this._httpService.balance;
    this._coinCount = this._httpService.coinCount;
    this._value = this._httpService.value;
    this._numberToSell = null;
    this._status = "";
  }

  sellCoins(){
    if (this._numberToSell > this._coinCount){
      this._status = "You cannot sell more coins than you own."
    }
    else{
      // for loop to measure changing value per coin
      let _totalValue = 0;
      for (let i = 0; i  < this._numberToSell; i++){
        _totalValue += this._httpService.value;
        this._httpService.valueChange("Sell");
      }
      console.log("Total value of sold coins:", _totalValue);
      this._httpService.balance += _totalValue;
      this._httpService.coinCount -= this._numberToSell;
      this._coinCount = this._httpService.coinCount;
      this._balance = this._httpService.balance;
      // add transaction to transactions
      this._httpService.transactions.push({
        id: this._httpService.id,
        action: "Sell",
        amount: this._numberToSell,
        value: (_totalValue/this._numberToSell).toFixed(2)
      })
      this._httpService.id ++;
    }

    this._numberToSell = null;
    this._value = this._httpService.value;


  }

}
