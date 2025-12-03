
import {startDateTimer} from '../components/Timer.js';
import { viewDefaulBc } from '../features/flows/viewDefaultBc.js';
import { viewDefaulTles } from '../features/flows/viewDefaulTles.js';
import { eventSend } from '../features/flows/eventSendFlow.js';
import {onBcFileChange} from "../features/flows/helpers/handleBcFile.js";
import { onTlesFileChange } from "../features/flows/helpers/handleTleFile.js";


export function initPage() {
    startDateTimer('#timer');
    setupEventListeners()
}


function setupEventListeners() {
    document.getElementById('task-btn-TLE').disabled = true;
    document.getElementById('download-tle-surr').addEventListener('click', viewDefaulTles);
    document.getElementById('download-bc-surr').addEventListener('click', viewDefaulBc);
    document.getElementById('task-btn-TLE').addEventListener('click', eventSend);
    document.getElementById('get_TLE').addEventListener('change', onBcFileChange);
    document.getElementById('get_TLEs').addEventListener('change', onTlesFileChange);
}

