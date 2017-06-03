import { Injectable } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class MetaTagService {
    constructor(private _router: Router,private _meta: Meta, private _title: Title) {

    }

    setmetatags_singlepost(metatitle , metadescription , metakeywords , metaimage , metaurl='' ){

        console.log(metatitle)
        debugger;

        this._title.setTitle(metatitle);
        this._meta.updateTag({ name: 'description', content: metadescription });      
        this._meta.updateTag({ name: 'keywords', content: metakeywords });      

        /* Facebook */
        this._meta.updateTag({ content: metatitle}, "property='og:title'");
        this._meta.updateTag({ content: metaimage }, "property='og:image'");
        this._meta.updateTag({ content: metadescription }, "property='og:description'");
        this._meta.updateTag({ content: 'http://www.praveenrana.com/'+metaurl }, "property='og:url'");
        this._meta.updateTag({ content: 'article'}, "property='og:type'");

        /* Twitter Tags */
        this._meta.updateTag({ name: 'twitter:title', content: metatitle });      
        this._meta.updateTag({ name: 'twitter:description', content: metadescription });      
        this._meta.updateTag({ name: 'twitter:image', content: metaimage });  

    }

    metatags_contact(metatitle , metadescription , metakeywords){

        this._title.setTitle(metatitle);
        this._meta.updateTag({ name: 'description', content: metadescription });      
        this._meta.updateTag({ name: 'keywords', content: metakeywords });      

    }

    metatags_about(metatitle , metadescription , metakeywords){

        this._title.setTitle(metatitle);
        this._meta.updateTag({ name: 'description', content: metadescription });      
        this._meta.updateTag({ name: 'keywords', content: metakeywords });      

    }    

}