'use strict';
class Loader {
  /**
   * Конструктор класса загрузчика.
   * 
   * @param {string} selector - селектор элемента загрузчика.
   */
  constructor(selector, delay = 300) {
      this.delay = delay;
      /**
       * DOM-элемент, представляющий загрузчик.
       * @type {HTMLElement}
       */
      this.element = document.querySelector(selector);
      /**
       * DOM-элемент, представляющий заголовок загрузчика.
       * @type {HTMLElement}
       */
      this.titleElement = this.element.querySelector('.loader-container__title');

      this.isLoading = false;
  }

  /**
   * Открывает загрузчик.
   * 
   * Этот метод удаляет класс 'loder-container--hidden' у элемента загрузчика,
   * что приведет к его отображению.
   */
  open() {
      this.isLoading = true;
      setTimeout(() => {
          if (!this.isLoading) return;
          this.element.classList.remove('loader-container--hidden');
      }, this.delay);
  }

  /**
   * Скрывает загрузчик.
   * 
   * Этот метод добавляет класс 'loder-container--hidden' к элементу загрузчика,
   * что приведет к его скрытию.
   */
  close() {
      this.isLoading = false;
      this.element.classList.add('loader-container--hidden');
  }

  /**
   * Устанавливает заголовок загрузчика и открывает его.
   *
   * @param {string} title - Заголовок загрузчика.
   */
  show(title) {
      // Устанавливаем заголовок загрузчика
      this.titleElement.innerText = title;
      this.open()
  }
}
class dataTle
{
  constructor(ID,NAIM,NAIM_RUS,KOD_NORAD,TLE_CLASSIFICATION,TLE_NAME,TLE_INTERNATIONAL_CLASS,TLE_EPOCH_YEAR,TLE_EPOCH_TIME,TLE_ELEMENT_VERSION
    ,TLE_NOMER_VITKA,TLE_LINE1,TLE_CONTROL_SUM_LINE1,DATA_BEG,TLE_PERV_PROIZV,TLE_VTOR_PROIZV,TLE_KOEF_TORM,TLE_NAKLON,TLE_DOLGOTA_UZLA,TLE_ECSCENTR,
    TLE_PERICENTR,TLE_MEAN_ANOMALY,TLE_MEAN_MOTION,TLE_LINE2,TLE_CONTROL_SUM_LINE2
  ){
      this.ID=ID;
      this.NAIM=NAIM;
      this.NAIM_RUS=NAIM_RUS;
      this.KOD_NORAD=KOD_NORAD;
      this.TLE_CLASSIFICATION=TLE_CLASSIFICATION;
      this.TLE_NAME=TLE_NAME;
      this.TLE_INTERNATIONAL_CLASS=TLE_INTERNATIONAL_CLASS;
      this.TLE_EPOCH_YEAR=TLE_EPOCH_YEAR;
      this.TLE_EPOCH_TIME=TLE_EPOCH_TIME;
      this.TLE_ELEMENT_VERSION=TLE_ELEMENT_VERSION;
      this.TLE_NOMER_VITKA=TLE_NOMER_VITKA;
      this.TLE_LINE1=TLE_LINE1;
      this.TLE_CONTROL_SUM_LINE1=TLE_CONTROL_SUM_LINE1;
      this.DATA_BEG=DATA_BEG;
      this.TLE_PERV_PROIZV=TLE_PERV_PROIZV;
      this.TLE_VTOR_PROIZV=TLE_VTOR_PROIZV;
      this.TLE_KOEF_TORM=TLE_KOEF_TORM;
      this.TLE_NAKLON=TLE_NAKLON;
      this.TLE_DOLGOTA_UZLA=TLE_DOLGOTA_UZLA;
      this.TLE_ECSCENTR=TLE_ECSCENTR;
      this.TLE_PERICENTR=TLE_PERICENTR;
      this.TLE_MEAN_ANOMALY=TLE_MEAN_ANOMALY;
      this.TLE_MEAN_MOTION=TLE_MEAN_MOTION;
      this.TLE_LINE2=TLE_LINE2;
      this.TLE_CONTROL_SUM_LINE2=TLE_CONTROL_SUM_LINE2;
  }
}
function getRandomNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}
function getDateTime() {
  let now     = new Date(); 
  let year    = now.getFullYear();
  let month   = now.getMonth()+1; 
  let day     = now.getDate();
  let hour    = now.getHours();
  let minute  = now.getMinutes();
  let second  = now.getSeconds(); 
  if(month.toString().length == 1) {
       month = '0'+month;
  }
  if(day.toString().length == 1) {
       day = '0'+day;
  }   
  if(hour.toString().length == 1) {
       hour = '0'+hour;
  }
  if(minute.toString().length == 1) {
       minute = '0'+minute;
  }
  if(second.toString().length == 1) {
       second = '0'+second;
  }  
   
  let dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
   return dateTime;
}
function showBegLogRequest(arrClassTlEs,selector){
document.querySelector(`${selector}`).innerHTML+=`<br><span class='header-log'>Начало сеанса:</span>`;
  document.querySelector(`${selector}`).innerHTML+=`<span class='header-log'>Файл: ${document.getElementById('get_TLE').files[0].name} 
  <br>${new Date().toLocaleString()}</span>`;
  for (let datasTle of arrClassTlEs) {
    const logIn=document.createElement('div');
    logIn.innerHTML+=`<br>`;
      for(let fieldTLE in datasTle)
      {
        logIn.innerHTML+=`<div> ${fieldTLE}:${(datasTle[fieldTLE])}</div>`;
        document.querySelector(`${selector}`).append(logIn);
      }
     
  }
  document.querySelector(`${selector}`).innerHTML+=`<br><div>Время отправки запроса: ${new Date().toLocaleString()}</div>`;
}
function showEndLogRequest(selector){
  const logIn=document.createElement('div');
  logIn.innerHTML+=`<br>`;
  logIn.innerHTML+=`<span style="font-size: calc(1.2rem);">Завершение сеанса:</span>`
  document.querySelector(`${selector}`).append(logIn);
  document.querySelector(`${selector}`).innerHTML+=`<span class='header-log'>Время ответа: 
  <br>${new Date().toLocaleString()}</span>`;
  document.querySelector(`${selector}`).innerHTML+=`<span class='header-log'>Данные успешно добавленны</span>`

}
function readLines(fileReader) {
  document.querySelector('.column2_TLE-view').innerHTML=``;
  const arrTLE=[];
  // console.log(fileReader);
  // console.log(fileReader)
  const lines = (fileReader).split("\r\n");
 
  let count_line=0;
  for (const line of lines) {
    arrTLE.push(line);
    count_line++;
  }
  count_line=0;

 for(let i=0;i<arrTLE.length;i++){
  let lineTle=document.createElement('textarea');
  lineTle.innerHTML+=`${arrTLE[i]}`;
  console.log(arrTLE[i])
    document.querySelector('.column2_TLE-view').append(lineTle);  
 }
    
    
  
  console.log(arrTLE)
}
function readLinesValue(fileReader) {
  let tle= new dataTle();
  let jsonTLE={};
  const arrTLE=[];
  const arrClassTlEs=[];
  // console.log(fileReader);
  const lines = (fileReader).split("\r\n");
  // console.log(lines)
  let count_line=0;
  for (const line of lines) {
    if (count_line==3) {
      count_line=0
      arrTLE.push(jsonTLE);
      jsonTLE={};
      arrClassTlEs.push(tle);
      tle=new dataTle();
    }
    processLine(line,count_line,jsonTLE,tle);
    
    count_line++;
  }
  arrTLE.push(jsonTLE);
  arrClassTlEs.push(tle);
  console.log(arrClassTlEs);
  console.log(arrTLE);
  // document.querySelector('.column2_TLE').innerHTML=JSON.stringify(arrClassTlEs);
 
  // document.querySelector('.column2_TLE').innerHTML+=`<br><span class='header-log'>Начало сеанса:</span><br>`;
  let nameFile=document.createElement('span');
  document.querySelector('.name-document').innerHTML='';
  nameFile.classList.add('header-log');
  nameFile.innerHTML=`Файл: ${document.getElementById('get_TLE').files[0].name} 
  ${new Date().toLocaleString()}`;
  document.querySelector('.name-document').append(nameFile);
  
  for(let i=0;i<arrClassTlEs.length;i++){
    arrClassTlEs[i].DATA_BEG=String(new Date().toISOString()).replace('Z','+00:00');
    arrClassTlEs[i].ID=i+1;
    
  }
  // document.querySelector('.column2_TLE').innerHTML+=`<br><span style="
  //            font-size: calc(1.2rem);">Полученные данные:<br></span><span>${JSON.stringify(arrClassTlEs)}</span>`;
  // for (let datasTle of arrClassTlEs) {
  //   const logIn=document.createElement('div');
  //   logIn.innerHTML+=`<br>`;
  //   for(let fieldTLE in datasTle)
  //   {
  //     logIn.innerHTML+=`<div> ${fieldTLE}:${(datasTle[fieldTLE])}</div>`;
     
  //   }
  //   document.querySelector('.column2_TLE').append(logIn);
  // }
  const dataDocument=document.createElement('div');
  dataDocument.classList.add('data-doc');
  arrClassTlEs.forEach(tle=>{
    dataDocument.innerHTML+=`<div>${tle.NAIM}</div>`;
    dataDocument.innerHTML+=`<div>${tle.TLE_LINE1}</div>`;
    dataDocument.innerHTML+=`<div>${tle.TLE_LINE2}</div>`;
    dataDocument.innerHTML+=`<br>`;
  })
  
  document.querySelector('.name-document').append(dataDocument);
  
  return arrClassTlEs
  // document.querySelector('.information_request').innerHTML+=`<div>Полученные данные:${JSON.stringify(arrClassTlEs)}</div>`;
}
// example usage: realtime clock
setInterval(function(){
  let currentTime = getDateTime();
  document.getElementById("timer").innerHTML = currentTime;
}, 0);
function processLine(line,count_line,jsonTLE,tle) {
  let dataTLE;
  
  const arrTLENames=['Номер строки_1','KOD_NORAD',
    'TLE_CLASSIFICATION','TLE_INTERNATIONAL_CLASS1',
    'TLE_INTERNATIONAL_CLASS2',
    'TLE_EPOCH_YEAR','TLE_EPOCH_TIME',
    'TLE_PERV_PROIZV','TLE_VTOR_PROIZV'
  ,'TLE_KOEF_TORM',
  'ephemeris_type',
  'TLE_ELEMENT_VERSION',
  'TLE_CONTROL_SUM_LINE1'];
  const arrTLENames_two=['Номер строки_2','Номер спутника в базе данных NORAD_2',
    'TLE_NAKLON','TLE_DOLGOTA_UZLA'
    ,'TLE_ECSCENTR',
    'TLE_PERICENTR',
    'TLE_MEAN_ANOMALY',
    'TLE_MEAN_MOTION'
  ,'TLE_NOMER_VITKA',
  'TLE_CONTROL_SUM_LINE2'];
  
  dataTLE=line;
  let element='';
  let counter=0;
  
  if (count_line==0) {
    jsonTLE['TLE_NAME']=dataTLE;
    tle.TLE_NAME=dataTLE;
    tle.NAIM=dataTLE;
   
    tle.NAIM_RUS= dataTLE.replace('GONETS','Гонец')
  }
  else if (count_line==1) {
    jsonTLE['TLE_LINE1']=dataTLE;
    tle.TLE_LINE1=dataTLE;
    for (let i = 0; i < dataTLE.length; i++) {
      if (i==0) {
        element+=dataTLE[i];
        const nameField=arrTLENames[counter];
        jsonTLE[nameField]=+element;
        element='';
        counter+=1;
      }
      else if (i>1 && i<7) {
        if (i==6) {
          
          element+=dataTLE[i];
          const nameField=arrTLENames[counter];
          tle.KOD_NORAD=element;
          jsonTLE[nameField]=+element;
          element='';
          counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if(i==7){
        element+=dataTLE[i];
        const nameField=arrTLENames[counter];
        jsonTLE[nameField]=element;
        tle.TLE_CLASSIFICATION=element;
        element='';
        counter+=1;
      } 
      else if (i>7 && i<15) {
        if (i==14) {
          element+=dataTLE[i];
        const nameField=arrTLENames[counter];
        jsonTLE[nameField]=Number(element);
        tle.TLE_INTERNATIONAL_CLASS=(element);
        element='';
        counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      // else if (i>10 && i<14) {
      //   if (i==13) {
      //     element+=dataTLE[i];
      //   const nameField=arrTLENames[counter];
      //   jsonTLE[nameField]=element;
      //   element='';
      //   counter+=1;
      //   }
      //   else{
      //     element+=dataTLE[i];
      //   }
      // }
      // else if (i>10 && i<15) {
      //   if (i==14) {
      //     element+=dataTLE[i];
      //   const nameField=arrTLENames[counter];
      //   jsonTLE[nameField]=element;
      //   tle.TLE_INTERNATIONAL_CLASS2=element;
      //   element='';
      //   counter+=1;
      //   }
      //   else{
      //     element+=dataTLE[i];
      //   }
      // }
      else if (i>17 && i<20) {
        if (i==19) {
          element+=dataTLE[i];
        const nameField=arrTLENames[counter];
        jsonTLE[nameField]=Number(element);
        tle.TLE_EPOCH_YEAR=Number(element);
        // console.log(element)  
        element='';
        counter+=1;
        // console.log(arrTLENames[counter]);
        // console.log(counter);
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i>19 && i<32) {
        
        if (i==31) {
          element+=dataTLE[i];
          const nameField=arrTLENames[counter];
          jsonTLE[nameField]=+(element);
          tle.TLE_EPOCH_TIME=+(element);
          element='';
         
          counter+=1;
        }
        else{
  
          element+=dataTLE[i];
          
        }
      }
      else if (i>32 && i<43) {
        if (i==42) {
          element+=dataTLE[i];
        const nameField=arrTLENames[counter];
        let correctElem
        if (element[0]==' ') {
          correctElem=element.replace(/\s/,'0');
        }
        jsonTLE[nameField]=+correctElem;
        tle.TLE_PERV_PROIZV=+correctElem;
        element='';
        counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i>43 && i<53) {
        if (i==52) {
          let correctElem='';
          let num='',degree='';

          if (element[0]==' ') {
            correctElem=element.replace(/\s/,'0');
            let indexDegree=element.search(/[-+]/);
            
            for (let i = 0; i < indexDegree; i++) {
              num+=correctElem[i];
            }
            
            for (let index = indexDegree; index < correctElem.length; index++) {
               degree += correctElem[index];
              
            }
          }
          element+=dataTLE[i];
          const nameField=arrTLENames[counter];
          jsonTLE[nameField]=Math.pow(+num,+degree);
          tle.TLE_VTOR_PROIZV=Math.pow(+num,+degree);
          element='';
          counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i>52 && i<62) {
        if (i==61) {
          let correctElem='';
          let num='',degree='';

          if (element[0]==' ') {
            correctElem=element.replace(/\s/,'0.');
            // console.log(element)
            let indexDegree=correctElem.search(/[-+]/);
            
            for (let i = 0; i < indexDegree; i++) {
              num+=correctElem[i];
            }
            
            for (let index = indexDegree; index < correctElem.length; index++) {
               degree += correctElem[index];
              
            }
          }
          element+=dataTLE[i];
          const nameField=arrTLENames[counter];
          jsonTLE[nameField]=Math.pow(+num,+degree);
          tle.TLE_KOEF_TORM=Math.pow(+num,+degree);
          element='';
          counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i==62) {
        
        element+=dataTLE[i];
        const nameField=arrTLENames[counter];
        jsonTLE[nameField]=+element;
        
        element='';
        counter+=1;
        
      }
      else if (i>63 && i<68) {
        if (i==67) {
          element+=dataTLE[i];
        const nameField=arrTLENames[counter];
        jsonTLE[nameField]=+element;
        tle.TLE_ELEMENT_VERSION=+element;
        element='';
        counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i==68) {
        
        element+=dataTLE[i];
        const nameField=arrTLENames[counter];
        jsonTLE[nameField]=+element;
        tle.TLE_CONTROL_SUM_LINE1=+element;
        element='';
        counter+=1;
        
      }
      
    }
  }
  else if (count_line==2) {
    jsonTLE['TLE_LINE2']=dataTLE;
    tle.TLE_LINE2=dataTLE;
    for (let i = 0; i < dataTLE.length; i++) {
      if (i==0) {
        element+=dataTLE[i];
        const nameField=arrTLENames_two[counter];
        jsonTLE[nameField]=+element;
        element='';
        counter+=1;
      }
      else if (i>1 && i<7) {
        if (i==6) {
          element+=dataTLE[i];
          const nameField=arrTLENames_two[counter];
          jsonTLE[nameField]=+element;
          element='';
          counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }

      else if (i>8 && i<16) {
        if (i==15) {
          element+=dataTLE[i];
        const nameField=arrTLENames_two[counter];
        jsonTLE[nameField]=+element;
        tle.TLE_NAKLON=+element;
        element='';
        counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i>16 && i<25) {
        if (i==24) {
          element+=dataTLE[i];
        const nameField=arrTLENames_two[counter];
        jsonTLE[nameField]=parseFloat(element);
        tle.TLE_DOLGOTA_UZLA=+element;
        // console.log(element)  
        element='';
        counter+=1;
        // console.log(arrTLENames_two[counter]);
        // console.log(counter);
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i>25 && i<33) {
        
        if (i==32) {
          element+=dataTLE[i];
          const nameField=arrTLENames_two[counter];
          jsonTLE[nameField]=Number('0.'+element);
          tle.TLE_ECSCENTR=Number('0.'+element);
          element='';
         
          counter+=1;
        }
        else{
  
          element+=dataTLE[i];
          
        }
      }
      else if (i>33 && i<42) {
        if (i==41) {
          element+=dataTLE[i];
        const nameField=arrTLENames_two[counter];
        jsonTLE[nameField]=+element;
        tle.TLE_PERICENTR=+element;
        element='';
        counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i>43 && i<51) {
        if (i==50) {
          element+=dataTLE[i];
        const nameField=arrTLENames_two[counter];
        jsonTLE[nameField]=+element;
        tle.TLE_MEAN_ANOMALY=+element;
        element='';
        counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i>51 && i<61) {
        if (i==60) {
          element+=dataTLE[i];
        const nameField=arrTLENames_two[counter];
        jsonTLE[nameField]=+element;
        tle.TLE_MEAN_MOTION=+element;
        element='';
        counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i>62 && i<68) {
        if (i==67) {
          element+=dataTLE[i];
        const nameField=arrTLENames_two[counter];
        jsonTLE[nameField]=+element;
        tle.TLE_NOMER_VITKA=+element;
        element='';
        counter+=1;
        }
        else{
          element+=dataTLE[i];
        }
      }
      else if (i==68) {
        
        element+=dataTLE[i];
        const nameField=arrTLENames_two[counter];
        jsonTLE[nameField]=+element;
        tle.TLE_CONTROL_SUM_LINE2=+element;
        element='';
        counter+=1;
        
      }
      
    }
  
  }
  
 
}
async function postKA(data){
  try {
    const response = await fetch('http://185.192.247.60:7130/ka', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
   
    return result;
  }
  catch (error) {
    console.error("Error add row:", error);
  }
}
function eventSend(){
postKA(arr)
.then(()=>{
  showBegLogRequest(arr,'.information_request');
  showBegLogRequest(arr,'.column2_TLE');
  showEndLogRequest('.information_request');
  showEndLogRequest('.column2_TLE');
  document.getElementById('task-btn-TLE').disabled=true;
})
}
let arr=[];
document.addEventListener('DOMContentLoaded',function(){
  
  if (!document.querySelector('.task-btn-TLE')) {
    function printFiles(e) {  
      const files = e.target.files;   // получаем все выбранные файлы
      for (let file of files) {        // Перебираем все выбранные файлы 
        // создаем объект FileReader для считывания файла
        const reader = new FileReader();
        // console.log(arrTLENames[7]);
        // console.log(reader);
        
        // при успешном чтении файла выводим его содержимое на веб-страницу
        reader.onload = () => {  
              // выводим содержимое
              // dataTLE=reader.result;
              
              // console.log(reader.result);
              
              // let element='';
              // let counter=0;
              // for (let i = 0; i < dataTLE.length; i++) {
              //   if (i==0) {
              //     element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
              //   }
              //   else if (i>1 && i<7) {
              //     if (i==6) {
              //       element+=dataTLE[i];
              //       const nameField=arrTLENames[counter];
              //       jsonTLE[nameField]=element;
              //       element='';
              //       counter+=1;
              //     }
              //     else{
              //       element+=dataTLE[i];
              //     }
              //   }
              //   else if(i==7){
              //     element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
              //   } 
              //   else if (i>7 && i<11) {
              //     if (i==10) {
              //       element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
              //     }
              //     else{
              //       element+=dataTLE[i];
              //     }
              //   }
              //   else if (i>10 && i<14) {
              //     if (i==13) {
              //       element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
              //     }
              //     else{
              //       element+=dataTLE[i];
              //     }
              //   }
              //   else if (i>13 && i<17) {
              //     if (i==16) {
              //       element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
              //     }
              //     else{
              //       element+=dataTLE[i];
              //     }
              //   }
              //   else if (i>17 && i<20) {
              //     if (i==19) {
              //       element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     console.log(element)  
              //     element='';
              //     counter+=1;
              //     console.log(arrTLENames[counter]);
              //     console.log(counter);
              //     }
              //     else{
              //       element+=dataTLE[i];
              //     }
              //   }
              //   else if (i>19 && i<32) {
                  
              //     if (i==31) {
              //       element+=dataTLE[i];
              //       const nameField=arrTLENames[counter];
              //       jsonTLE[nameField]=element;
                   
              //       element='';
                   
              //       counter+=1;
              //     }
              //     else{

              //       element+=dataTLE[i];
                    
              //     }
              //   }
              //   else if (i>32 && i<43) {
              //     if (i==42) {
              //       element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
              //     }
              //     else{
              //       element+=dataTLE[i];
              //     }
              //   }
              //   else if (i>43 && i<52) {
              //     if (i==51) {
              //       element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
              //     }
              //     else{
              //       element+=dataTLE[i];
              //     }
              //   }
              //   else if (i>52 && i<61) {
              //     if (i==60) {
              //       element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
              //     }
              //     else{
              //       element+=dataTLE[i];
              //     }
              //   }
              //   else if (i==62) {
                  
              //     element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
                  
              //   }
              //   else if (i>63 && i<68) {
              //     if (i==67) {
              //       element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
              //     }
              //     else{
              //       element+=dataTLE[i];
              //     }
              //   }
              //   else if (i==68) {
                  
              //     element+=dataTLE[i];
              //     const nameField=arrTLENames[counter];
              //     jsonTLE[nameField]=element;
              //     element='';
              //     counter+=1;
                  
              //   }
                
              // }
              arr= readLinesValue(reader.result);
              console.log(document.getElementById('get_TLE').files[0].name);
              document.querySelector('.input-file-text').innerHTML=`Выбран файл: ${document.getElementById('get_TLE').files[0].name}`;
              document.getElementById('task-btn-TLE').disabled=false;
              // для разделения, если выбрано несколько файлов
              console.log("==============================");
              // console.log(jsonTLE);
              // console.log(JSON.stringify(jsonTLE));
        };
       
        reader.readAsText(file); 
          
        // считываем файл   
      }
  }
  function printFilesTle(e) {  
    const files = e.target.files;   // получаем все выбранные файлы
    for (let file of files) {        // Перебираем все выбранные файлы 
      // создаем объект FileReader для считывания файла
      const reader = new FileReader();
      // console.log(arrTLENames[7]);
      // console.log(reader);
      
      // при успешном чтении файла выводим его содержимое на веб-страницу
      reader.onload = () => {  
            
            console.log(document.getElementById('view_TLE').files[0].name);
            document.querySelector('.input-file-text').innerHTML=`Выбран файл: ${document.getElementById('view_TLE').files[0].name}`;
            readLines(reader.result);
            // для разделения, если выбрано несколько файлов
            console.log("==============================");
            document.getElementById('download-tle').disabled = false;
            // console.log(jsonTLE);
            // console.log(JSON.stringify(jsonTLE));
      };
     
      reader.readAsText(file); 
        
      // считываем файл   
    }
}
if (document.getElementById("view_TLE")) {
  document.getElementById("view_TLE").addEventListener("change", printFilesTle);
  
  document.getElementById('download-tle').disabled = true
  document.getElementById('download-tle').addEventListener('click',()=>{
    const arrBlob=[];
          let indexBlob=0;
           document.querySelectorAll('textarea').forEach(lineTle=>{
            console.log(lineTle.value);
            indexBlob++;
            if (indexBlob==document.querySelectorAll('textarea').length) {
              arrBlob.push(`${String(lineTle.value)}`)
            }
            else{
              arrBlob.push(`${String(lineTle.value)}\r\n`)
            }
           })
           let blob = new Blob(arrBlob, {type: 'text/plain'});
           const link=document.getElementById('link')
           link.href = URL.createObjectURL(blob);
           console.log(blob)
  })
}
  if ( document.getElementById("get_TLE")) {
    document.getElementById('task-btn-TLE').disabled=true;
    document.getElementById("get_TLE").addEventListener("change", printFiles);
    document.getElementById('task-btn-TLE').addEventListener('click',eventSend);
  }
  
  }
})




