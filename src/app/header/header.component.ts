import {Component,Input, OnInit} from '@angular/core';
import {PopoverController} from 'ionic-angular'

import {Header} from '../model/header'


import {LoggedInUserProfileComponent} from '../userProfilePage/userProfile.component'


@Component({
selector:'mainHeader',
templateUrl:'header.template.html'
})

export class HeaderComponent implements OnInit{

@Input() title:string;

header:Header;

 constructor(public popOverController:PopoverController)
    {      
    }

ngOnInit(){
this.header=new Header();
this.header.title=this.title;

}

 presentPopover(e) {
    let popover = this.popOverController.create(LoggedInUserProfileComponent);
    popover.present({ev: e});
  }

}

