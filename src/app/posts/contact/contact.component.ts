import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service'
import { MetaTagService } from '../../services/meta.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private blogservice: BlogService , private metaservice: MetaTagService) { }

  public msgdelivered : boolean
  public deliveryfailed : boolean

  public msgsending:boolean
  

  public msgobject={
      sendername : '',
      sendermail : '',
      sendermsg : ''
  }  

  ngOnInit() {
    let metatitle="Contact Praveen Rana | Mr. Owl",
    metadescription = "Fill the form to send a message to Praveen",
    metakeywords = "contact praveen rana , contact mr. owl , contact praveen rana Angular"
    this.metaservice.metatags_contact(metatitle , metadescription , metakeywords); 
  }

  sendmsg(){

    //console.log(this.msgobject)

    this.msgsending= true            

    this.blogservice.sendmsg(this.msgobject).subscribe(data=>{
      this.msgsending= false

      //console.log(data)
      if(data.message=='some error'){
        this.deliveryfailed = true;
      }
      else if(data.message=='message sent'){
        this.msgdelivered = true
      }
      this.msgobject.sendername=''
      this.msgobject.sendermail=''
      this.msgobject.sendermsg =''      
    })
  }
}
