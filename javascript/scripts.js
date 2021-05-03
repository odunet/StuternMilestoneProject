//Initialize DOM objects
let nav = document.getElementById('nav');
let para = document.getElementById('para');
let progress = document.getElementById('progress');
let send = document.getElementById('send');
let surname = document.getElementById('surname');
let firstname = document.getElementById('firstname');
let dob = document.getElementById('dob');
let level = document.getElementById('level');
let club = document.getElementById('club');
let memberTable = document.getElementById('memberTable');
// Initialize variables
let objectData = { data: [] };
let jsonData;

/*
 * IMPLEMENT SCROLL / DEBOUNCE FEATURE
 */
//Debounce Function
function debounceScroll(funcParam, delay) {
  let timeoutId;
  return function (...args2) {
    let context = this;
    let args = arguments;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      funcParam.apply(context, args);
    }, delay);
  };
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//Event Listener
window.addEventListener(
  'scroll',
  debounceScroll(() => {
    //Get positions for element rectangle
    let btmNav = nav.getBoundingClientRect().bottom;
    let topPara = para.getBoundingClientRect().top;

    //Evaluate when the text enters the nav
    if (topPara - 40 < btmNav) {
      nav.classList.add('darkenBorder');
    } else {
      nav.classList.remove('darkenBorder');
    }

    //Create progress bar
    progress.style.width = `${
      (window.pageYOffset /
        (document.body.offsetHeight - document.body.clientHeight)) *
      40
    }%`;
  }, 40)
);

/*
 *HANDLE FORM SUBMISSION
 */
//Listen to click of the send button
send.addEventListener('click', (e) => {
  e.preventDefault();

  // Remove current contents of table
  removeAllChildNodes(memberTable);

  // Intialize table objects
  //Create Header Elements
  let table = document.createElement('table');
  let tr_header = document.createElement('tr');
  let th_surname = document.createElement('th');
  let th_firstname = document.createElement('th');
  let th_dob = document.createElement('th');
  let th_level = document.createElement('th');
  let th_club = document.createElement('th');
  let th_delete = document.createElement('th');

  //Populate Header Elements
  th_surname.innerHTML = 'Surname';
  th_firstname.innerHTML = 'Firstname';
  th_dob.innerHTML = 'Date of Birth';
  th_level.innerHTML = 'Level';
  th_club.innerHTML = 'Favorite Club';
  th_delete.innerHTML = 'Delete';

  // Append header elements
  tr_header.appendChild(th_surname);
  tr_header.appendChild(th_firstname);
  tr_header.appendChild(th_dob);
  tr_header.appendChild(th_level);
  tr_header.appendChild(th_club);
  tr_header.appendChild(th_delete);
  table.appendChild(tr_header);

  //Store data in Javascript object and JSON formats respoectively
  let data = {
    surname: `${surname.value}`,
    firstname: `${firstname.value}`,
    dob: `${dob.value}`,
    level: `${level.value}`,
    club: `${club.value}`,
    id: `${objectData['data'].length}`,
  };
  objectData['data'].push(data);
  jsonData = JSON.stringify(`${objectData}`);

  // Loop through object and render same in table on screen
  for (let i = 0; i < objectData['data'].length; i++) {
    memberTable.style.display = '';
    if (objectData['data'][i].length === 0) continue;

    //Create Data Elements
    let tr_data = document.createElement('tr');
    let td_surname = document.createElement('td');
    let td_firstname = document.createElement('td');
    let td_dob = document.createElement('td');
    let td_level = document.createElement('td');
    let td_club = document.createElement('td');
    let td_remove = document.createElement('button');
    let td_id = document.createElement('p');
    td_remove.classList.add('btn', 'btn2');

    //Populate Data Elements
    td_surname.innerHTML = objectData['data'][i].surname;
    td_firstname.innerHTML = objectData['data'][i].firstname;
    td_dob.innerHTML = objectData['data'][i].dob;
    td_level.innerHTML = objectData['data'][i].level;
    td_club.innerHTML = objectData['data'][i].club;
    td_id.innerHTML = i;
    td_id.classList.add('hidden');
    td_remove.innerHTML = 'Delete';
    tr_data.appendChild(td_surname);
    tr_data.appendChild(td_firstname);
    tr_data.appendChild(td_dob);
    tr_data.appendChild(td_level);
    tr_data.appendChild(td_club);
    tr_data.appendChild(td_remove);
    tr_data.appendChild(td_id);
    table.appendChild(tr_data);
    memberTable.appendChild(table);

    // Onclick of remove button, delete the entire entry.
    td_remove.addEventListener('click', (e) => {
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);

      //Remove deleted data from JavaScript Object and JSON data
      let ID = Number.parseInt(e.target.parentNode.childNodes[6].innerHTML);
      objectData['data'].splice(ID, 1);
      jsonData = JSON.stringify(`${objectData}`);
    });
  }
});
