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
// example usage: realtime clock
setInterval(function(){
  let currentTime = getDateTime();
  document.getElementById("timer").innerHTML = currentTime;
}, 0);
function azimuth_and_elevation_angle() {
    const lat1 = document.getElementById('lat1').value;
    const lon1 = document.getElementById('lon1').value;
    const alt1 = document.getElementById('alt1').value;
    const lat2 = document.getElementById('lat2').value;
    const lon2 = document.getElementById('lon2').value;
    const alt2 = document.getElementById('alt2').value;
  
    fetch('/api/ade?lat1=' + lat1 + '&lon1=' + lon1 + '&alt1=' + alt1 + '&lat2=' + lat2 + '&lon2=' + lon2 + '&alt2=' + alt2)
      .then(response => response.json())
      .then(data => {
        document.getElementById('azimuth').innerText = data.azimuth;
        document.getElementById('elevation').innerText = data.elevation;
        document.getElementById('distance').innerText = data.distance;
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
function finding_coordinates() {
    const lat1 = document.getElementById('first_TLE_line').value;
    const lon1 = document.getElementById('second_TLE_line').value;
    console.log(first_TLE_line)
    console.log(second_TLE_line)

    fetch('/api/finding_coordinates?first_TLE_line=' + first_TLE_line + '&second_TLE_line=' + second_TLE_line)
      .then(response => response.json())
      .then(data => {
        document.getElementById('lat.degrees').innerText = data.lat;
        document.getElementById('lon.degrees').innerText = data.lon;
        document.getElementById('height.km').innerText = data.height;
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
function get_coordinates() {
    const first_TLE_line = document.getElementById('first_TLE_line').value;
    const second_TLE_line = document.getElementById('second_TLE_line').value;
    const name = document.getElementById('name').value;
    console.log(name)
    console.log(first_TLE_line)
    console.log(second_TLE_line)

    fetch('/api/get_coordinates?first_TLE_line=' + first_TLE_line + '&second_TLE_line=' + second_TLE_line + '&name' + name)
      .then(response => response.json())
      .then(data => {
       console.log(data.response)
       document.getElementById('response').innerText = data.response;

      })
      .catch(error => {
        console.error('Error:', error);
      });
}
function communication_availability() {
    const acceptable_session_time_in_sec = document.getElementById('acceptable_session_time_in_sec').value;
    const dates_delta_in_sec = document.getElementById('dates_delta_in_sec').value;
    const interval_in_sec = document.getElementById('interval_in_sec').value;
    const min_session_time_in_sec = document.getElementById('min_session_time_in_sec').value;
    const start_datetime = document.getElementById('start_datetime').value;
    console.log(start_datetime)
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const name = document.getElementById('name').value;


    fetch('/api/communication_availability?acceptable_session_time_in_sec=' + acceptable_session_time_in_sec +
     '&dates_delta_in_sec=' + dates_delta_in_sec + '&interval_in_sec=' + interval_in_sec + '&min_session_time_in_sec='
      + min_session_time_in_sec + '&start_datetime=' + start_datetime + '&lat=' + lat + '&lon=' + lon + '&name=' + name)

      .then(response => response.json())
      .then(data => {
       console.log(data.response)
       document.getElementById('response').innerText = data.response;

      })
      .catch(error => {
        console.error('Error:', error);
      });
}
function release_all_frequency_resources(){
    const url = "http://185.192.247.60:7130/CommunicationAvailability/ReleaseAllFrequencyResources";
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => {

        if (!response.ok) {
            console.error("Ошибка при выполнении запроса:", response.status);
        }
        else {
        alert("Освобожден частотный ресурс");
        clearActiveSessions();

        }
    })
    .catch(error => {
        console.error("Сетевая ошибка:", error);
    });
}
function clearActiveSessions(){
  const url = "http://185.192.247.60:7130/CommunicationAvailability/ClearActiveSessions";
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
  })
  .then(response => {

      if (!response.ok) {
          console.error("Ошибка при выполнении запроса:", response.status);
      }
      else {
        console.error("Очищены активные сеансы", response.status);

      }
  })
  .catch(error => {
      console.error("Сетевая ошибка:", error);
  });
}
async function addArchivalSession(id,dataEnd,timeSeans,timeCall,idSeansRes){
  try {
    const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/AddArchivalSession?ID=${id}
    &Data_End=${dataEnd}&Time_Seans=${timeSeans}&Time_Razg=${timeCall}&Id_Seans_Rez=${idSeansRes}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
async function calculateFirstAvailableInterval(data,arrTimers){
  try {
    const response = await fetch("http://185.192.247.60:7130/CommunicationAvailability/CalculateFirstAvailableInterval", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log("Success:", result);
    if (result.detail || Date.parse((new Date((result.start_datetime_iso)))<Date.parse(new Date())))  {
      console.log(document.getElementById('max-time-dur').value);
      const select = document.getElementById('abonent-select');
      let selIndex=select.selectedIndex;
      if (!selIndex) {
        selIndex+=1;
      }
      document.getElementById('response3').innerHTML+=`<br><div  class="header-log">Вызов:</div>`;
      document.getElementById('response3').innerHTML+=`<div>ID запроса на инициирование сеанса связи:
      ${new Date(data.start_datetime_iso).toLocaleString()} ID Абонента: ${selIndex}</div>`;
      document.querySelector('.information_request').innerHTML+=`<div>ID запроса на инициирование сеанса связи:
      ${new Date(data.start_datetime_iso).toLocaleString()} ID Абонента: ${selIndex}</div>`;
      document.querySelector('.information_request').innerHTML+='<div>Отказано в сеансе связи</div><br> ';
      document.querySelector('.information_request').innerHTML+=`<br><div class="header-log" style="display: block;">Характеристики Абонента:</div>`;
     
      document.getElementById('response3').innerHTML+='<br><div>Отказано в сеансе связи</div> ';
      document.getElementById('response3').innerHTML+=`<br><div>Характеристики Абонента:</div>`;
    const latRes=document.createElement('div');
    latRes.classList.add('latitude-res');
    latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
    const lonRes=document.createElement('div')
    lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
    lonRes.classList.add('long-res');
    const latResInf=document.createElement('div');
    latResInf.classList.add('latitude-res');
    latResInf.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
    const lonResInf=document.createElement('div')
    lonResInf.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
    lonResInf.classList.add('long-res');
    document.querySelector('.information_request').append(latResInf);
    document.querySelector('.information_request').append(lonResInf);
    document.getElementById('response3').append(latRes);
    document.getElementById('response3').append(lonRes);
      
    }
    else
    {
      if (true) {
        console.log( (result.datetime_period.duration_in_sec < document.getElementById('max-time-dur').value));
      createResponse(result,data);
      const datesStartTime=new Date();
      document.getElementById('response3').innerHTML+=`<br><div class="header-log">Сеанс связи:</div>`;
      document.getElementById('response3').innerHTML+=`<div>СУРР: Сеанс разрешен</div>`;
      document.getElementById('response3').innerHTML+=`<div>СУРР: Время ответа от СУРР: ${datesStartTime.toLocaleString()}</div>`;
      // document.getElementById('response3').innerHTML+=`<div>Время запроса сеанса связи ${datesStartTime.toLocaleString()}</div>`;
      if (document.querySelector('.duplex-checkbox').checked) {
          postOcFrREs(result.satellite_id,document.querySelector('.duplex-checkbox').value,1,1)
            .then(respons=>{
             const randTime=getRandomNumber(60000,120000);
              const dateStartTime=new Date();
              document.querySelector('.information_request').innerHTML+=`<div>СУРР: Время ответа от СУРР:  ${dateStartTime.toLocaleString()}</div>`;
              document.getElementById('response3').innerHTML+=`<div>БЦ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
              document.getElementById('response3').innerHTML+=`<div>СУРР: Частотный ресурс: ${result.satellite_name} на передачу: канал
              ${respons.Nomera_zanyatyih_yacheek[0][1]} тайм слот  ${respons.Nomera_zanyatyih_yacheek[0][0]}, 
              на прием: канал
              ${respons.Nomera_zanyatyih_yacheek[1][1]} тайм слот ${respons.Nomera_zanyatyih_yacheek[1][0]}</div>`;
              document.querySelector('.information_request').innerHTML+=`<div>БЦ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
              document.querySelector('.information_request').innerHTML+=`<div> 
              СУРР: Частотный ресурс:  ${result.satellite_name} на передачу: канал
              ${respons.Nomera_zanyatyih_yacheek[0][1]} тайм слот  ${respons.Nomera_zanyatyih_yacheek[0][0]}, 
              на прием: канал
              ${respons.Nomera_zanyatyih_yacheek[1][1]} тайм слот ${respons.Nomera_zanyatyih_yacheek[1][0]}
              </div> `;
              console.log(respons.Nomera_zanyatyih_yacheek[0]);
              if (document.querySelector('.time_call-max').checked) {
                if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
                  console.log(respons.Nomera_zanyatyih_yacheek[0]);
                  const time =result.datetime_period.duration_in_sec;
                 let numPhone ='';
                  if(document.getElementById('abonent-select')){
                    console.log(document.getElementById('abonent-select').value);
                    document.querySelectorAll('.number').forEach((number)=>{
                    console.log(number.innerHTML);
                  if (number.classList.contains('show') ){
                     numPhone=number.innerHTML;
                }
                console.log('1');
                console.log(numPhone);
            });
              }
              let valueAbonent=0;
             if (document.getElementById('abonent-select')) {
          valueAbonent=Number(document.getElementById('abonent-select').value);
          if (!valueAbonent) {
            valueAbonent+=1;
          }
              }
             document.getElementById('response3').innerHTML+=`<div>БЦ:  Прогнозируемая продолжительность сеанса ,сек: ${time}</div>`;
             const dataSession={
            "ID_Zapros_Seans_Tek": 0,
            "Tlf1": String(numPhone),
            "ID_Abonent_T1": valueAbonent,
            "ID_KA1": result.satellite_id,
            "ID_RSS1": 0,
            "Canal1": respons.Nomera_zanyatyih_yacheek[0][1],
            "Time_Slot1": respons.Nomera_zanyatyih_yacheek[0][0],
            "Canal_pr1": respons.Nomera_zanyatyih_yacheek[1][1],
            "Time_Slot_pr1": respons.Nomera_zanyatyih_yacheek[1][0],
            "Tlf2": '',
            "ID_Abonent_T2": ++valueAbonent,
            "ID_KA2": 0,
            "ID_RSS2": 0,
            "Canal2": 0,
            "Time_Slot2": 0,
            "Canal_pr2": 0,
            "Time_Slot_pr2": 0,
            "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
            "Data_Otv": String(datesStartTime.toISOString()),
            "Data_Beg": String(dateStartTime.toISOString()),
            "Data_Beg_Razg": String(dateStartTime.toISOString()),
            "Data_End": '',
            "Time_Seans": '',
            "Time_Razg": '',
            "Id_Seans_Rez": 1
              }
          postActiveSession(dataSession).then((responses)=>{
            const timer=setTimeout(function(){
              postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Время запроса:${new Date().toLocaleString()}</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>CУРР: Продолжительность вызова ${time} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                document.getElementById('response3').innerHTML+=`<div>БЦ: Время запроса:${new Date().toLocaleString()}</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                addArchivalSession(responses.ID,String(dataEndCall),time,time,1);
              }); 
            },Number(time)*1000);
          if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
            const btnEnd=document.getElementById('task-btn_cansel');
            btnEnd.addEventListener('click',()=>{
              document.getElementById("task-btn_sim").disabled = true;
              clearTimeout(timer);
              document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
              
              document.getElementById('response3').innerHTML+=`<br><div style="
              font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
              
              postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>БЦ: Запрос на освобождение частотного ресурса </div>`;
              document.querySelector('.information_request').innerHTML+=` <div>БЦ: Время запроса:${new Date().toLocaleString()} </div>`;
              document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
              document.querySelector('.information_request').innerHTML+=` <div>СУРР Продолжительность вызова: 
              ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
              document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
              ${dataEndCall.toLocaleString()}</div>`;
                  
              document.getElementById('response3').innerHTML+=` <div>БЦ: Запрос на освобождение частотного ресурса </div>`;
              document.getElementById('response3').innerHTML+=` <div>БЦ: Время запроса:${new Date().toLocaleString()} </div>`;
                  document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                  document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                  const timeCall=Math.round(Number((dataEndCall-new Date(data.start_datetime_iso))/1000));
                  addArchivalSession(responses.ID,String(dataEndCall),timeCall,timeCall,7);
                  //   const dataSession={
                //     "ID_Zapros_Seans_Tek": 0,
                //     "Tlf1": "+79002000022",
                //     "ID_Abonent_T1": result.satellite_id,
                //     "ID_KA1": result.satellite_id,
                //     "ID_RSS1": 0,
                //     "Canal1": respons.Nomera_zanyatyih_yacheek[0][1],
                //     "Time_Slot1": respons.Nomera_zanyatyih_yacheek[0][0],
                //     "Canal_pr1": respons.Nomera_zanyatyih_yacheek[1][1],
                //     "Time_Slot_pr1": respons.Nomera_zanyatyih_yacheek[1][0],
                //     "Tlf2": "string",
                //     "ID_Abonent_T2": 0,
                //     "ID_KA2": 0,
                //     "ID_RSS2": 0,
                //     "Canal2": 0,
                //     "Time_Slot2": 0,
                //     "Canal_pr2": 0,
                //     "Time_Slot_pr2": 0,
                //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
                //     "Data_Otv": String(datesStartTime.toISOString()),
                //     "Data_Beg": String(dateStartTime.toISOString()),
                //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
                //     "Data_End": String(dataEndCall),
                //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Id_Seans_Rez": 7
                // }
                // postActiveSession(dataSession);
              }
              );
              
              
              document.getElementById("task-btn_sim").disabled = false;  
            },{once:true});
          }
      
          }); 
                }
          else{ 
                  console.log(respons.Nomera_zanyatyih_yacheek[0]);
                  const time =result.datetime_period.duration_in_sec;
                  let numPhone ='';
                  if(document.getElementById('abonent-select')){
              console.log(document.getElementById('abonent-select').value);
              document.querySelectorAll('.number').forEach((number)=>{
              console.log(number.innerHTML);
              if (number.classList.contains('show')) {
                numPhone=number.innerHTML;
              }
                
                console.log(numPhone);
            });
                  }
                  let valueAbonent=0;
                  if (document.getElementById('abonent-select')) {
                valueAbonent=Number(document.getElementById('abonent-select').value);
                if (!valueAbonent) {
                  valueAbonent+=1
                }
                  }
                  document.getElementById('response3').innerHTML+=`<div>БЦ:  Прогнозируемая продолжительность сеанса ,сек: ${time}</div>`;
                  const dataSession={
             "ID_Zapros_Seans_Tek": 0,
             "Tlf1": String(numPhone),
             "ID_Abonent_T1": valueAbonent,
             "ID_KA1": result.satellite_id,
             "ID_RSS1": 0,
             "Canal1": respons.Nomera_zanyatyih_yacheek[0][1],
             "Time_Slot1": respons.Nomera_zanyatyih_yacheek[0][0],
             "Canal_pr1": respons.Nomera_zanyatyih_yacheek[1][1],
             "Time_Slot_pr1": respons.Nomera_zanyatyih_yacheek[1][0],
             "Tlf2": '',
             "ID_Abonent_T2": ++valueAbonent,
             "ID_KA2": 0,
             "ID_RSS2": 0,
             "Canal2": 0,
             "Time_Slot2": 0,
             "Canal_pr2": 0,
             "Time_Slot_pr2": 0,
             "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
             "Data_Otv": String(datesStartTime.toISOString()),
             "Data_Beg": String(dateStartTime.toISOString()),
             "Data_Beg_Razg": String(dateStartTime.toISOString()),
             "Data_End": '',
             "Time_Seans": '',
             "Time_Razg": '',
             "Id_Seans_Rez": 1
                  }
                  postActiveSession(dataSession).then((responses)=>{
                    const timer=setTimeout(function(){
                postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Время запроса: ${time} секунд</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СУРР: Продолжительность вызова ${time} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                addArchivalSession(responses.ID,String(dataEndCall),time,time,1);
              }); 
                    },Number(time)*1000);
                    const btnEnd=document.getElementById('task-btn_cansel_flow');
                    btnEnd.addEventListener('click',()=>{
                      clearTimeout(timer);
                      postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                  const dataEndCall=new Date();
                  document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                  // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>СУРР: Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
                  ${dataEndCall.toLocaleString()}</div> <br>`;
                  document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall.toLocaleString())}</div>`;
                      });  
                    },{once:true});
                  });
                }    
              }
              else{
                 let numPhone='';
                   if(document.getElementById('abonent-select')){
                      console.log(document.getElementById('abonent-select').value);
                      document.querySelectorAll('.number').forEach((number)=>{
                      console.log(number.innerHTML);
                      if (number.classList.contains('show')) {
                        numPhone=number.innerHTML;
                       }
                  
                  console.log(numPhone);
                
              });
            }
            let valueAbonent=0;
            if (document.getElementById('abonent-select')) {
            valueAbonent=Number(document.getElementById('abonent-select').value);
            if (!valueAbonent) {
              valueAbonent+=1;
            }
           }
           console.log('1');
            document.getElementById('response3').innerHTML+=`<div>БЦ:  Прогнозируемая продолжительность сеанса ,сек: ${randTime/1000}</div>`;
            const dataSession={
              "ID_Zapros_Seans_Tek": 0,
              "Tlf1": String(numPhone),
              "ID_Abonent_T1": valueAbonent,
              "ID_KA1": result.satellite_id,
              "ID_RSS1": 0,
              "Canal1": respons.Nomera_zanyatyih_yacheek[0][1],
              "Time_Slot1": respons.Nomera_zanyatyih_yacheek[0][0],
              "Canal_pr1": respons.Nomera_zanyatyih_yacheek[1][1],
              "Time_Slot_pr1": respons.Nomera_zanyatyih_yacheek[1][0],
              "Tlf2": "string",
              "ID_Abonent_T2": ++valueAbonent,
              "ID_KA2": 0,
              "ID_RSS2": 0,
              "Canal2": 0,
              "Time_Slot2": 0,
              "Canal_pr2": 0,
              "Time_Slot_pr2": 0,
              "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
              "Data_Otv": String(datesStartTime.toISOString()),
              "Data_Beg": String(dateStartTime.toISOString()),
              "Data_Beg_Razg": String(dateStartTime.toISOString()),
              "Data_End": '',
              "Time_Seans": '',
              "Time_Razg": '',
              "Id_Seans_Rez": 1
          }
          postActiveSession(dataSession).then((responses)=>{
            const timer=setTimeout(function(){
              postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Время запроса: ${new Date().toLocaleString()}</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                
                document.querySelector('.information_request').innerHTML+=`<div>СУРР: Продолжительность вызова ${randTime/1000} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                document.getElementById('response3').innerHTML+=`<div>БЦ: Время запроса: ${new Date().toLocaleString()}</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                const timeCall=Math.round(Number(randTime/1000));
                addArchivalSession(responses.ID,String(dataEndCall),timeCall,timeCall,1);
              });
              
            },randTime);
            if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
               const btnEnd=document.getElementById('task-btn_cansel');
            btnEnd.addEventListener('click',()=>{
              document.getElementById("task-btn_sim").disabled = true; 
              clearTimeout(timer);
              postRelaeseFrRes(respons.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>БЦ: Время запроса:${new Date().toLocaleString()}</div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>СУРР: Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  
                  document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
                  ${dataEndCall.toLocaleString()}</div> <br>`;
                  document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div>СУРР: БЦ: Запрос на освобождение частотного ресурса</div>`;
                  document.getElementById('response3').innerHTML+=` <div>БЦ: Время запроса:${new Date().toLocaleString()}</div>`;
                  document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                  document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                  const timeCall=Math.round(Number(dataEndCall-new Date(data.start_datetime_iso)/1000));
                  addArchivalSession(responses.ID,String(dataEndCall),timeCall,timeCall,7);
                  //   const dataSession={
                //     "ID_Zapros_Seans_Tek": 0,
                //     "Tlf1": "+79002000022",
                //     "ID_Abonent_T1": result.satellite_id,
                //     "ID_KA1": result.satellite_id,
                //     "ID_RSS1": 0,
                //     "Canal1": respons.Nomera_zanyatyih_yacheek[0][1],
                //     "Time_Slot1": respons.Nomera_zanyatyih_yacheek[0][0],
                //     "Canal_pr1": respons.Nomera_zanyatyih_yacheek[1][1],
                //     "Time_Slot_pr1": respons.Nomera_zanyatyih_yacheek[1][0],
                //     "Tlf2": "string",
                //     "ID_Abonent_T2": 0,
                //     "ID_KA2": 0,
                //     "ID_RSS2": 0,
                //     "Canal2": 0,
                //     "Time_Slot2": 0,
                //     "Canal_pr2": 0,
                //     "Time_Slot_pr2": 0,
                //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
                //     "Data_Otv": String(datesStartTime.toISOString()),
                //     "Data_Beg": String(dateStartTime.toISOString()),
                //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
                //     "Data_End": String(dataEndCall),
                //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Id_Seans_Rez": 7
                // }
                // postActiveSession(dataSession);
              });
              document.getElementById("task-btn_sim").disabled = false;   
            },{once:true});
            }
            else{
              const btnEnd=document.getElementById('task-btn_cansel_flow');
            btnEnd.addEventListener('click',()=>{
              // document.getElementById("task-btn_sim").disabled = true;
              clearTimeout(timer);
              postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                  // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
                  ${dataEndCall.toLocaleString()}</div> <br>`;
                  document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall.toLocaleString())}</div>`;
                //   const dataSession={
                //     "ID_Zapros_Seans_Tek": 0,
                //     "Tlf1": "+79002000022",
                //     "ID_Abonent_T1": result.satellite_id,
                //     "ID_KA1": result.satellite_id,
                //     "ID_RSS1": 0,
                //     "Canal1": 0,
                //     "Time_Slot1": 0,
                //     "Canal_pr1": response.Nomera_zanyatyih_yacheek[0][1],
                //     "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek[0][0],
                //     "Tlf2": "string",
                //     "ID_Abonent_T2": 0,
                //     "ID_KA2": 0,
                //     "ID_RSS2": 0,
                //     "Canal2": 0,
                //     "Time_Slot2": 0,
                //     "Canal_pr2": 0,
                //     "Time_Slot_pr2": 0,
                //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
                //     "Data_Otv": String(datesStartTime.toISOString()),
                //     "Data_Beg": String(dateStartTime.toISOString()),
                //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
                //     "Data_End": String(dataEndCall),
                //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Id_Seans_Rez": 7
                // }
                // postActiveSession(dataSession);
              });
              // document.getElementById("task-btn_sim").disabled = false;    
            },{once:true});
            }
          });
            
           
              }
          });
      }
      // else if(document.querySelector('.simple-checkbox').checked){
      //   postOcFrREs(result.satellite_id,document.querySelector('.simple-checkbox').value,1,0).then(response=>{
      //     const randTime=getRandomNumber(60000,120000);
      //     const dateStartTime.toLocaleString()=new Date();
      //     document.querySelector('.information_request').innerHTML+=`<div>СУРР: Время ответа от СУРР:  ${dateStartTime.toLocaleString()}
      //     </div>`;
      //     document.getElementById('response3').innerHTML+=`<div>БЦ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
      //     document.getElementById('response3').innerHTML+=`<div>СУРР: Частотный ресурс: на прием: канал ${response.Nomera_zanyatyih_yacheek[0][0]} тайм слот
      //      ${response.Nomera_zanyatyih_yacheek[0][1]}</div>`;
      //     document.querySelector('.information_request').innerHTML+=`<div>БЦ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
          
      //     document.querySelector('.information_request').innerHTML+=`<div> СУРР: Частотный ресурс:${result.satellite_name} 
      //     на передачу: канал ${response.Nomera_zanyatyih_yacheek[0][0]} тайм слот
      //      ${response.Nomera_zanyatyih_yacheek[0][1]}</div> `;
      //     if (document.querySelector('.time_call-max').checked) {
      //       const time =result.datetime_period.duration_in_sec;
      //       document.getElementById('response3').innerHTML+=`<div>БЦ:  Прогнозируемая продолжительность сеанса ,сек: ${time}</div>`;
      //       console.log(time);
      //       let numPhone='';
      //       if(document.getElementById('abonent-select')){
      //         console.log(document.getElementById('abonent-select').value);
      //         document.querySelectorAll('.number').forEach((number)=>{
      //           console.log(number.innerHTML);
      //           if (number.classList.contains('show')) {
      //             numPhone=number.innerHTML;
      //           }
                  
      //             console.log(numPhone);
                
      //         });
      //       }
      //       let valueAbonent=0;
      //      if (document.getElementById('abonent-select')) {
      //       valueAbonent=Number(document.getElementById('abonent-select').value);
      //      }
      //       const dataSession={
      //         "ID_Zapros_Seans_Tek": 0,
      //         "Tlf1": numPhone,
      //         "ID_Abonent_T1": Number(valueAbonent),
      //         "ID_KA1": result.satellite_id,
      //         "ID_RSS1": 0,
      //         "Canal1": response.Nomera_zanyatyih_yacheek[0][1],
      //         "Time_Slot1": response.Nomera_zanyatyih_yacheek[0][0],
      //         "Canal_pr1": 0,
      //         "Time_Slot_pr1": 0,
      //         "Tlf2": "string",
      //         "ID_Abonent_T2": 0,
      //         "ID_KA2": 0,
      //         "ID_RSS2": 0,
      //         "Canal2": 0,
      //         "Time_Slot2": 0,
      //         "Canal_pr2": 0,
      //         "Time_Slot_pr2": 0,
      //         "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
      //         "Data_Otv": String(datesStartTime.toISOString()),
      //         "Data_Beg": String(dateStartTime.toISOString()),
      //         "Data_Beg_Razg": String(dateStartTime.toISOString()),
      //         "Data_End": "",
      //         "Time_Seans": "",
      //         "Time_Razg": "",
      //         "Id_Seans_Rez": 1
      //     }
      //     postActiveSession(dataSession).then((responses)=>{
      //       const timer=setTimeout(function(){
      //         postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
      //           document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
      //           document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
      //           document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${time} секунд</div>`;
      //           const dataEndCall=new Date();
      //           document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова ${String(dataEndCall)}:</div> <br>`;
      //           document.getElementById('response3').innerHTML+=`<br><div style="
      //           font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
      //           document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
      //           document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall.toLocaleString())}</div>`;
                
      //             addArchivalSession(responses.ID,String(dataEndCall),time,time,1);
      //         });  
      //       },Number(time)*1000);
      //       if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
      //         const btnEnd=document.getElementById('task-btn_cansel');
      //       btnEnd.addEventListener('click',()=>{
      //         document.getElementById("task-btn_sim").disabled = true;
              
      //         clearTimeout(timer);
      //         postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
      //           const dataEndCall=new Date();
      //           document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
      //             document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
      //             // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
      //             document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
      //             ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
      //             document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
      //             ${dataEndCall}</div> <br>`;
      //             document.getElementById('response3').innerHTML+=`<br><div style="
      //             font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
      //             document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
      //             document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall.toLocaleString())}</div>`;
      //             const timeCall=Math.round(Number(dataEndCall-new Date(data.start_datetime_iso)/1000));
      //             addArchivalSession(responses.ID,String(dataEndCall),timeCall,timeCall,7);
      //             //   const dataSession={
      //           //     "ID_Zapros_Seans_Tek": 0,
      //           //     "Tlf1": "+79002000022",
      //           //     "ID_Abonent_T1": result.satellite_id,
      //           //     "ID_KA1": result.satellite_id,
      //           //     "ID_RSS1": 0,
      //           //     "Canal1": response.Nomera_zanyatyih_yacheek[0][1],
      //           //     "Time_Slot1": response.Nomera_zanyatyih_yacheek[0][0],
      //           //     "Canal_pr1": 0,
      //           //     "Time_Slot_pr1": 0,
      //           //     "Tlf2": "string",
      //           //     "ID_Abonent_T2": 0,
      //           //     "ID_KA2": 0,
      //           //     "ID_RSS2": 0,
      //           //     "Canal2": 0,
      //           //     "Time_Slot2": 0,
      //           //     "Canal_pr2": 0,
      //           //     "Time_Slot_pr2": 0,
      //           //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
      //           //     "Data_Otv": String(datesStartTime.toISOString()),
      //           //     "Data_Beg": String(dateStartTime.toISOString()),
      //           //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
      //           //     "Data_End": String(dataEndCall),
      //           //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
      //           //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
      //           //     "Id_Seans_Rez": 7
      //           // }
      //           // postActiveSession(dataSession);
      //         });
      //         document.getElementById("task-btn_sim").disabled = false;   
      //       },{once:true});
      //       }
      //       else{
      //         const btnEnd=document.getElementById('task-btn_cansel_flow');
      //       btnEnd.addEventListener('click',()=>{
      //         // document.getElementById("task-btn_sim").disabled = true;
      //         clearTimeout(timer);
      //         postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
      //           const dataEndCall=new Date();
      //           document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
      //             document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
      //             // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
      //             document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
      //             ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
      //             document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
      //             ${dataEndCall}</div> <br>`;
      //             document.getElementById('response3').innerHTML+=`<br><div style="
      //             font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
      //             document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
      //             document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall.toLocaleString())}</div>`;
      //           //   const dataSession={
      //           //     "ID_Zapros_Seans_Tek": 0,
      //           //     "Tlf1": "+79002000022",
      //           //     "ID_Abonent_T1": result.satellite_id,
      //           //     "ID_KA1": result.satellite_id,
      //           //     "ID_RSS1": 0,
      //           //     "Canal1": 0,
      //           //     "Time_Slot1": 0,
      //           //     "Canal_pr1": response.Nomera_zanyatyih_yacheek[0][1],
      //           //     "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek[0][0],
      //           //     "Tlf2": "string",
      //           //     "ID_Abonent_T2": 0,
      //           //     "ID_KA2": 0,
      //           //     "ID_RSS2": 0,
      //           //     "Canal2": 0,
      //           //     "Time_Slot2": 0,
      //           //     "Canal_pr2": 0,
      //           //     "Time_Slot_pr2": 0,
      //           //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
      //           //     "Data_Otv": String(datesStartTime.toISOString()),
      //           //     "Data_Beg": String(dateStartTime.toISOString()),
      //           //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
      //           //     "Data_End": String(dataEndCall),
      //           //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
      //           //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
      //           //     "Id_Seans_Rez": 7
      //           // }
      //           // postActiveSession(dataSession);
      //         });
      //         // document.getElementById("task-btn_sim").disabled = false;    
      //       },{once:true});
      //       }
      //     });
            
            
      //     }
      //     else{
      //       let numPhone='';
      //       if(document.getElementById('abonent-select')){
      //         console.log(document.getElementById('abonent-select').value);
      //         document.querySelectorAll('.number').forEach((number)=>{
      //           console.log(number.innerHTML);
      //           if (number.classList.contains('show')) {
      //             numPhone=number.innerHTML;
      //           }
                  
      //             console.log(numPhone);
                
      //         });
      //       }
      //       let valueAbonent=0;
      //      if (document.getElementById('abonent-select')) {
      //       valueAbonent=Number(document.getElementById('abonent-select').value);
      //      }
      //       document.getElementById('response3').innerHTML+=`<div>БЦ:  Прогнозируемая продолжительность сеанса ,сек: ${randTime/1000}</div>`;
      //       const dataSession={
      //         "ID_Zapros_Seans_Tek": 0,
      //         "Tlf1": numPhone,
      //         "ID_Abonent_T1": Number(valueAbonent),
      //         "ID_KA1": result.satellite_id,
      //         "ID_RSS1": 0,
      //         "Canal1": response.Nomera_zanyatyih_yacheek[0][1],
      //         "Time_Slot1": response.Nomera_zanyatyih_yacheek[0][0],
      //         "Canal_pr1": 0,
      //         "Time_Slot_pr1": 0,
      //         "Tlf2": "string",
      //         "ID_Abonent_T2": 0,
      //         "ID_KA2": 0,
      //         "ID_RSS2": 0,
      //         "Canal2": 0,
      //         "Time_Slot2": 0,
      //         "Canal_pr2": 0,
      //         "Time_Slot_pr2": 0,
      //         "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
      //         "Data_Otv": String(datesStartTime.toISOString()),
      //         "Data_Beg": String(dateStartTime.toISOString()),
      //         "Data_Beg_Razg": String(dateStartTime.toISOString()),
      //         "Data_End": '',
      //         "Time_Seans": '',
      //         "Time_Razg": '',
      //         "Id_Seans_Rez": 1
      //     }
      //     postActiveSession(dataSession).then((responses)=>{
      //       setTimeout(function(){
           
      //         postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
      //           document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
      //           document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
      //           document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${randTime/1000} секунд</div>`;
      //           const dataEndCall=new Date();
      //           document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова ${String(dataEndCall)}:</div> <br>`;
      //           document.getElementById('response3').innerHTML+=`<br><div style="
      //           font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
      //           document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
      //           document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall.toLocaleString())}</div>`;
      //           const timeCall=Math.round(Number(randTime/1000));
      //           addArchivalSession(responses.ID,String(dataEndCall),timeCall,timeCall,1);
      //         });
              
      //       },randTime);
      //       if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
      //         const btnEnd=document.getElementById('task-btn_cansel');
      //         btnEnd.addEventListener('click',()=>{
      //           document.getElementById("task-btn_sim").disabled = true;
      //           clearTimeout(timer);
      //           postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
      //             const dataEndCall=new Date();
      //             document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
      //               document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
      //               // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
      //               document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
      //               ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
      //               document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
      //               ${dataEndCall}</div> <br>`;
      //               document.getElementById('response3').innerHTML+=`<br><div style="
      //               font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
      //               document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
      //               document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall.toLocaleString())}</div>`;
      //               const timeCall=Math.round(Number((dataEndCall-new Date(data.start_datetime_iso))/1000));
      //               addArchivalSession(responses.ID,String(dataEndCall),timeCall,timeCall,7);
      //               //   const dataSession={
      //             //     "ID_Zapros_Seans_Tek": 0,
      //             //     "Tlf1": "+79002000022",
      //             //     "ID_Abonent_T1": result.satellite_id,
      //             //     "ID_KA1": result.satellite_id,
      //             //     "ID_RSS1": 0,
      //             //     "Canal1": response.Nomera_zanyatyih_yacheek[0][1],
      //             //     "Time_Slot1": response.Nomera_zanyatyih_yacheek[0][0],
      //             //     "Canal_pr1": 0,
      //             //     "Time_Slot_pr1": 0,
      //             //     "Tlf2": "string",
      //             //     "ID_Abonent_T2": 0,
      //             //     "ID_KA2": 0,
      //             //     "ID_RSS2": 0,
      //             //     "Canal2": 0,
      //             //     "Time_Slot2": 0,
      //             //     "Canal_pr2": 0,
      //             //     "Time_Slot_pr2": 0,
      //             //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
      //             //     "Data_Otv": String(datesStartTime.toISOString()),
      //             //     "Data_Beg": String(dateStartTime.toISOString()),
      //             //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
      //             //     "Data_End": String(dataEndCall),
      //             //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
      //             //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
      //             //     "Id_Seans_Rez": 7
      //             // }
      //             // postActiveSession(dataSession);
      //           });
      //           document.getElementById("task-btn_sim").disabled = false;    
      //         },{once:true});
      //       }
      //       else{
      //         const btnEnd=document.getElementById('task-btn_cansel_flow');
      //       btnEnd.addEventListener('click',()=>{
      //         // document.getElementById("task-btn_sim").disabled = true;
      //         clearTimeout(timer);
      //         postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
      //           const dataEndCall=new Date();
      //           document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
      //             document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
      //             // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
      //             document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
      //             ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
      //             document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
      //             ${dataEndCall}</div> <br>`;
      //             document.getElementById('response3').innerHTML+=`<br><div style="
      //             font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
      //             document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
      //             document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall.toLocaleString())}</div>`;
      //           //   const dataSession={
      //           //     "ID_Zapros_Seans_Tek": 0,
      //           //     "Tlf1": "+79002000022",
      //           //     "ID_Abonent_T1": result.satellite_id,
      //           //     "ID_KA1": result.satellite_id,
      //           //     "ID_RSS1": 0,
      //           //     "Canal1": 0,
      //           //     "Time_Slot1": 0,
      //           //     "Canal_pr1": response.Nomera_zanyatyih_yacheek[0][1],
      //           //     "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek[0][0],
      //           //     "Tlf2": "string",
      //           //     "ID_Abonent_T2": 0,
      //           //     "ID_KA2": 0,
      //           //     "ID_RSS2": 0,
      //           //     "Canal2": 0,
      //           //     "Time_Slot2": 0,
      //           //     "Canal_pr2": 0,
      //           //     "Time_Slot_pr2": 0,
      //           //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
      //           //     "Data_Otv": String(datesStartTime.toISOString()),
      //           //     "Data_Beg": String(dateStartTime.toISOString()),
      //           //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
      //           //     "Data_End": String(dataEndCall),
      //           //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
      //           //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
      //           //     "Id_Seans_Rez": 7
      //           // }
      //           // postActiveSession(dataSession);
      //         });
      //         // document.getElementById("task-btn_sim").disabled = false;    
      //       },{once:true});
      //       }
      //     });
           
            
      //   }
         
          
      //   });
      // }
      else if(document.querySelector('.simplex-checkbox').checked){
        postOcFrREs(result.satellite_id,document.querySelector('.simplex-checkbox').value,0,1).then(response=>{
          const randTime=getRandomNumber(60000,120000);
          const dateStartTime=new Date();
          document.querySelector('.information_request').innerHTML+=`<div>СУРР: Время ответа от СУРР:  ${dateStartTime.toLocaleString()}
          </div>`;
          document.getElementById('response3').innerHTML+=`<div>БЦ:  Начало сеанса связи: ${dateStartTime.toLocaleString().toLocaleString()}</div>`;
          document.getElementById('response3').innerHTML+=`<div>СУРР: Частотный ресурс: ${result.satellite_name} 
          на передачу:канал ${response.Nomera_zanyatyih_yacheek[0][0]} тайм слот
           ${response.Nomera_zanyatyih_yacheek[0][1]}</div>`;
          document.querySelector('.information_request').innerHTML+=`<div>БЦ:  Начало сеанса связи: ${dateStartTime.toLocaleString()}</div>`;
          document.querySelector('.information_request').innerHTML+=`<div>СУРР: Частотный ресурс: ${result.satellite_name} 
          на прием:канал ${response.Nomera_zanyatyih_yacheek[0][0]} тайм слот
           ${response.Nomera_zanyatyih_yacheek[0][1]}</div> `;
          if (document.querySelector('.time_call-max').checked) {
            const time =result.datetime_period.duration_in_sec;
            let numPhone='';
            if(document.getElementById('abonent-select')){
              console.log(document.getElementById('abonent-select').value);
              document.querySelectorAll('.number').forEach((number)=>{
                console.log(number.innerHTML);
                if (number.classList.contains('show')) {
                  numPhone=number.innerHTML;
                }
                  
                  console.log(numPhone);
                
              });
            }
            let valueAbonent=0;
           if (document.getElementById('abonent-select')) {
            valueAbonent=Number(document.getElementById('abonent-select').value);
            if (!valueAbonent) {
              valueAbonent+=1;
            }
           }
            document.getElementById('response3').innerHTML+=`<div>БЦ:  Прогнозируемая продолжительность сеанса ,сек: ${time}</div>`;
            console.log(time);
            const dataSession={
              "ID_Zapros_Seans_Tek": 0,
              "Tlf1": numPhone,
              "ID_Abonent_T1": Number(valueAbonent),
              "ID_KA1": result.satellite_id,
              "ID_RSS1": 0,
              "Canal1": 0,
              "Time_Slot1": 0,
              "Canal_pr1": response.Nomera_zanyatyih_yacheek[0][1],
              "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek[0][0],
              "Tlf2": "string",
              "ID_Abonent_T2": ++valueAbonent,
              "ID_KA2": 0,
              "ID_RSS2": 0,
              "Canal2": 0,
              "Time_Slot2": 0,
              "Canal_pr2": 0,
              "Time_Slot_pr2": 0,
              "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
              "Data_Otv": String(datesStartTime.toISOString()),
              "Data_Beg": String(dateStartTime.toISOString()),
              "Data_Beg_Razg": String(dateStartTime.toISOString()),
              "Data_End": '',
              "Time_Seans": '',
              "Time_Razg": '',
              "Id_Seans_Rez": 1
          }
          postActiveSession(dataSession).then((responses)=>{
            const timer=setTimeout(function(){
              postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Время запроса: ${new Date().toLocaleString()} секунд</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>CУРР: Продолжительность вызова ${time} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div> <br>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                document.getElementById('response3').innerHTML+=`<div>БЦ: Время запроса: ${new Date().toLocaleString()} секунд</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                addArchivalSession(responses.ID,String(dataEndCall),time,time,1);
              });  
            },Number(time)*1000);
            if(document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
              const btnEnd=document.getElementById('task-btn_cansel');
              btnEnd.addEventListener('click',()=>{
                document.getElementById("task-btn_sim").disabled = true;
                
                clearTimeout(timer);
                postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                  const dataEndCall=new Date();
                  document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Время запроса: ${new Date().toLocaleString()} секунд</div>`;
                    document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                    // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                    document.querySelector('.information_request').innerHTML+=` <div>CУРР:Продолжительность вызова 
                    ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                    document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
                    ${dataEndCall.toLocaleString()}</div> <br>`;
                    document.getElementById('response3').innerHTML+=`<br><div style="
                    font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                    document.getElementById('response3').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: БЦ: Время запроса:  ${(new Date().toLocaleString())}</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                    document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                    const timeCall=Math.round(Number(dataEndCall-new Date(data.start_datetime_iso)/1000));
                    addArchivalSession(responses.ID,String(dataEndCall),timeCall,timeCall,7);
                    //   const dataSession={
                  //     "ID_Zapros_Seans_Tek": 0,
                  //     "Tlf1": "+79002000022",
                  //     "ID_Abonent_T1": result.satellite_id,
                  //     "ID_KA1": result.satellite_id,
                  //     "ID_RSS1": 0,
                  //     "Canal1": 0,
                  //     "Time_Slot1": 0,
                  //     "Canal_pr1": response.Nomera_zanyatyih_yacheek[0][1],
                  //     "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek[0][0],
                  //     "Tlf2": "string",
                  //     "ID_Abonent_T2": 0,
                  //     "ID_KA2": 0,
                  //     "ID_RSS2": 0,
                  //     "Canal2": 0,
                  //     "Time_Slot2": 0,
                  //     "Canal_pr2": 0,
                  //     "Time_Slot_pr2": 0,
                  //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
                  //     "Data_Otv": String(datesStartTime.toISOString()),
                  //     "Data_Beg": String(dateStartTime.toISOString()),
                  //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
                  //     "Data_End": String(dataEndCall),
                  //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                  //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                  //     "Id_Seans_Rez": 7
                  // }
                  // postActiveSession(dataSession);
                });
                document.getElementById("task-btn_sim").disabled = false;   
              },{once:true});
            }
            else{
              const btnEnd=document.getElementById('task-btn_cansel_flow');
            btnEnd.addEventListener('click',()=>{
              // document.getElementById("task-btn_sim").disabled = true;
              clearTimeout(timer);
              postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                  // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
                  ${dataEndCall.toLocaleString()}</div> <br>`;
                  document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall.toLocaleString())}</div>`;
                //   const dataSession={
                //     "ID_Zapros_Seans_Tek": 0,
                //     "Tlf1": "+79002000022",
                //     "ID_Abonent_T1": result.satellite_id,
                //     "ID_KA1": result.satellite_id,
                //     "ID_RSS1": 0,
                //     "Canal1": 0,
                //     "Time_Slot1": 0,
                //     "Canal_pr1": response.Nomera_zanyatyih_yacheek[0][1],
                //     "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek[0][0],
                //     "Tlf2": "string",
                //     "ID_Abonent_T2": 0,
                //     "ID_KA2": 0,
                //     "ID_RSS2": 0,
                //     "Canal2": 0,
                //     "Time_Slot2": 0,
                //     "Canal_pr2": 0,
                //     "Time_Slot_pr2": 0,
                //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
                //     "Data_Otv": String(datesStartTime.toISOString()),
                //     "Data_Beg": String(dateStartTime.toISOString()),
                //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
                //     "Data_End": String(dataEndCall),
                //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Id_Seans_Rez": 7
                // }
                // postActiveSession(dataSession);
              });
              // document.getElementById("task-btn_sim").disabled = false;    
            },{once:true});
            }
          });
            
          }
          else{
            document.getElementById('response3').innerHTML+=`<div>БЦ:  Прогнозируемая продолжительность сеанса ,сек: ${randTime/1000}</div>`;
            let numPhone='';
            if(document.getElementById('abonent-select')){
              console.log(document.getElementById('abonent-select').value);
              document.querySelectorAll('.number').forEach((number)=>{
                console.log(number.innerHTML);
                if (number.classList.contains('show')) {
                  numPhone=number.innerHTML;
                }
                  
                  console.log(numPhone);
                
              });
            }
            let valueAbonent=0;
           if (document.getElementById('abonent-select')) {
            valueAbonent=Number(document.getElementById('abonent-select').value);
           }
            const dataSession={
              "ID_Zapros_Seans_Tek": 0,
              "Tlf1": numPhone,
              "ID_Abonent_T1": result.satellite_id,
              "ID_KA1": result.satellite_id,
              "ID_RSS1": 0,
              "Canal1": 0,
              "Time_Slot1": 0,
              "Canal_pr1": response.Nomera_zanyatyih_yacheek[0][1],
              "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek[0][0],
              "Tlf2": "string",
              "ID_Abonent_T2": 0,
              "ID_KA2": 0,
              "ID_RSS2": 0,
              "Canal2": 0,
              "Time_Slot2": 0,
              "Canal_pr2": 0,
              "Time_Slot_pr2": 0,
              "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
              "Data_Otv": String(datesStartTime.toISOString()),
              "Data_Beg": String(dateStartTime.toISOString()),
              "Data_Beg_Razg": String(dateStartTime.toISOString()),
              "Data_End": '',
              "Time_Seans": '',
              "Time_Razg":'',
              "Id_Seans_Rez": 0
          }
          postActiveSession(dataSession).then(responses=>{
            setTimeout(function(){
           
              postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>БЦ: Время запроса: ${new Date().toLocaleString()}</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.querySelector('.information_request').innerHTML+=`<div>CУРР: Продолжительность вызова ${randTime/1000} секунд</div>`;
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}:</div> <br>`;
                document.getElementById('response3').innerHTML+=`<br><div style="
                font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                document.getElementById('response3').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса</div>`;
                document.getElementById('response3').innerHTML+=`<div>БЦ: Время запроса: ${new Date().toLocaleString()}</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                const timeCall=Math.round(Number(randTime/1000));
                    addArchivalSession(responses.ID,String(dataEndCall),timeCall,timeCall,1);
              });
              
            },randTime);
            if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов'){
              const btnEnd=document.getElementById('task-btn_cansel');
            btnEnd.addEventListener('click',()=>{
              document.getElementById("task-btn_sim").disabled = true;
              clearTimeout(timer);
              document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div >БЦ: Запрос на освобождение частотного ресурса</div>`;
                  document.getElementById('response3').innerHTML+=`<div >БЦ: Время запроса:${new Date().toLocaleString()}</div>`;
                  
                  document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>БЦ: Запрос на освобождение частотного ресурса </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>БЦ: Время запроса:${new Date().toLocaleString()} </div>`;
              postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                const dataEndCall=new Date();
               
                
                  document.querySelector('.information_request').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                  // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>СУРР: Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>СУРР: Время освобождения частотного ресурса: 
                  ${dataEndCall.toLocaleString()}</div> <br>`;
                  
                  document.getElementById('response3').innerHTML+=`<div>СУРР: Освобождения частотного ресурса подтверждена</div>`;
                  document.getElementById('response3').innerHTML+=`<div>СУРР: Время освобождения частотного ресурса: ${String(dataEndCall.toLocaleString())}</div>`;
                  const timeCall=Math.round(Number((dataEndCall-new Date(data.start_datetime_iso))/1000));
                  addArchivalSession(responses.ID,String(dataEndCall),timeCall,timeCall,7);
                  //   const dataSession={
                //     "ID_Zapros_Seans_Tek": 0,
                //     "Tlf1": "+79002000022",
                //     "ID_Abonent_T1": result.satellite_id,
                //     "ID_KA1": result.satellite_id,
                //     "ID_RSS1": 0,
                //     "Canal1": 0,
                //     "Time_Slot1": 0,
                //     "Canal_pr1": response.Nomera_zanyatyih_yacheek[0][1],
                //     "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek[0][0],
                //     "Tlf2": "string",
                //     "ID_Abonent_T2": 0,
                //     "ID_KA2": 0,
                //     "ID_RSS2": 0,
                //     "Canal2": 0,
                //     "Time_Slot2": 0,
                //     "Canal_pr2": 0,
                //     "Time_Slot_pr2": 0,
                //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
                //     "Data_Otv": String(datesStartTime.toISOString()),
                //     "Data_Beg": String(dateStartTime.toISOString()),
                //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
                //     "Data_End": String(dataEndCall),
                //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Id_Seans_Rez": 7
                // }
                // postActiveSession(dataSession);
              });
              document.getElementById("task-btn_sim").disabled = false;    
            },{once:true});
            }
            else{
              const btnEnd=document.getElementById('task-btn_cansel_flow');
            btnEnd.addEventListener('click',()=>{
              // document.getElementById("task-btn_sim").disabled = true;
              clearTimeout(timer);
              postRelaeseFrRes(response.Nomera_zanyatyih_yacheek,result.satellite_id).then(()=>{
                const dataEndCall=new Date();
                document.querySelector('.information_request').innerHTML+=` <br><div style="font-size: calc(1.2rem);">Завершение сеанса связи: </div>`;
                  document.querySelector('.information_request').innerHTML+=`<div>Каналы освобождены</div>`;
                  // document.querySelector('.information_request').innerHTML+=`<div> Продолжительность вызова ${dataEndCall} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Продолжительность вызова 
                  ${(dataEndCall-new Date(data.start_datetime_iso))/1000} секунд</div>`;
                  document.querySelector('.information_request').innerHTML+=` <div>Время завершения вызова 
                  ${dataEndCall.toLocaleString()}</div> <br>`;
                  document.getElementById('response3').innerHTML+=`<br><div style="
                  font-size: calc(1.2rem);">Завершение сеанса связи:</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Каналы очищены</div>`;
                  document.getElementById('response3').innerHTML+=`<div>Время очистки каналов ${String(dataEndCall.toLocaleString())}</div>`;
                //   const dataSession={
                //     "ID_Zapros_Seans_Tek": 0,
                //     "Tlf1": "+79002000022",
                //     "ID_Abonent_T1": result.satellite_id,
                //     "ID_KA1": result.satellite_id,
                //     "ID_RSS1": 0,
                //     "Canal1": 0,
                //     "Time_Slot1": 0,
                //     "Canal_pr1": response.Nomera_zanyatyih_yacheek[0][1],
                //     "Time_Slot_pr1": response.Nomera_zanyatyih_yacheek[0][0],
                //     "Tlf2": "string",
                //     "ID_Abonent_T2": 0,
                //     "ID_KA2": 0,
                //     "ID_RSS2": 0,
                //     "Canal2": 0,
                //     "Time_Slot2": 0,
                //     "Canal_pr2": 0,
                //     "Time_Slot_pr2": 0,
                //     "Data_Vyz": String(new Date(result.datetime_period.start_datetime_iso).toISOString()),
                //     "Data_Otv": String(datesStartTime.toISOString()),
                //     "Data_Beg": String(dateStartTime.toISOString()),
                //     "Data_Beg_Razg": String(dateStartTime.toISOString()),
                //     "Data_End": String(dataEndCall),
                //     "Time_Seans": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Time_Razg": String((dataEndCall-new Date(data.start_datetime_iso))/1000),
                //     "Id_Seans_Rez": 7
                // }
                // postActiveSession(dataSession);
              });
              // document.getElementById("task-btn_sim").disabled = false;    
            },{once:true});
            }
          });
            
            
          }
         
          
        });
      }
   
      return result;
      }
      else{
        
        document.getElementById('response3').innerHTML+=`<span>Отказано в вызове</span> <br><br>`
      }
      
    }
   
  } catch (error) {
    console.error("Error:", error);
  }
}
async function postJSON(data) {
    try {
      const response = await fetch("http://185.192.247.60:7128/Database/TableInfo", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
}
async function postActiveSession(data) {
  try {
    const response = await fetch("http://185.192.247.60:7130/CommunicationAvailability/AddActiveSession", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
function createResponse(result,data){
  if (document.querySelector('.information_request')) {
    if (false) {
      document.getElementById('response3').innerHTML+=`<br><div> Нет подходящего КА</div>`;
      
    }
    else{
      const select = document.getElementById('abonent-select');
      let selIndex=select.selectedIndex;
      if (!selIndex) {
        selIndex+=1;
      }
      console.log(select.options[select.selectedIndex].text);
      document.getElementById('response3').innerHTML+=`<br><div class="header-log">Вызов: </div>`;
      document.getElementById('response3').innerHTML+=`
        <div>ID запроса на инициирование сеанса связи:
        ${new Date(result.datetime_period.start_datetime_iso).toLocaleString()} ID Абонента: ${selIndex} </div>`;
      if (select.options[select.selectedIndex].text=='Выберите Абонента') {
        document.getElementById('response3').innerHTML+=`<div">Абонент:Абонент 1</div>`;
      }
      else{
        document.getElementById('response3').innerHTML+=`<div">Абонент:${select.options[select.selectedIndex].text}</div>`;
      }
     
      const latRes=document.createElement('div');
      latRes.classList.add('latitude-res');
      latRes.innerHTML=`Широта, градусы: ${document.getElementById('lat3').value}`;
      const lonRes=document.createElement('div')
      lonRes.innerHTML=`Долгота, градусы: ${document.getElementById('lon3').value}`;
      lonRes.classList.add('long-res');
      document.getElementById('response3').append(latRes);
      document.getElementById('response3').append(lonRes);
      if (document.querySelector('.duplex-checkbox').checked) {
        document.getElementById('response3').innerHTML+=`Вид связи: Дуплекс <br>`;
      }
      else{
        document.getElementById('response3').innerHTML+=`Вид связи: Симплекс <br>`;
      }
      
      // document.getElementById('response3').innerHTML+=`<br><div class="header-log" style="display: block;">Доступный КА:</div>`;  
      for (const [key, value] of Object.entries(result)) {
        if (typeof(value)!='object') {
          // if (key=='duration_in_sec') {
          //   document.getElementById('response3').innerHTML+=`<div class="total-time"> total_duration_in_sec: ${value}</div>`;
          // }
          // else {
            
          //   document.getElementById('response3').innerHTML+=`<div>${key}: ${value}</div>`;
          // }
         
        }
       else{
        for (const [key, values] of Object.entries(value)){
          if (key=='duration_in_sec') {
            document.getElementById('response3').innerHTML+=`<br><span style="
            font-size: calc(1.2rem);">Запрос: </span>`;
           }
          // else  if (key=='end_datetime_iso') {
          //   document.getElementById('response3').innerHTML+=`<div>${key}: ${new Date(values).toLocaleString()}</div>`;
          //   document.getElementById('response3').innerHTML+=`<div>Максимальная продолжительность вызова : ${(new Date(values)-new Date(data.start_datetime_iso))/1000}</div>`;
          //   console.log(new Date(values));
          //   console.log(new Date(data.start_datetime_iso));
          // }
          // else  if (key=='start_datetime_iso') {
          //   document.getElementById('response3').innerHTML+=`<div>${key}: ${new Date(values).toLocaleString()}</div>`;
          // }
          // else{
          //   document.getElementById('response3').innerHTML+=`<div>${key}: ${values}</div>`;
          // }
         
          
        }
       }
        console.log();
      }
      // document.querySelector('.information_request').remove();
      const createInformationRequest=document.querySelector('.information_request');
      const parent=document.querySelector('.content');
      // createInformationRequest.classList.add('information_request');
      for (const [key, value] of Object.entries(data)) {
        if (typeof(value)!='object') {
          if (key=='start_datetime_iso') {
            createInformationRequest.innerHTML+=`<br><div style="
            font-size: calc(1.2rem);">Начало сеанса связи:</div>`;
            document.getElementById('response3').innerHTML+=`<div>БЦ: Инициирование сеанса связи</div>`;
            createInformationRequest.innerHTML+=`<div>БЦ: Инициирование сеанса связи</div>`; 
            createInformationRequest.innerHTML+=`<div>БЦ:Время инициирования сеанса связи: ${new Date(value).toLocaleString()}</div>`; 
            document.getElementById('response3').innerHTML+=`<div>БЦ:Время инициирования сеанса связи: ${new Date(value).toLocaleString()}`;
            // const div=document.createElement('div');
            // div.textContent=`Время инициирования сеанса связи: ${value}`;
            // document.getElementById('long-res').after(div); 
          }
          else if (key=='min_duration_in_sec') {
            createInformationRequest.innerHTML+=`<div>БЦ: Минимальная продолжительность вызова, сек: ${value}</div>`;
            console.log(value);
          }
          else{
            createInformationRequest.innerHTML+=`<div>${key}: ${value}</div>`;
          }
        }
       else{
        const charKA=document.createElement('div');
        for (const [key, values] of Object.entries(value)){
          
          if (key=='name') {
           
            charKA.style=` font-size: calc(1.2rem);`;
            charKA.textContent="Характеристики КА:";
            // createInformationRequest.innerHTML+=`<div style="
            // font-size: calc(1.2rem);">Характеристики КА:</div>`;
           
            charKA.innerHTML+=`<div>Наименование КА: ${result.satellite_name} ${values}</div>`;
            
          }
          else if (key=='lat') {
            // createInformationRequest.innerHTML+=`<br><div>Вызов:</div>`;
            createInformationRequest.innerHTML+=`<br><div style="
            font-size: calc(1.2rem);">Характеристики Абонента:</div>`;
            createInformationRequest.innerHTML+=`<div>Широта, градусы: ${values}</div>`;
          }
          else if (key=='lon') {
            createInformationRequest.innerHTML+=`<div>Долгота, градусы: ${values}</div><br>`;
          }
          else if (key=='radius') {
            charKA.innerHTML+=`<div>Радиус зоны действия КА, км: ${values}</div>`;
            // createInformationRequest.append(charKA);
          }
          else{
             createInformationRequest.innerHTML+=`<div>${key}: ${values}</div>`;
          }
          
        }
       
       }
        console.log();
      }
      parent.append(createInformationRequest);
    }
    
  } 
  else{
    // document.getElementById('response3').innerHTML+=`<br><div class="header-log" style="display: block;">Доступный КА:</div>`;  
  for (const [key, value] of Object.entries(result)) {
    if (typeof(value)!='object') {
      if (key=='duration_in_sec') {
        document.getElementById('response3').innerHTML+=`<div class="total-time"> total_duration_in_sec: ${value}</div>`;
      }
      else {
        
        document.getElementById('response3').innerHTML+=`<div>${key}: ${value}</div>`;
      }
     
    }
   else{
    for (const [key, values] of Object.entries(value)){
      if (key=='duration_in_sec') {
        document.getElementById('response3').innerHTML+=`<div class="total-time"> total_duration_in_sec: ${values}</div> <br><span style="
        font-size: calc(1.2rem);">Запрос: </span>`;
      }
      else  if (key=='end_datetime_iso') {
        document.getElementById('response3').innerHTML+=`<div>${key}: ${values}</div>`;
        document.getElementById('response3').innerHTML+=`<div>Максимальная продолжительность вызова : ${(new Date(values)-new Date(data.start_datetime_iso))/1000}</div>`;
        console.log(new Date(values));
        console.log(new Date(data.start_datetime_iso));
      }
      else{
        document.getElementById('response3').innerHTML+=`<div>${key}: ${values}</div>`;
      }
     
      
    }
   }
    console.log();
  }
    const createInformationRequest=document.createElement('div');
    const parent=document.querySelector('.content');
    createInformationRequest.classList.add('information_request');
    for (const [key, value] of Object.entries(data)) {
      if (typeof(value)!='object') {
        if (key=='start_datetime_iso') {
          createInformationRequest.innerHTML+=`<br><div style="
          font-size: calc(1.2rem);">Начало сеанса связи:</div>`; 
          createInformationRequest.innerHTML+=`<div>БЦ:Время инициирования сеанса связи: ${new Date(value.toLocaleString())}</div>`;
          document.getElementById('response3').innerHTML+=`<div>БЦ: Инициирование сеанса связи</div>`;
          document.getElementById('response3').innerHTML+=`<br><div>БЦ:Время инициирования сеанса связи: ${new Date(value).toLocaleString()}` ;
          // const div=document.createElement('div');
          // div.textContent=`Время инициирования сеанса связи: ${value}`;
          // document.getElementById('long-res').after(div); 
        }
        else if (key=='min_duration_in_sec') {
          createInformationRequest.innerHTML+=`<div>БЦ: Минимальная продолжительность вызова, сек: ${value}</div>`;
          console.log(value);
        }
        else{
          createInformationRequest.innerHTML+=`<div>${key}: ${value}</div>`;
        }
      }
     else{
      const charKA=document.createElement('div');
      for (const [key, values] of Object.entries(value)){
        
        if (key=='name') {
         
          charKA.style=` font-size: calc(1.2rem);`;
          charKA.textContent="Характеристики КА:";
          // createInformationRequest.innerHTML+=`<div style="
          // font-size: calc(1.2rem);">Характеристики КА:</div>`;
         
          charKA.innerHTML+=`<div>Наименование КА: ${result.satellite_name} ${values}</div>`;
          
        }
        else if (key=='lat') {
          // createInformationRequest.innerHTML+=`<br><div>Вызов:</div>`;
          createInformationRequest.innerHTML+=`<br><div style="
          font-size: calc(1.2rem);">Характеристики Абонента:</div>`;
          createInformationRequest.innerHTML+=`<div>Широта, градусы: ${values}</div>`;
        }
        else if (key=='lon') {
          createInformationRequest.innerHTML+=`<div>Долгота, градусы: ${values}</div><br>`;
        }
        else if (key=='radius') {
          charKA.innerHTML+=`<div>Радиус зоны действия КА, км: ${values}</div>`;
          // createInformationRequest.append(charKA);
        }
        else{
           createInformationRequest.innerHTML+=`<div>${key}: ${values}</div>`;
        }
        
      }
     
     }
      console.log();
    }
    parent.append(createInformationRequest);
  }
  // document.getElementById('response3').innerHTML='';
  
  
  
 
}
async function postOcFrREs(stId,type,reception,transmission){
  try {
    const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/OccupyFrequencyResource?satellite_id=${stId}&number_of_cells_for_reservation=${type}&number_of_cells_for_reception=${reception}&number_of_cells_for_transmission=${transmission}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
async function postRelaeseFrRes(data,stId){
  try {
    const response = await fetch(`http://185.192.247.60:7130/CommunicationAvailability/ReleaseFrequencyResource?satellite_id=${stId}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];
let countSession=0;
btn.addEventListener("click", ()=>{modal.style.display = "flex"});
span.addEventListener("click", ()=>{modal.style.display = "none"});  
if (document.querySelector('h2')) {
  if (document.querySelector('h2').innerHTML=='Имитатор одиночных вызовов') {
    const imgRe=document.querySelector('.re-date');
    imgRe.addEventListener('click',()=>{
      const randLong=getRandomNumber(27,169)
      const randLat=getRandomNumber(41,77)
      document.getElementById('lat3').value=randLat;
      document.getElementById('lon3').value=randLong;
      // document.getElementById('latitude-res').innerHTML=`Широта, градусы: ${randLat}`;
      // document.getElementById('long-res').innerHTML=`Долгота, градусы: ${randLong}`;

    });
    // document.getElementById('latitude-res').innerHTML+=document.getElementById('lat3').value;
    //   document.getElementById('long-res').innerHTML+=document.getElementById('lon3').value;
    document.getElementById("task-btn_cansel").disabled = true;
    const btnStartSim=document.getElementById('task-btn_sim');
    btnStartSim.addEventListener('click',()=>{
      
      const data = {
        'point':{
              "name":'',
              "lat": document.getElementById('lat3').value,
              "lon": document.getElementById('lon3').value,
              "radius": 2500
            },
            "start_datetime_iso": new Date().toISOString(),
            "min_duration_in_sec":document.getElementById('min-call-time').value
          
      }
      // document.getElementById('response3').innerHTML='';
      if (document.querySelector('.information_request')) {
        // document.querySelector('.information_request').remove();
      }
      const loader = new Loader('.loader-container');
        loader.show('Загрузка данных с сервера');
        
      calculateFirstAvailableInterval(data).then(()=>{
        loader.close();
       document.getElementById('response3').style.display='block';
        document.getElementById("task-btn_cansel").disabled = false;
      });
    });
  }
  else if (document.querySelector('h2').innerHTML=='Имитатор потока вызовов') {
    const btnFlawStart=document.querySelector('#task-btn_sim_flow');
    
    btnFlawStart.addEventListener('click',()=>{
      const loader = new Loader('.loader-container');
      loader.show('Загрузка данных с сервера');
      const data = {
      'point':{
            "name":'',
            "lat": document.getElementById('lat4').value,
            "lon": document.getElementById('lon4').value,
            "radius": 2500
          },
      "start_datetime_iso": new Date().toISOString(),
      "min_duration_in_sec":document.getElementById('min-call-time').value
      
    }
    const arrTimers=[];
   
      const timerCalls=setInterval(function (){
        calculateFirstAvailableInterval(data,arrTimers).then(()=>{
          loader.close();
          ++countSession;
          console.log(countSession);
          document.getElementById('response3').style.display='block';
      });
      },1000);
      const time=setInterval(function(){
        if (countSession>0) {
            clearTimeout(timerCalls);
           
            console.log(countSession);
        }
    },1000);
      
     
    
      // console.log(countSession);
      // clearInterval(timerCalls);
     
   

  
    });
    
  }
}
if (document.getElementById('abonent-select')) {
  const select = document.getElementById('abonent-select');
let number = document.querySelectorAll('.number');
let lastIndex = 0; 
select.addEventListener('change', function() {
  number[lastIndex].classList.remove ("hide"); 
  number[lastIndex].classList.remove ("show"); 


  let index = select.selectedIndex; 
 if (!index) {
  number[lastIndex].classList.remove ("hide"); 
  number[lastIndex].classList.remove ("show"); 
 }
 else{
  number[index].classList.add("show"); // Показать блок с соответствующим индексом
  number[index].classList.remove ("hide");
 }
  
  
  lastIndex = index; 
});
}





