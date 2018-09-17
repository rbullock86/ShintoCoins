import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  answerGiven: Number;
  _grabProblem;
  _allProblems;
  _hasAnswered: Boolean = false;
  _status = "";
  _coinCount;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this._hasAnswered = false;
    this.getProblems();
    this.grabProblem();
  }

  getProblems(){
    this._allProblems = this._httpService.getProblems();
    console.log("Got all problems:",this._allProblems);
  }

  grabProblem(){
    let _problemNumber = Math.floor(Math.random() * this._allProblems.length);
    this._grabProblem = this._allProblems[_problemNumber];
    console.log("Grabbed problem:", this._grabProblem);
  }

  mineAnswer(){
    this._hasAnswered = true;
    if (this.answerGiven == this._grabProblem.answer){
      this._httpService.coinCount += 1;
      this._coinCount = this._httpService.coinCount;
      console.log("Current Coin Count:", this._httpService.coinCount);
      this._status = "Congratulations. You earned a coin."
      this._httpService.valueChange("Mine")
      this._httpService.transactions.push({
        action: "Mine",
        amount: 1,
        value: this._httpService.value
      })
      console.log("Current Coin Value:", this._httpService.value);
      this.grabProblem();
      this.answerGiven=null;
    }
    else{
      this._status = "Sorry. You answered incorrectly."
      this.grabProblem();
    }
  }

}
