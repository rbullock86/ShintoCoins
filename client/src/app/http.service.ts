import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  value;
  transactions = [];
  coinCount;
  problems = [
    {question: "What is 4 + 6?", answer: 10},
    {question: "What is your quest?", answer: 74207402394023943209},
    {question: "What is 10- 0?", answer: 10}
  ]

  constructor(private _http : HttpClient ) {
    this.value = 10;
    this.transactions = []; 
    this.coinCount = 0;
  }

  getProblems(){
    return this.problems;
  }
  
  getTransactions(){
    return this.transactions;
  }  

  getDetails(num){
    return this.transactions[num];
  }

  valueChange(action){
    if(action == "Mine"){
      this.value = (this.value*(.98)).toFixed(2);
    }
    else if(action =="Sell"){
      this.value = (this.value*(.96)).toFixed(2);
    }
    else if(action =="Buy"){
      this.value = (this.value*(1.04)).toFixed(2);
    }
  }
}
