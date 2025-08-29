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

function formatDateToCustomString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  // Добавляем три нуля к миллисекундам, чтобы получить микросекунды (6 цифр)
  const microseconds = milliseconds.padEnd(6, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds}`;
}
function generateTLEFromKeplerian(keplerParams) {
  /** Генерирует валидный TLE из кеплеровских параметров с проверкой границ */
  let {
    sat_num: satNum,
    epoch, // ожидается строка в формате "2024-09-08 17:00:05.982000"
    a,
    e: eccentricity,
    i: inclination,
    raan,
    argp,
    nu: trueAnomaly,
    bstar = 0.0,
    mean_motion_dot: meanMotionDot = 0.0,
  } = keplerParams;

  // Преобразование строки даты в объект Date
  function parseDateString(dateStr) {
    const [datePart, timePart] = dateStr.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':');
    const [sec, millis] = seconds.split('.');

    return new Date(
        year, month - 1, day,
        Number(hours), Number(minutes), Number(sec),
        Number(millis.substring(0, 3)) // берем только миллисекунды
    );
  }

  const epochDate = typeof epoch === 'string' ? parseDateString(epoch) : epoch;

  // Проверка и корректировка параметров
  const checkedSatNum = Math.max(0, Math.min(99999, +(satNum)));
  const checkedEccentricity = Math.max(0.0, Math.min(0.9999999, parseFloat(eccentricity)));

  const checkedInclination = inclination % (2 * Math.PI);
  const checkedRaan = raan % (2 * Math.PI);
  const checkedArgp = argp % (2 * Math.PI);
  const checkedTrueAnomaly = trueAnomaly % (2 * Math.PI);

  // Расчет параметров
  const mu = 398600.4418;
  const nRadPerSec = Math.sqrt(mu / Math.max(a, 1.0));
  let nRevPerDay = (nRadPerSec * 86400) / (2 * Math.PI);
  nRevPerDay = Math.max(0.99, Math.min(17.0, nRevPerDay));

  // Преобразование аномалий
  const E = 2 * Math.atan2(
      Math.sqrt(1 - checkedEccentricity) * Math.sin(checkedTrueAnomaly / 2),
      Math.sqrt(1 + checkedEccentricity) * Math.cos(checkedTrueAnomaly / 2)
  );
  const M = (E - checkedEccentricity * Math.sin(E)) % (2 * Math.PI);

  // Форматирование эпохи для TLE (YYDDD.FFFFFF)
  function convertToEpochTime(dateString) {
    const date = new Date(dateString);

    // Проверка на валидность даты
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }

    // Получаем последние две цифры года
    const year = date.getFullYear();
    const shortYear = year.toString().slice(-2).padStart(2, '0');

    // Вычисляем день года (1-366)
    const startOfYear = new Date(year, 0, 1);
    const diff = date - startOfYear;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

    // Вычисляем дробную часть дня
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const fractionOfDay = (diff % millisecondsInDay) / millisecondsInDay;

    // Форматируем день года с ведущими нулями (всегда 3 цифры)
    const formattedDayOfYear = dayOfYear.toString().padStart(3, '0');

    // Объединяем день года и дробную часть
    const fractionalPart = fractionOfDay.toFixed(8).substring(1); // убираем ведущий "0"

    // Форматируем результат
    return `${shortYear}${formattedDayOfYear}${fractionalPart}`;
  }

  const epochYD = convertToEpochTime(epoch);

  // Форматирование коэффициента торможения B* в формате "11606-4"
  function formatBstar(bstarValue) {
    // Ограничиваем значение (0.0 ≤ B* ≤ 0.999999)
    const absBstar = Math.min(0.999999, Math.max(0.0, Math.abs(bstarValue)));

    // Преобразуем в научную нотацию (например, 1.1606e-4 → "1.160600e-4")
    const bstarStr = absBstar.toExponential(6);

    // Разбиваем на мантиссу и экспоненту
    const [mantissaPart, exponentPart] = bstarStr.split('e');
    const exponent = parseInt(exponentPart, 10);

    // Удаляем точку и дополняем нулями до 5 цифр
    const mantissaDigits = mantissaPart.replace('.', '').substring(0, 5).padEnd(5, '0');

    // Вычисляем экспоненту для TLE (B* = mantissa × 10^exponent_TLE)
    const tleExponent = exponent - 1;
    const sign = tleExponent >= 0 ? '+' : '-';

    // Форматируем в "NNNNN±E" (5 цифр + знак + 1 цифра экспоненты)
    return ` ${mantissaDigits}${sign}${Math.abs(tleExponent)}`;
  }

  const formattedBstar = formatBstar(bstar);

  // Форматирование TLE
  const tleLine1 =
      `1 ${checkedSatNum.toString().padStart(5, '0')}U 00000    ` +
      `${epochYD.padStart(12, ' ')}  ` +
      `.${Math.abs(Math.floor(meanMotionDot * 1e10)).toString().padStart(8, '0')} ` +
      ` 00000-0 ` +
      `${formattedBstar} 0  0000`;
  let raans=(radToDeg(checkedRaan) % 360);

  raans=(raans <100)? raans>10?`0${raans.toFixed(4)}`:`00${raans.toFixed(4)}`:raans.toFixed(4);
  console.log(meanMotionDot);
  meanMotionDot/=10;
  const tleLine2 =
      `2 ${checkedSatNum.toString().padStart(5, '0')} ` +
      `${(radToDeg(checkedInclination) % 360).toFixed(4).padStart(8, ' ')}` +
      ` ${raans} ` +
      `${Math.min(9999999, Math.floor(checkedEccentricity * 1e7)).toString().padStart(7, '0')} ` +
      `${(radToDeg(checkedArgp) % 360).toFixed(4).padStart(8, ' ')} ` +
      `${(radToDeg(M) % 360).toFixed(4).padStart(8, ' ')}` +
      `${nRevPerDay.toFixed(7).padStart(11, ' ')}` +
      `${Math.floor(Math.abs(meanMotionDot) * 1e10)} ${''.toString().padStart(5, '0')}`;

  return [tleLine1, tleLine2];
}
// Вспомогательная функция для преобразования радиан в градусы
function radToDeg(radians) {
  let degrees = (radians * 180) / Math.PI;
  return ((degrees % 360) + 360) % 360;  // Нормализует даже отрицательные углы
}

function  parseKepToObject(keplerStr){
  const parts = keplerStr
      .split(';')
      .map(p => p.trim())
      .filter(p => p);

  // Удаляем нумерацию параметров (префиксы "1.", "2." и т.д.)
  const cleanParts = parts.map(part => {
    const dotIndex = part.indexOf('.');
    return dotIndex > -1 ? part.substring(dotIndex + 1) : part;
  });

  // 1. Адресная фраза (НУ01:134,2,0,10,1)
  const addressParts = cleanParts[0].includes(':')
      ? cleanParts[0].split(':')[1].split(',')
      : cleanParts[0].split(',');

  const addressPhrase = {
    nameForm: cleanParts[0].split(':')[0], // "НУ01"
    numKA: addressParts[0] || null,
    numCalcNu: addressParts[1] || null,
    numModNu: addressParts[2] || null,
    numTypeNu: addressParts[3] || null,
    numBc: addressParts[4] || null
  };

  // 2. Первая фраза (124,1,8633)
  const firstPhraseParts = cleanParts[1].split(',');
  const firstPhrase = {
    numKA: firstPhraseParts[0] || null,
    numSysCoord: firstPhraseParts[1] || null,
    numVitok: firstPhraseParts[2] || null
  };

  // 3. Вторая фраза - дата (08.09.2024)
  const dateParts = cleanParts[2].split('.');
  const secondPhrase = {
    day: dateParts[0] || null,
    month: dateParts[1] || null, // Обратите внимание: в исходных данных месяц и день могут быть перепутаны
    yearShort: dateParts[2] || null,
    yearAall: dateParts[3] || null,
    yearEpoch: dateParts[4] || null // необязательное поле
  };

  // 4. Третья фраза - время (17.00.05.982)
  const timeParts = cleanParts[3].split('.');
  const thirdPhrase = {
    hours: timeParts[0] || null,
    minutes: timeParts[1] || null,
    seconds: timeParts[2] || null,
    upSeconds: timeParts[3] || null
  };

  // 5-10. ВКП параметры (-7124.598152+00 ... 7.041458+00)
  const vkp = cleanParts.slice(4, 10).map(item => {
    const parts = item.split('.');
    return {
      meaning: parts[0] || null,
      additionally: parts[1] || null,
      sign: item.startsWith('-') ? '-' : '+'
    };
  });

  // 11-12. Коэффициенты (0.050000+00, 0.0000000+00)
  const coefficients = {
    ballisticEffect: cleanParts[10] || null,
    coefficientLight: cleanParts[11] || null
  };

  // 13. Логическая шкала (020000000,0)
  const logicScaleParts = cleanParts[12] ? cleanParts[12].split(',') : [];
  const logicScale = {
    simpleScale: logicScaleParts[0] || null,
    fullScale: logicScaleParts[1] || null
  };

  return {
    addressPhrase,
    firstPhrase,
     secondPhrase,
     thirdPhrase,
     vkp,
     coefficients,
     logicScale
  };
}
function renderToRussianHTML(data, container) {
  const rusLabels = {
    "addressPhrase":"Адресная фраза:",
    "firstPhrase":"Первая фраза:",
    "secondPhrase":"Вторая фраза:",
    "thirdPhrase":"Третья фраза:",
    "vkp":"ВКП:",
    "coefficients":"Коэффициенты:",
    "logicScale":"Логическая шкала:",
    // Адресная фраза
    'nameForm': 'Имя формы',
    'numKA': 'Номер КА',
    'numCalcNu': 'Номер решения НУ',
    'numModNu': 'Номер модификатора НУ',
    'numTypeNu': 'Номер типа НУ',
    'numBc': 'Номер БЦ',

    // Первая фраза
    'numSysCoord': 'Номер системы координат',
    'numVitok': 'Номер витка',

    // Дата
    'day': 'День',
    'month': 'Месяц',
    'yearShort': 'Год',
    'yearAall': 'Год ',
    'yearEpoch': 'Год эпохи',

    // Время
    'hours': 'Часы',
    'minutes': 'Минуты',
    'seconds': 'Секунды',
    'upSeconds': 'Доли секунд',

    // ВКП
    'additionally': 'Дополнительно',
    'meaning': 'Значение',
    'sign': 'Знак',

    // Коэффициенты
    'ballisticEffect': 'Баллистический коэффициент',
    'coefficientLight': 'Коэффициент светового давления',

    // Шкала
    'simpleScale': 'Упрощенная шкала',
    'fullScale': 'Полная шкала'
  };

  function createElement(key, value, level = 0) {
    if (value === null || value === undefined) return null;

    const element = document.createElement('div');
    element.className = `data-level-${level}`;

    if (typeof value === 'object') {
      const label = document.createElement('div');
      label.className = 'group-label';
      label.textContent = rusLabels[key] || key+`:`;
      element.appendChild(label);

      const content = document.createElement('div');
      content.className = 'group-content';

      Object.entries(value).forEach(([subKey, subValue]) => {
        const subElement = createElement(subKey, subValue, level + 1);
        if (subElement) content.appendChild(subElement);
      });

      element.appendChild(content);
    } else {
      const label = document.createElement('span');
      label.className = 'data-label';
      label.textContent = `${rusLabels[key] || key}: `;

      const val = document.createElement('span');
      val.className = 'data-value';
      val.textContent = value;

      element.appendChild(label);
      element.appendChild(val);
    }

    return element;
  }

  // Очищаем контейнер и добавляем данные
  container.innerHTML = '';
  Object.entries(data).forEach(([key, value]) => {
    const element = createElement(key, value);
    if (element) container.appendChild(element);
  });
}
function parseKeplerianString(keplerStr) {
  /** Парсит строку с кеплеровскими параметрами в указанном формате */
  const parts = keplerStr
      .split(';')
      .map(p => p.trim())
      .filter(p => p);
  if (parts.length < 12) {
    throw new Error('Неверный формат строки - должно быть 12 параметров');
  }

  // Новая улучшенная функция для парсинга чисел
  function parseNumber(s) {
    // Удаляем номер параметра (например, '4.' в начале)
    s = s.replace(/^\d+\./, '');

    // Заменяем запятые на точки для десятичных разделителей
    s = s.replace(/,/g, '.');

    // Удаляем научную нотацию (+00 или -00 в конце)
    s = s.replace(/[+-]\d{2}$/, '');

    // Парсим как число с плавающей точкой
    return parseFloat(s);
  }
  console.log(`parts0: ${parts[0]}`)
  console.log(`parts1: ${parts[1]}`)
  // Парсинг даты и времени
  const datePart = parts[2].replace(/^2\./, '').trim();
  const timePart = parts[3].replace(/^3\./, '').trim();

  let day, month, year, hour, minute, second, millisecond;
  try {
    [day, month, year] = datePart.split('.').map(Number);
    [hour, minute, second, millisecond] = timePart.split('.').map(Number);
  } catch (e) {
    throw new Error(`Ошибка парсинга даты/времени: ${e}`);
  }
  console.log(`${day} ${month} ${year} ${hour} ${minute} ${second} ${millisecond}`);
  let epoch = new Date(
      year,
      month - 1,
      day,
      hour,
      minute,
      second,
      millisecond
  );
  epoch=formatDateToCustomString(epoch)
  // Парсинг вектора состояния
  let position, velocity;
  try {
    position = [
      parseNumber(parts[4]), // X
      parseNumber(parts[5]), // Y
      parseNumber(parts[6]), // Z
    ];

    velocity = [
      parseNumber(parts[7]), // VX
      parseNumber(parts[8]), // VY
      parseNumber(parts[9]), // VZ
    ];
  } catch (e) {
    throw new Error(`Ошибка парсинга позиции/скорости: ${e}`);
  }

  // Парсинг дополнительных параметров
  let satNum, bstar, meanMotionDot;
  try {
    const satInfo = parts[0].split(':')[1].split(',')[0];
    satNum = parseInt(satInfo, 10);

    bstar = parseNumber(parts[10]);
    meanMotionDot = parseNumber(parts[11].split(',')[0]) * 1e-10;
  } catch (e) {
    throw new Error(`Ошибка парсинга дополнительных параметров: ${e}`);
  }

  return {
    sat_num: satNum,
    epoch: epoch,
    position: position,
    velocity: velocity,
    bstar: bstar,
    mean_motion_dot: meanMotionDot,
  };
}

function stateVectorToKeplerian(position, velocity, mu =398600.4418) {
  /** Преобразует вектор состояния в кеплеровские элементы */
  // const r = position.map(x => Math.abs(x)); // Убираем отрицательные значения
  // const v = velocity.map(x => Math.abs(x)); // Убираем отрицательные значения
  const r = [...position];
  const v = [...velocity];
  console.log(r);
  console.log(v);
  // Вспомогательные функции
  const cross = (a, b) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];

  const dot = (a, b) => a.reduce((sum, val, i) => sum + val * b[i], 0);
  const norm = a => Math.sqrt(dot(a, a));
  const normalize = a => {
    const n = norm(a);
    return a.map(x => x / n);
  };

  const h = cross(r, v);
  const n = cross([0, 0, 1], h);
  const hNorm = norm(h);
  const rNorm = norm(r);
  const vNorm = norm(v);

  // Вычисление вектора эксцентриситета
  const e_vec = r.map((ri, i) =>
      ((vNorm ** 2 - mu / rNorm) * ri - dot(r, v) * v[i]) / mu
  );
  const e = norm(e_vec);

  // Большая полуось
  const a = 1 / (2 / rNorm - vNorm ** 2 / mu);

  // Наклонение
  const i = Math.acos(h[2] / hNorm);

  // Долгота восходящего узла
  const raan = (Math.atan2(n[1], n[0]) + 2 * Math.PI) % (2 * Math.PI);

  // Аргумент перицентра
  const e_dot_n = dot(e_vec, n);
  const e_cross_h_cross_n = dot(e_vec, cross(h, n));
  const argp = (Math.atan2(e_cross_h_cross_n, hNorm * e_dot_n) + 2 * Math.PI) % (2 * Math.PI);

  // Истинная аномалия
  const r_dot_e = dot(r, e_vec);
  const r_cross_h_dot_e = dot(r, cross(h, e_vec));
  const nu = (Math.atan2(r_cross_h_dot_e, hNorm * r_dot_e) + 2 * Math.PI) % (2 * Math.PI);

  return {
    a: a,
    e: e,
    i: i,
    raan: raan,
    argp: argp,
    nu: nu
  };
}
function viewDefaulTles(){
  const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
  getKaDefault(selectedValue,'TLE').then(data=>{
    console.log(data)
    const dataEnds=convertLineEndings(data)
    document.getElementById('data-document').innerHTML=``;
    document.getElementById('BC-document').innerHTML=``;
    document.getElementById('data-kepler').innerHTML=``;
    document.getElementById('convert-kepler').innerHTML=``;
    console.log(document.getElementById('data-kepler'))
    arr= readLinesValue(dataEnds, {},'get_TLEs');
    console.log(arr);

    document.querySelector('.input-file-text').innerHTML=`Наименование файла: TLE по умолчанию`;
    document.getElementById('task-btn-TLE').disabled=false;
  });
}
function keplerToTLE(){
  document.getElementById('data-document').innerHTML=``;
  // document.getElementById('data-kepler').innerHTML=``;
  const arrJoinKepler=[];
  const keplerStrs=document.querySelectorAll('textarea');
  keplerStrs.forEach(keplerStr=>{
    arrJoinKepler.push(keplerStr.value);

  })
  const resKep=arrJoinKepler.join('\r\n');
  console.log(arrJoinKepler.l)
  let tle='';
  arrJoinKepler.forEach(keplerStr=>{
    const kepler_str = keplerStr;
    console.log(kepler_str)
    const parsed_data = parseKeplerianString(kepler_str);
    console.log(parsed_data);
    const kepler_elements = stateVectorToKeplerian(
        parsed_data.position,
        parsed_data.velocity
    );
    const updatedKeplerElements = {
      ...kepler_elements,
      sat_num: parsed_data.sat_num,
      epoch: parsed_data.epoch,
      bstar: parsed_data.bstar,
      mean_motion_dot: parsed_data.mean_motion_dot,
    };
    console.log(updatedKeplerElements)
    const [tle1,tle2] = generateTLEFromKeplerian(updatedKeplerElements);
    const nameTLE=updatedKeplerElements.sat_num;
    tle+=`${nameTLE}\r\n${tle1}\r\n${tle2}\r\n`;
    console.log(tle);
  })
  arr= readLinesValue(tle.trimEnd(),{},'get_TLE');
  document.getElementById('task-btn-TLE').disabled=false;

}
function viewDefaulBc(){
  const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
  getKaDefault(selectedValue,'BC').then(data=>{
    console.log(data)
    const dataEnds=convertLineEndings(data)
    document.getElementById('data-document').innerHTML=``;
    document.getElementById('BC-document').innerHTML=``;
    document.getElementById('data-kepler').innerHTML=``;
    document.getElementById('convert-kepler').innerHTML=``;
    // console.log(document.getElementById('data-kepler'))
    // const bcData=document.createElement("textarea");
    // bcData.innerText=data;
    // document.getElementById('BC-document').append(bcData);
    // const kepler_str = document.querySelector('textarea').value;
    // console.log(kepler_str)
    //
    // const parsed_data = parseKeplerianString(kepler_str);
    // console.log(parsed_data);
    // const kepler_elements = stateVectorToKeplerian(
    //     parsed_data.position,
    //     parsed_data.velocity
    // );
    // const updatedKeplerElements = {
    //   ...kepler_elements,
    //   sat_num: parsed_data.sat_num,
    //   epoch: parsed_data.epoch,
    //   bstar: parsed_data.bstar,
    //   mean_motion_dot: parsed_data.mean_motion_dot,
    // };
    // const rusNamesKepler={
    //   e:'Эксцентриситет ',
    //   a:'Большая полуось (км)',
    //   i:"Наклонение (рад)",
    //   raan:'Долгота восходящего узла (рад)',
    //   argp:'Аргумент перицентра (рад)',
    //   sat_num:'Номер КА',
    //   epoch:'Эпоха',
    //   nu:'Истинная аномалия (рад)',
    //   bstar:'Коэффициент торможения',
    //   mean_motion_dot:'Производная среднего движения',
    // }
    // if (Object.keys(updatedKeplerElements).length){
    //   for (const key in updatedKeplerElements) {
    //     document.querySelector('#data-kepler').innerHTML+=`<div class="log">${rusNamesKepler[key]}: ${updatedKeplerElements[key]}</div>`;
    //   }
    // }
    // const parseData=parseKepToObject(kepler_str)
    // console.log(parseData)
    // parseAndDisplayKeplerData(kepler_str);
    viewKeplerDatas(data)
    // renderToRussianHTML(parseData,document.getElementById('convert-kepler'));
    document.getElementById('view-btn-kepler').addEventListener('click',keplerToTLE)

    console.log(arr);

    document.querySelector('.input-file-text').innerHTML=`Наименование файла: БЦ по умолчанию `;
    // arr= readLinesValue(dataEnds, {},'get_TLEs');
    // console.log(arr);

    document.getElementById('task-btn-TLE').disabled=false;
  });
}
async function getKaDefault(url,typeFile){
  try {
    const response = await fetch(`http://${url}/service/ka_default_file?type=${typeFile}&ist=73`, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    });
    const result = await response;
    return result.text();
  }
  catch (error) {
    console.error("Error add row:", error);
  }
}

function convertLineEndings(text) {
  return text.replace(/\n/g, '\r\n');
}
function  viewKeplerDatas(keplerDatas){
  const arrKepler =keplerDatas.split('\r\n');
  arrKepler.forEach(keplerData=>{
    const bcData=document.createElement("textarea");
    bcData.innerText=keplerData;
    document.getElementById('BC-document').append(bcData);
  })

  const keplerStrs=document.querySelectorAll('textarea');
    keplerStrs.forEach((keplerStr,i)=>{
      const kepler_str = keplerStr.value;
      console.log(kepler_str)

      const parsed_data = parseKeplerianString(kepler_str);
      console.log(parsed_data);
      const kepler_elements = stateVectorToKeplerian(
          parsed_data.position,
          parsed_data.velocity
      );
      const updatedKeplerElements = {
        ...kepler_elements,
        sat_num: parsed_data.sat_num,
        epoch: parsed_data.epoch,
        bstar: parsed_data.bstar,
        mean_motion_dot: parsed_data.mean_motion_dot,
      };
      const rusNamesKepler={
        e:'Эксцентриситет ',
        a:'Большая полуось (км)',
        i:"Наклонение (рад)",
        raan:'Долгота восходящего узла (рад)',
        argp:'Аргумент перицентра (рад)',
        sat_num:'Номер КА',
        epoch:'Эпоха',
        nu:'Истинная аномалия (рад)',
        bstar:'Коэффициент торможения',
        mean_motion_dot:'Производная среднего движения',
      }
      document.querySelector('#data-kepler').innerHTML+=`<div class="log">КА  ${i+1}:</div>`;
      if (Object.keys(updatedKeplerElements).length){

        for (const key in updatedKeplerElements) {

          document.querySelector('#data-kepler').innerHTML+=`<div class="log">${rusNamesKepler[key]}: ${updatedKeplerElements[key]}</div>`;
        }
        document.querySelector('#data-kepler').innerHTML+=`<br>`;
      }
      const parseData=parseKepToObject(kepler_str)
      console.log(parseData)
      parseAndDisplayKeplerData(kepler_str,i+1);
    })

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
function showBegLogRequest(arrClassTlEs,selector,idElement){
  document.querySelector(`${selector}`).innerHTML+=`<br><span class='header-log'>Начало сеанса: ${new Date().toLocaleString()}</span>`;
  const c=document.querySelector('.input-file-text');


    // document.querySelector(selector).innerHTML+= `<span>${new Date().toLocaleString()}</span>`;
    // let countIdTle=1;
    for (let datasTle of arrClassTlEs) {
      const logIn=document.createElement('div');
      logIn.innerHTML+=`<br>`;
      // logIn.innerHTML+=`<div>ID:${countIdTle}</div>`;
      // countIdTle+=1;
        for(let fieldTLE in datasTle)
        {
          logIn.innerHTML+=`<div> ${fieldTLE}:${(datasTle[fieldTLE])}</div>`;
          document.querySelector(`${selector}`).append(logIn);
        }

  }
  document.querySelector(selector).innerHTML+=`<br><div>Время отправки запроса: ${new Date().toLocaleString()}</div>`;
}
function showEndLogRequest(selector){
  const logIn=document.createElement('div');
  logIn.innerHTML+=`<br>`;
  logIn.innerHTML+=`<span style="font-size: calc(1.2rem);">Завершение сеанса:</span>`
  document.querySelector(`${selector}`).append(logIn);
  document.querySelector(`${selector}`).innerHTML+=`<span class='header-log'>Время ответа: 
  <br>${new Date().toLocaleString()}</span>`;
  document.querySelector(`${selector}`).innerHTML+=`<br><span class='header-log'>Данные успешно добавлены</span>`

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
function readLinesValue(fileReader,keplerData,idElement) {
  let tle= new dataTle();
  let jsonTLE={};
  const arrTLE=[];
  const arrClassTlEs=[];
   console.log(fileReader);
  const lines = (fileReader).split("\r\n");
   console.log(lines)
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
  // let nameFile=document.createElement('span');
  // document.querySelector('.name-document').innerHTML='';
  // nameFile.classList.add('header-log');
  // nameFile.innerHTML=`Файл: ${document.getElementById(`${idElement}`).files[0].name}
  // ${new Date().toLocaleString()}`;
  // document.querySelector('.name-document').append(nameFile);
  
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
  // document.getElementById('data-kepler').innerHTML=``;
  // document.getElementById('data-document').innerHTML+=``
  const dataDocument=document.createElement('div');
  dataDocument.classList.add('data-doc');
  arrClassTlEs.forEach(tle=>{
    // dataDocument.innerHTML+=`<div>Результат в виде TLE строки:</div>`;
    dataDocument.innerHTML+=`<div>${tle.NAIM}</div>`;
    dataDocument.innerHTML+=`<div>${tle.TLE_LINE1}</div>`;
    dataDocument.innerHTML+=`<div>${tle.TLE_LINE2}</div>`;
    dataDocument.innerHTML+=`<br>`;
    // if (Object.keys(keplerData).length){
    //   dataDocument.innerHTML+=`<div>Данные полученные из Кеплеровского формата:</div>`;
    //   for (const key in keplerData) {
    //     dataDocument.innerHTML+=`<div>${key}: ${keplerData[key]}</div>`;
    //   }
    // }

  })
  
  document.getElementById('data-document').append(dataDocument);
  
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
          console.log(element)
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
        console.log(dataTLE[31])
        if (i===31) {
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
        console.log(element,i)
        if (i==42) {
          element+=dataTLE[i];
        const nameField=arrTLENames[counter];
        let correctElem
          console.log(element[0])
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
          console.log(element)
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
      else if (i>42 && i<51) {
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
function parseAndDisplayKeplerData(inputString,i) {
  const outputElement = document.getElementById('convert-kepler');
  if (!outputElement) {
    console.error('Элемент с id="convert-kepler" не найден');
    return;
  }
  try {

    const dataParts = inputString.split(';').filter(part => part.trim());
    let htmlOutput = '<div class="kepler-data">';
    // htmlOutput += '<div>Данные Кеплера:</div>';
    htmlOutput += '<div class="data-container">';

    // Адресная фраза
    const addressPart = dataParts[0].split(':')[0].split(',');

    const adresPart = dataParts[0].split(',');
    console.log(dataParts[0],addressPart,adresPart[0])
    htmlOutput += `
            <div class="data-group">
            <br>
            <div class="data-header">КА  ${i}:</div>
                <div class="data-header">Адресная фраза- Общие данные:</div>
                <div class="data-value">${dataParts[0]}</div>
                <div class="data-description">
                <br>
                    <div class="data-header-min">Состав адресной фразы:</div>
                    <span>Имя формы: ${adresPart[0].substring(0, 4)}; </span>
                    <span>Номер КА: ${adresPart[0].substring(5) || 'не указан'}; </span>
                    <span>Номер решения НУ: ${adresPart[1] || 'не указан'}; </span>
                    <span>Номер модификатора НУ: ${adresPart[2] || 'не указан'}; </span>
                    <span>Номер типа НУ: ${adresPart[3] || 'не указан'}; </span>
                    <span>Номер БЦ,производившего решение : ${adresPart[4] || 'не указан'}; </span>
                </div>
            </div>`;

    // Первая фраза - основные параметры
    const firstPhrase = dataParts[1].split(',');
    htmlOutput += `
            <div class="data-group">
             <br>
                <div class="data-header">Фраза 1 - Основные параметры</div>
                <div class="data-value">${dataParts[1]}</div>
                <div class="data-description">
                <br>
                    <div class="data-header-min">Состав первой фразы:</div>
                    <span>Номер КА: ${firstPhrase[0].split('.')[1] || 'не указан'}; </span>
                    <span>Номер системы координат: ${firstPhrase[1] || 'не указан'}; </span>
                    <span>Номер витка: ${firstPhrase[2] || 'не указан'}; </span>
                </div>
            </div>`;

    // Вторая фраза - дата
    const secondPhrase = dataParts[2].split('.');
    htmlOutput += `
            <div class="data-group">
             <br>
                <div class="data-header">Фраза 2 - Дата задания параметров:</div>
                <div class="data-value">${dataParts[2]}</div>
            </div>`;

    // Третья фраза - время
    const timePhrase = dataParts[3].split('.');
    htmlOutput += `
            <div class="data-group">
             <br>
                <div class="data-header">Фраза 3 - Время задания параметров:</div>
                <div class="data-value">${dataParts[3]}</div>
                <div class="data-description">
            </div>`;

    // Фразы 4-9 - ВКП (Вектор состояния космического аппарата)
    const vkpLabels = [
      'X координата (км)', 'Y координата (км)', 'Z координата (км)',
      'Vx скорость (км/с)', 'Vy скорость (км/с)', 'Vz скорость (км/с)'
    ];

    for (let i = 4; i <= 9; i++) {
      if (dataParts[i]) {
        const value = dataParts[i].substring(2);
        htmlOutput += `
                    <div class="data-group">
                     <br>
                        <div class="data-header">Фраза ${i} - ВКП(Вектор состояния космического аппарата)</div>
                        <div class="data-value">${dataParts[i]}</div>
                        <div class="data-description">
                            <span>${vkpLabels[i-4]}:</span>
                            <span>${value}</span>
                        </div>
                    </div>`;
      }
    }

    // Десятая фраза - баллистический коэффициент
    if (dataParts[10]) {
      htmlOutput += `
                <div class="data-group">
                <br>
                    <div class="data-header">Фраза 10 - Баллистический коэффициент</div>
                    <div class="data-value">${dataParts[10]}</div>
                    
                </div>`;
    }

    // Одиннадцатая фраза - коэффициент светового давления
    if (dataParts[11]) {
      htmlOutput += `
                <div class="data-group">
                <br>
                    <div class="data-header">Фраза 11 - Коэффициент светового давления</div>
                    <div class="data-value">${dataParts[11]}</div>
                    
                </div>`;
    }

    // Двенадцатая фраза - логические шкалы сил
    if (dataParts[12]) {
      const logicParts = dataParts[12].split(',');
      htmlOutput += `
                <div class="data-group">
                <br>
                    <div class="data-header">Фраза 12 - Логические шкалы сил</div>
                    <div class="data-value">${dataParts[12]}</div>
                    <div class="data-description">
                        <span>Упрощенная шкала: ${logicParts[0].substring(2) || 'не указана'}</span>
                        <span>Полная шкала: ${logicParts[1] || 'не указана'}</span>
                    </div>
                </div>`;
    }

    htmlOutput += '</div></div>';
    outputElement.innerHTML += htmlOutput;

  } catch (error) {
    outputElement.innerHTML = `<p style="color: red;">Ошибка при обработке данных: ${error.message}</p>`;
    console.error('Ошибка парсинга:', error);
  }
}
async function postKA(data,url){
  try {
    const response = await fetch(`http://${url}/ka?ist=73`, {
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
  const selectedValue = document.querySelector('input[name="type_bd"]:checked').value;
  console.log(selectedValue)
  let idElem='';
  if (document.getElementById('BC-document').innerHTML===''){
    idElem='get_TLE'
  }else {
    idElem='get_TLEs'
  }
  showBegLogRequest(arr,'#comtainer-logs',idElem);
  // showBegLogRequest(arr,'.column2_TLE',idElem);
  postKA(arr,selectedValue)
  .then(()=>{

    console.log(idElem)

    showEndLogRequest('#comtainer-logs');
    // showEndLogRequest('.column2_TLE');
    document.getElementById('task-btn-TLE').disabled=true;
  })
}
let arr=[];
function logKepler(keplerData){

}

document.addEventListener('DOMContentLoaded',function(){
  // const kepler_str ='НУ01:134,2,0,10,1;1.134,1,8533;2.08.09.2024;3.17.00.05.982;4.-7724.598152+00;5.-1609.364940+00;6.0.000000+00;7.0.073185+00;8.-0.342691+00;9.7.041358+00;10.0.050000+00;11.0.0000000+00;12.020000000,0;'
  //
  // const parsed_data = parseKeplerianString(kepler_str);
  // const kepler_elements = stateVectorToKeplerian(
  //     parsed_data.position,
  //     parsed_data.velocity
  // );
  // const updatedKeplerElements = {
  //   ...kepler_elements,
  //   sat_num: parsed_data.sat_num,
  //   epoch: parsed_data.epoch,
  //   bstar: parsed_data.bstar,
  //   mean_motion_dot: parsed_data.mean_motion_dot,
  // };
  // const [tle1,tle2] = generateTLEFromKeplerian(updatedKeplerElements);
  //
  //
  //

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
          document.getElementById('data-document').innerHTML=``;
          document.getElementById('BC-document').innerHTML=``;
          document.getElementById('data-kepler').innerHTML=``;
          document.getElementById('convert-kepler').innerHTML=``;
          console.log(document.getElementById('data-kepler'))
              console.log(reader.result);
              // const bcData=document.createElement("textarea");
              // bcData.innerText=reader.result;
              //
              //
              //
              // document.getElementById('BC-document').append(bcData);
              // const kepler_str = document.querySelector('textarea').value;
              // console.log(kepler_str)
              //
              // const parsed_data = parseKeplerianString(kepler_str);
              // console.log(parsed_data);
              // const kepler_elements = stateVectorToKeplerian(
              //     parsed_data.position,
              //     parsed_data.velocity
              // );
              // const updatedKeplerElements = {
              //   ...kepler_elements,
              //   sat_num: parsed_data.sat_num,
              //   epoch: parsed_data.epoch,
              //   bstar: parsed_data.bstar,
              //   mean_motion_dot: parsed_data.mean_motion_dot,
              // };
              // const rusNamesKepler={
              //   e:'Эксцентриситет ',
              //   a:'Большая полуось (км)',
              //   i:"Наклонение (рад)",
              //   raan:'Долгота восходящего узла (рад)',
              //   argp:'Аргумент перицентра (рад)',
              //   sat_num:'Номер КА',
              //   epoch:'Эпоха',
              //   nu:'Истинная аномалия (рад)',
              //   bstar:'Коэффициент торможения',
              //   mean_motion_dot:'Производная среднего движения',
              //
              //
              //
              //
              // }
              // if (Object.keys(updatedKeplerElements).length){
              //   for (const key in updatedKeplerElements) {
              //     document.querySelector('#data-kepler').innerHTML+=`<div class="log">${rusNamesKepler[key]}: ${updatedKeplerElements[key]}</div>`;
              //   }
              // }
              // const parseData=parseKepToObject(kepler_str)
              // console.log(parseData)
              // parseAndDisplayKeplerData(kepler_str);
              viewKeplerDatas(reader.result);
              // renderToRussianHTML(parseData,document.getElementById('convert-kepler'));
              document.getElementById('view-btn-kepler').addEventListener('click',keplerToTLE)

              console.log(arr);
              console.log(document.getElementById('get_TLE').files[0].name);
              document.querySelector('.input-file-text').innerHTML=`Наименование файла: ${document.getElementById('get_TLE').files[0].name}`;

              // для разделения, если выбрано несколько файлов
              console.log("==============================");
              // console.log(jsonTLE);
              // console.log(JSON.stringify(jsonTLE));
        };
       
        reader.readAsText(file); 
          
        // считываем файл   
      }
  }
    function printFilesTLEs(e) {

      const files = e.target.files;   // получаем все выбранные файлы
      for (let file of files) {        // Перебираем все выбранные файлы
        // создаем объект FileReader для считывания файла
        const reader = new FileReader();
        // console.log(arrTLENames[7]);
        // console.log(reader);

        // при успешном чтении файла выводим его содержимое на веб-страницу
        reader.onload = () => {
          console.log(reader.result);
          document.getElementById('data-document').innerHTML=``;
          document.getElementById('BC-document').innerHTML=``;
          document.getElementById('data-kepler').innerHTML=``;
          document.getElementById('convert-kepler').innerHTML=``;
          console.log(document.getElementById('data-kepler'))
          arr= readLinesValue(reader.result, {},'get_TLEs');
          console.log(arr);
          console.log(document.getElementById('get_TLEs').files[0].name);
          document.querySelector('.input-file-text').innerHTML=`Наименование файла: ${document.getElementById('get_TLEs').files[0].name}`;
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
            document.querySelector('.input-file-text').innerHTML=`Наименование файла: ${document.getElementById('view_TLE').files[0].name}`;
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
    // nj.dot()
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
    document.getElementById('download-tle-surr').addEventListener('click',viewDefaulTles);
    document.getElementById('download-bc-surr').addEventListener('click',viewDefaulBc);
    document.getElementById("get_TLE").addEventListener("change", printFiles);
    document.getElementById('task-btn-TLE').addEventListener('click',eventSend);
    document.getElementById("get_TLEs").addEventListener("change", printFilesTLEs);

  }
  }
})




