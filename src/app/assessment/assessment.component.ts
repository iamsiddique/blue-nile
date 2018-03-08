import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  constructor() {}
  public today;
  public h = 3;
  public m = 0;
  public s = 0;
  public hh;
  public mm;
  public ss;
  public hr;
  public min;
  public sec;
  public t;
  public count = 1;
  public combined; 
  public datas = [{
  	 question: 'question 1',
  	 choices:[
  	 'choice1','choice2', 'choice3'
  	],
  	 timeout: '2:00',
     timetaken:''
  },{
  	 question: 'question 2',
  	choices:[
  	 'choice1','choice2', 'choice3'
  	],
  	 timeout: '3:00',
     timetaken:''
  },{
  	 question: 'question 3',
  	 choices:[
  	 'choice1','choice2', 'choice3'
  	],
  	 timeout: '1:00',
     timetaken:''
  },{
  	 question: 'question 4',
  	choices:[
  	 'choice1','choice2', 'choice3'
  	],
  	 timeout: '4:00',
     timetaken:''
  }]

  ngOnInit() {
  	this.startTime();
  	this.startTimer();
  	this.startQuestionTimer(0,this.datas[0].timeout);
  }
  checkTime(i): void {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

  

startTime(): void {
  this.today = new Date();
  this.hr = this.today.getHours();
  this.min = this.today.getMinutes();
  this.sec = this.today.getSeconds();
  this.min = this.checkTime(this.min);
  this.sec = this.checkTime(this.sec);
  console.log(this.hr+':'+this.min+':'+this.sec);
  
};

calcTime(i): void { 
  console.log(this.hr+':'+this.min+':'+this.sec);
  this.today = new Date();  
  console.log(this.today.getHours()+':'+this.today.getMinutes()+':'+this.today.getSeconds());
  this.hr =  Math.abs(this.today.getHours() - this.hr);
  this.min = Math.abs(this.today.getMinutes() - this.min);
  this.sec = Math.abs(this.today.getSeconds() - this.sec);
  console.log(this.hr+':'+this.min+':'+this.sec);
  this.datas[i].timetaken = this.hr+':'+this.min+':'+this.sec;
  this.startTime()
  console.log(this.datas);
}


startTimer(): void {

  this.m;
  this.s = this.checkSecond((this.s - 1));

  if(this.s==59 && this.m == 0){
  	this.m=59
  }
  else if (this.s==59 && this.m != 0){
  	this.m=this.m - 1;
  }
  if(this.s==59 && this.m == 59){  	
  	this.h = this.h -1;
  }
  
  if(this.h ==0 && this.m == 0 && this.s == 0){return}
  
 
  setTimeout(()=>{
  	this.startTimer();
  }, 1000);
}

checkSecond(sec):void {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

increaseCount():void {
	if(this.count != this.datas.length){
    this.calcTime(this.count-1);
		this.count = this.count+1;    
		this.startQuestionTimer(this.count-1,this.datas[this.count-1].timeout)
	}
  else{
    this.calcTime(this.count-1);
  }
	
}

startQuestionTimer(qsn,data): void {
	let array = data.split(/[:]+/);
	let m = array[0];
	let s = array[1];

  //this.m;
  s = this.checkSecond((s - 1));

  if(s==59){m=m-1}
  if(m<0){this.increaseCount(); return}
  this.mm = m;
  this.ss = s;
  this.combined = this.mm +':'+this.ss;

 if(qsn+1== this.count){
 	setTimeout(()=>{
  	this.startQuestionTimer(qsn,this.combined);
  }, 1000);
 }

  
}
}
