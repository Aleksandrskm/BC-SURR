'use strict';
import {initPageAdd} from "./pages/AddTlePage.js";
import {initPageView} from "./pages/ViewTlePage.js";
import {initMainPage} from "./pages/MainPage.js";

document.addEventListener('DOMContentLoaded',function(){
  if (window.location.pathname ===`/`){
    initMainPage()
  }
  if (window.location.pathname ==='/view_tle') {
    initPageView()
  }
  if ( window.location.pathname ==='/add_TLE') {
    initPageAdd()
  }
})




