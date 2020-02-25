/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {LitElement, html ,css} from 'lit-element';

import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

import { PageViewElement } from './page-view-element.js';
import {repeat} from 'lit-html/directives/repeat';

import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';

import custom from '../reducers/custom.js';

import '@polymer/paper-spinner/paper-spinner.js';
import '@dreamworld/dw-form/dw-form';
import '@dreamworld/dw-input/dw-input';
import '@dreamworld/dw-input/dw-email-input';
import '@dreamworld/dw-radio-button/dw-radio-button';
import '@dreamworld/dw-checkbox/dw-checkbox';
import '@dreamworld/dw-surface/dw-surface';
import './surface-test-ele';
import '@dreamworld/dw-button/dw-button';

store.addReducers({
  custom
});
var clicks = 1;
class MyView4 extends connect(store)(LitElement) {

  
  static get styles() {
    return css`
      :host{
        display : block;
      }

      /* [active]{
        color : red;
      } */
      ::slotted(h2) { color: var(--themeColor,sandybrown); }
      /* ::slotted(*) {
        color : blue;
      } */
      .loading{
        display:block;
      }
      dw-input{
        width : 200px;

      }
      dw-surface{
        margin:14px;
        padding:24px;
      }
    `;
  }

  static get properties() {
    return {
      name: { 
        type: String,
        // attribute: false,
        // reflect: true
      },
      active: { type: Boolean },
      list: {type: Array},
      classes: {type:Object},
      styles: {type:Object},
      loading: {type:Boolean},
      _loading: {type:Boolean},
      archiveList: {type :Array}
    };
  }

  constructor(){
    super();

    this.classes = { mydiv: true, someclass: false };
    this.styles = { color: 'white', fontFamily: 'Roboto' ,padding:'18px',backgroundColor:`${this.loading?'green':'red'}`};

    this.list = [
      { 'user': 'Dhruval',   'age': 48 },
      { 'user': 'barney', 'age': 36 },
      { 'user': 'fred',   'age': 40 },
      { 'user': 'Kodinariya', 'age': 34 }
    ];
    this.name = "ABC";
    
  }

  render() {
      // console.log("render called")
      
      const archiveList = this.archiveList;
      const aList = archiveList ? Object.keys(this.archiveList).map((item)=>this.archiveList[item]):[];
    return html`
    <surface-test-ele></surface-test-ele>
    
      <!-- <dw-radio-button>One</dw-radio-button>
      <dw-radio-button>Two</dw-radio-button>
      <dw-radio-button>Three</dw-radio-button>
      <input type="radio" >One</input>
      <input type="radio" >One</input>
      <input type="radio" >One</input>

      <dw-radio-group name="fruit">
        <dw-radio-button name="fruit" id="1"> apple</dw-radio-button>
        <dw-radio-button name="fruit" id="2">banana</dw-radio-button>
        <dw-radio-button name="fruit" id="3">orange</dw-radio-button>
      </dw-radio-group>
      <h2> Radio button group with pre selected</h2>
      <dw-radio-group name="fruit1" value="2">
        <dw-radio-button name="fruit1" id="1">apple</dw-radio-button>
        <dw-radio-button name="fruit1" id="2">banana</dw-radio-button>
        <dw-radio-button name="fruit1" id="3">orange</dw-radio-button>
      </dw-radio-group> -->

      
    <dw-form>
    <dw-checkbox name="c1" indeterminate></dw-checkbox>
      <dw-checkbox name="c2"></dw-checkbox>
      <dw-checkbox checked name="c3"></dw-checkbox>
      <dw-checkbox name="c4"></dw-checkbox>
      <dw-checkbox name="c5"></dw-checkbox>
    <!-- <dw-radio-group name="fruits" value="two"> -->
      
    <!-- </dw-radio-group> -->
    
      <dw-input label="Name" .validator="${this._customValidator}" placeholder="Enter name here" autoSelect required hint="Hint text" name="first" id="firstEle" errorMessage="Required" @esc="${()=>{ console.log('esc pressed.') }}" @enter="${ ()=>{console.log('enter pressed.')}}" @value-changed="${(e)=>{ console.log('value changed::',e.detail.value);store.dispatch({type:'INPUT_CHANGED',input: e.detail.value})}}" @blur="${()=>{console.log('blur input event.')}}" @change="${(e)=>{}}"></dw-input>

      <dw-input label="Number" disabled allowedPattern="[0-9]" value="12" name="second"></dw-input>

      <dw-input label="Number" readOnly icon='search' iconTrailing='add_comment' name="third"></dw-input>

      <dw-email-input name="fourth" required label="Email"></dw-email-input>

      <dw-input value="12" originalValue="12" highLightOnChanged name="fifth"></dw-input>
    </dw-form>
      <div active class="${classMap(this.classes)}" style=${styleMap({ color: 'white', fontFamily: 'Roboto' ,padding:'18px',backgroundColor:`${this.loading?'green':'red'}`})}>view 4</div>
      <h3 active>${this.name}</h3>
      ${this._loading ? html`<paper-spinner active></paper-spinner>` : null}
      <button @click="${this._clickButton}">Click</button>
      <slot></slot>
      <!-- <h3><slot name="text"></slot></h3> -->
      <dw-surface elevation="24">
      ${this.list.map((item, index) =>
        html`<li>${item.user}&nbsp;</li>`)}
        </div>
        <p>Repeat directives example</p>
        ${repeat(this.list,(i)=>i.user,(i,index)=>
          html`<li>${i.user}</li>`
        )}

        <button @click="${this._clickSort}">Sort</button>

        <button @click="${this._clickLogin}">Login</button>

        <input type="file" name="file" multiple id="uploadFile"></input>
        <button @click="${this._uploadEvent}">Upload</button>
        <button @click="${this._onUndoClick}" >UNDO ARCHIVE</button>
        ${repeat(aList,(i)=>i.id,(i,index)=>
        html `${!i.archive?html`<li>${i.name}</li><button id="${i.id}" @click="${()=>{store.dispatch({type:'ARCHIVE',archiveId: `${i.id}_${i.name}`,id:i.id})}}">Archive</button>`:null}`
        )}
        <dw-input label="TEST"></dw-input>
        <dw-button label="Click" icon="alarm"></dw-button>
        <input type="text"/>
        </dw-surface>
    `;
  }

  connectedCallback(){
      super.connectedCallback();
      // console.log("connectedCallback called")
  }
  disconnectedCallback(){
    super.disconnectedCallback();
    // console.log('disconnectedCallback called.')
  }
  
  firstUpdated(){
    //   console.log("firstUpdated called")
    // this.shadowRoot.querySelector('#firstEle').formatText((value)=>{
    //   return value+value;
    // })
  }

  shouldUpdate(){
    // console.log('view4 properties changed.')
    return this.active;
  }

  _clickSort(){
    
    
    // console.log('clicked::',this.list.sort())
    // this.list = _.sortBy(this.list,["user"]);
    this.list = _.sortBy(this.list,["user"]);
    // console.log('clicked::',this.list)
    // this.requestUpdate()
  }

  updated(changedProperties){
    if(changedProperties.has('archiveList')){
      // this.requestUpdate();
      console.log('updated')
    }
    // console.log("name changed::",this.name,changedProperties);
  }

  _clickButton(e){
      // console.log("Button clicked::",e.target)
      // this.dispatchEvent(new CustomEvent('custom-click',{
      //     bubbles: true,
      //     composed: true
      // }));
      // this.classes = {...this.classes,loading:true}
      // this.styles = {...this.styles,backgroundColor:'green'}
      this.loading = true;

      // store.dispatch({type : 'INPUT_CHANGING', value : clicks});
      // clicks++;
      // store.dispatch({type : 'CUSTOM_ACTION', value : 'rand'});
      // store.dispatch({type:'CLICK_EVENT',payload:'ALL'})
      // store.dispatch({type:'INPUT_CHANGED',payload:'ALL'})


      // let rand = Math.floor(Math.random()*10)%3;
      // rand +=1;
      // switch(rand){
      //   case 1:
      //     return store.dispatch({type : 'ACTION_1', value : rand});
      //   case 2:
      //     return store.dispatch({type : 'ACTION_2', value : rand});
      //   case 3:
      //     return store.dispatch({type : 'ACTION_3', value : rand});
      // }
      
      
  }

  _clickLogin(){
      store.dispatch({type:'LOGIN_REQUESTED',user:'dreamworld',password:'dreamw0rld@123'});
  }

  _clickLogout(){
    store.dispatch({type:'LOGOUT_REQUESTED'});
}


  _uploadEvent(){
      let file = this.shadowRoot.querySelector("#uploadFile");
      console.log('File::',file.files)
      let formData = new FormData();
      formData.append("name","Dhruval")
      formData.append("email","dhruvalkodinariya@gmail.com")
      for (let index = 0; index < file.files.length; index++) {
        formData.append("file", file.files[index]);
      }
      console.log("formData::",formData.getAll("file"))
      
      return fetch('http://localhost:8080/upload',{
        method:'POST',
        headers:{
          
        },
        body : formData
      })
            .then(()=>{
              console.log('file sent successfully..')
            })
  }

  _customValidator(value){
    return value==='Dhruval';
  }

  _onUndoClick(){
    // store.dispatch({type:'UNDO',id:})
  }

  stateChanged(state){
    this._loading = state.custom.loading;
    this.archiveList = state.custom.list;
  }

}

window.customElements.define('my-view4', MyView4);
