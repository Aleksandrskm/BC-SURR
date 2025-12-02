import {TleParser} from '../parsers/TleParser.js';
import {KeplerParser} from "../parsers/KeplerParser.js";
import {viewTleData} from "../../components/tle/TleView.js";
/**
 * Функция преобразует и отображает кеплеровские строки в TLE формате
 * */
export function keplerToTLE(){
    const parserTle = new TleParser();
    const parserKepler = new KeplerParser();
    document.getElementById('data-document').innerHTML=``;
    const arrJoinKepler=[];
    const keplerStrs=document.querySelectorAll('textarea');
    keplerStrs.forEach(keplerStr=>{
        arrJoinKepler.push(keplerStr.value);
    })
    let tle='';
    document.getElementById('data-document').innerHTML=``;
    arrJoinKepler.forEach((keplerStr,index)=>{
        const keplerLine = keplerStr;
        console.log(keplerLine)
        const updatedKeplerElements = parserKepler.parseLinesKepler(keplerLine);
        console.log(updatedKeplerElements)
        tle+=parserTle.getTleLinesFromKepler(updatedKeplerElements,index)
    })
    console.log('tle.trimEnd()',tle.trimEnd())
    viewTleData(tle.trimEnd())
    document.getElementById('task-btn-TLE').disabled=false;
}