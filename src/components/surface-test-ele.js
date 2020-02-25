import {  html,css } from 'lit-element';
import { DwSurface } from '@dreamworld/dw-surface/dw-surface.js';

export class SurfaceTestEle extends DwSurface{

    // render() {
    //     return html`
    //     ${this._getContentTemplate}
    //     `;
    // }
    // static get styles() {
    //     return css`
    //       :host{
    //         display : block;
    //         margin:16px;
    //         padding : 24px;
    //       }`
    // }

    get _getContentTemplate(){
        return html`
            Hello Custom Surface
            <button @click="${this._clickSort}">Sort</button>

        <button @click="${this._clickLogin}">Login</button>

        <input type="file" name="file" multiple id="uploadFile"></input>
        <button @click="${this._uploadEvent}">Upload</button>
        <button @click="${this._onUndoClick}" >UNDO ARCHIVE</button>
        `;
    }
}
customElements.define('surface-test-ele', SurfaceTestEle);
