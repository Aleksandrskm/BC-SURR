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
  constructor(ID,Naim,Naim_Rus,Kod_NORAD,TLE_Classification,TLE_Name,TLE_International_class,TLE_Epoch_year,TLE_Epoch_Time,TLE_Element_Version
    ,TLE_Nomer_vitka,TLE_line1,TLE_Control_sum_line1,Data_beg,Data_end,TLE_Perv_Proizv,TLE_Vtor_Proizv,TLE_Koef_torm,TLE_Naklon,TLE_Dolgota_uzla,TLE_Ecscentr,
    TLE_Pericentr,TLE_Mean_Anomaly,TLE_Mean_Motion,TLE_line2,TLE_Control_sum_line2,Data
  ){
      this.ID=ID;
      this.Naim=Naim;
      this.Naim_Rus=Naim_Rus;
      this.Kod_NORAD=Kod_NORAD;
      this.TLE_Classification=TLE_Classification;
      this.TLE_Name=TLE_Name;
      this.TLE_International_class=TLE_International_class;
      this.TLE_Epoch_year=TLE_Epoch_year;
      this.TLE_Epoch_Time=TLE_Epoch_Time;
      this.TLE_Element_Version=TLE_Element_Version;
      this.TLE_Nomer_vitka=TLE_Nomer_vitka;
      this.TLE_line1=TLE_line1;
      this.TLE_Control_sum_line1=TLE_Control_sum_line1;
      this.Data_beg=Data_beg;
      this.Data_end=Data_end;
      this.TLE_Perv_Proizv=TLE_Perv_Proizv;
      this.TLE_Vtor_Proizv=TLE_Vtor_Proizv;
      this.TLE_Koef_torm=TLE_Koef_torm;
      this.TLE_Naklon=TLE_Naklon;
      this.TLE_Dolgota_uzla=TLE_Dolgota_uzla;
      this.TLE_Ecscentr=TLE_Ecscentr;
      this.TLE_Pericentr=TLE_Pericentr;
      this.TLE_Mean_Anomaly=TLE_Mean_Anomaly;
      this.TLE_Mean_Motion=TLE_Mean_Motion;
      this.TLE_line2=TLE_line2;
      this.TLE_Control_sum_line2=TLE_Control_sum_line2;
      this.Data=Data;
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
function readLines(fileReader) {

  const arrTLE=[];
  // console.log(fileReader);
  console.log(fileReader)
  const lines = (fileReader).split("\r\n");
  
  let count_line=0;
  for (const line of lines) {
    let lineTle=document.createElement('div');
    if (count_line==3) {
      count_line=0
      lineTle.innerHTML+=`<br>`
    }
   
    lineTle.innerHTML+=`${line}`
    document.querySelector('.column2_TLE').append(lineTle);
    arrTLE.push(line);
    count_line++;
  }
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
    arrClassTlEs[i].Data_beg=String(new Date().toISOString());
    arrClassTlEs[i].Data_end='';
    arrClassTlEs[i].Data='';
    arrClassTlEs[i].ID=i+1;
    
  }
  // document.querySelector('.column2_TLE').innerHTML+=`<br><span style="
  //            font-size: calc(1.2rem);">Полученные данные:<br></span><span>${JSON.stringify(arrClassTlEs)}</span>`;
  for (let datasTle of arrClassTlEs) {
    const logIn=document.createElement('div');
    logIn.innerHTML+=`<br>`;
    for(let fieldTLE in datasTle)
    {
      logIn.innerHTML+=`<div> ${fieldTLE}:${(datasTle[fieldTLE])}</div>`;
     
    }
    document.querySelector('.column2_TLE').append(logIn);
  }
  

  // document.querySelector('.information_request').innerHTML+=`<br><span class='header-log'>Начало сеанса:</span>`;
  // document.querySelector('.information_request').innerHTML+=`<span class='header-log'>Данные получены из документа ${document.getElementById('get_TLE').files[0].name} 
  // <br>${new Date().toLocaleString()}</span>`;
  // for (let datasTle of arrClassTlEs) {
  //   const logIn=document.createElement('div');
  //   logIn.innerHTML+=`<br>`;
  //   logIn.innerHTML+=`<span style="font-size: calc(1.2rem);">Полученные данные:</span>`
  //     for(let fieldTLE in datasTle)
  //     {
  //       logIn.innerHTML+=`<div> ${fieldTLE}:${(datasTle[fieldTLE])}</div>`;
  //       document.querySelector('.information_request').append(logIn);
  //     }
  // }
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
  
  const arrTLENames=['Номер строки_1','Kod_NORAD',
    'TLE_Classification','TLE_International_class1',
    'TLE_International_class2',
    'TLE_Epoch_year','TLE_Epoch_Time',
    'TLE_Perv_Proizv','TLE_Vtor_Proizv'
  ,'TLE_Koef_torm',
  'ephemeris_type',
  'TLE_Element_Version',
  'TLE_Control_sum_line1'];
  const arrTLENames_two=['Номер строки_2','Номер спутника в базе данных NORAD_2',
    'TLE_Naklon','TLE_Dolgota_uzla'
    ,'TLE_Ecscentr',
    'TLE_Pericentr',
    'TLE_Mean_Anomaly',
    'TLE_Mean_Motion'
  ,'TLE_Nomer_vitka',
  'TLE_Control_sum_line2'];
  
  dataTLE=line;
  let element='';
  let counter=0;
  
  if (count_line==0) {
    jsonTLE['TLE_Name']=dataTLE;
    tle.TLE_Name=dataTLE;
    tle.Naim=dataTLE;
   
    tle.Naim_Rus= dataTLE.replace('GONETS','Гонец')
  }
  else if (count_line==1) {
    jsonTLE['TLE_line1']=dataTLE;
    tle.TLE_line1=dataTLE;
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
          tle.Kod_NORAD=+element;
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
        tle.TLE_Classification=element;
        element='';
        counter+=1;
      } 
      else if (i>7 && i<15) {
        if (i==14) {
          element+=dataTLE[i];
        const nameField=arrTLENames[counter];
        jsonTLE[nameField]=Number(element);
        tle.TLE_International_class=(element);
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
      //   tle.TLE_International_class2=element;
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
        tle.TLE_Epoch_year=Number(element);
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
          tle.TLE_Epoch_Time=+(element);
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
        tle.TLE_Perv_Proizv=+correctElem;
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
          tle.TLE_Vtor_Proizv=Math.pow(+num,+degree);
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
          tle.TLE_Koef_torm=Math.pow(+num,+degree);
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
        tle.TLE_Element_Version=+element;
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
        tle.TLE_Control_sum_line1=+element;
        element='';
        counter+=1;
        
      }
      
    }
  }
  else if (count_line==2) {
    jsonTLE['TLE_line2']=dataTLE;
    tle.TLE_line2=dataTLE;
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
        tle.TLE_Naklon=+element;
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
        tle.TLE_Dolgota_uzla=+element;
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
          tle.TLE_Ecscentr=Number('0.'+element);
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
        tle.TLE_Pericentr=+element;
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
        tle.TLE_Mean_Anomaly=+element;
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
        tle.TLE_Mean_Motion=+element;
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
        tle.TLE_Nomer_vitka=+element;
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
        tle.TLE_Control_sum_line2=+element;
        element='';
        counter+=1;
        
      }
      
    }
  
  }
  
 
}
function eventSend(){
  console.log(arr);
}
let arr='1';
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
            // console.log(jsonTLE);
            // console.log(JSON.stringify(jsonTLE));
      };
     
      reader.readAsText(file); 
        
      // считываем файл   
    }
}
if (document.getElementById("view_TLE")) {
  document.getElementById("view_TLE").addEventListener("change", printFilesTle);
}
  
  document.getElementById("get_TLE").addEventListener("change", printFiles);
  document.getElementById('task-btn-TLE').addEventListener('click',eventSend);
  }
})




