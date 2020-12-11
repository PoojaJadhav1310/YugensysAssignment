import { Component } from '@angular/core';
import {UserService} from './user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YugensysAssignment';
  infotxt : any;
  selectedfruit : any ="";
  Fruits: any = ['Apple', 'Pear', 'Banana', 'Orange', 'Dragon'];
  suggestions = [];
  suggestFlag = false;
  constructor(private user : UserService){

  }

  onChangeTextfield(x){
    console.log("selected", x);
    this.user.getSuggestion(
     x
    )
    .subscribe(
      (res: any) => {
        console.log("res:",res);
        if(res.length>0){
          //add two array
          this.suggestFlag = true;
          this.suggestions = res;
          console.log(this.suggestions);
          var arr = [];
          for(let i = 0;i<this.suggestions.length; i++){
            arr[i] = this.suggestions[i]["bestAnswer"];
          }

          
          console.log("arr:",arr)
          console.log(this.Fruits);
          arr.forEach((element) => {
            for(let i=0;i<this.Fruits.length;i++){
              if(this.Fruits[i]==element){
                 this.Fruits.splice(i,1);
              }
            }
           });
           console.log(":",this.Fruits);
           
        }
      });

  }

  // Choose fruit using select dropdown
  changeFruit() {
    console.log("selectedfruit",this.selectedfruit);
    console.log("selected", this.infotxt);
    this.user.updateInfoData(
      this.infotxt,this.selectedfruit
    )
    .subscribe(
      (res: any) => {
        console.log("res:",res);
      });
  }

  myFunction(){
    console.log("selected", this.infotxt);
  }
}
