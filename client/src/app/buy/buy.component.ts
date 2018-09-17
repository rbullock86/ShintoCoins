import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  _balance: number;
  _coinCount: number;
  _value: number;
  _numberToBuy: number;
  _totalValue: number;
  _averageValue: number;
  _status: string;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this._balance = this._httpService.balance;
    this._coinCount = this._httpService.coinCount;
    this._value = this._httpService.value;
    this._numberToBuy = null;
    this._totalValue = 0;
    this._averageValue = null;
    this._status = "";
  }

  buyCoins(){
    this._totalValue = 0;
    let originalValue = this._httpService.value;
    console.log("Number to Buy:",this._numberToBuy);
    // value changes per individual coin bought, so we loop through for each coin
    for(let i = 0; i < this._numberToBuy; i++){
      console.log("Total Value/iteration:",this._totalValue,i+1);
      this._totalValue += this._httpService.value;
      this._httpService.valueChange("Buy");
    }

    // Overdrafting balances should reset to previous settings.
    if(this._totalValue > this._httpService.balance){
      this._httpService.value = originalValue;
      this._status = "Sorry but you overdrafted."
    }

    else{
      this._httpService.coinCount += this._numberToBuy;
      this._httpService.balance -= this._totalValue;
      console.log("New Balance:", this._httpService.balance);
      console.log("Coin Count:", this._httpService.coinCount);
      this._coinCount = this._httpService.coinCount;
      this._balance = this._httpService.balance;
      this._value = this._httpService.value;
      this._status = "";
      this._averageValue = Number((this._totalValue/this._numberToBuy).toFixed(2));

      // recording the transaction
      this._httpService.transactions.push({
        id: this._httpService.id,
        action: "Buy",
        amount: this._numberToBuy,
        value: this._averageValue
      })
      this._httpService.id ++;
    }

    console.log("Total Value of Purchase:",this._totalValue);
    console.log("Average Value:", this._averageValue);

    // update variables

    this._totalValue = 0;
    this._numberToBuy = 0;
    this._averageValue = 0;
  }

}
