function Refresh(event){
    const btn = event.currentTarget;

    const article = document.querySelector('article');
    article.removeChild(article.lastElementChild);

    for(let box of img)
    {
        box.addEventListener('click', RispostaSel);
        box.classList.remove('selezionato');
        box.classList.remove('opacity');
        const blocco = box.querySelector('.checkbox');
        blocco.src="images/unchecked.png";
    }

    
    flag1=false;
    flag2=false;
    flag3=false;
    ris={};
}


function RispostaSel(event){
    const div  =event.currentTarget;
    const image = div.querySelector('.checkbox');
    image.src='images/checked.png';
    div.classList.add('selezionato');
    div.classList.remove('opacity');

    const id = div.dataset.questionId;
    ris[id]=div.dataset.choiceId;

    const boxes = div.parentNode.querySelectorAll('div');
    for(const box of boxes){
        if(box.dataset.choiceId!==div.dataset.choiceId){
            box.classList.remove('selezionato');
            box.classList.add('opacity');

            const imagebox = box.querySelector('.checkbox');
            imagebox.src='images/unchecked.png';
        }
    }

    if (id==='one')
        {
            flag1=true;
        }
        if (id==='two')
        {
            flag2=true;
        }
        
        if (id==='three')
        {
            flag3=true;
        }

        console.log(flag1,flag2,flag3);

        if(flag1===true&&flag2===true&&flag3==true)
        {
            for(const box of img)
            {
                box.removeEventListener('click', RispostaSel);
            }
            Soluzione();
        }
    
}

function Soluzione(){
    const article = document.querySelector('article');
    const div = document.createElement('div');
    div.classList.add('risposta');
    article.appendChild(div);

    const h1 = document.createElement('h1');
    const span = document.createElement('span');
    const btn = document.createElement('button');
    btn.classList.add('bottone');
    btn.textContent = 'Ricomincia il quiz';
    div.appendChild(h1);
    div.appendChild(span);
    div.appendChild(btn);


    const one = ris['one'];
    const two = ris['two'];
    const three = ris['three']; 
   
 
    console.log(RESULTS_MAP[two]['title']);


    if (two === three){
        h1.textContent = RESULTS_MAP[two]['title'];
        span.textContent = RESULTS_MAP[two]['contents'];

    }
    else
    {
        h1.textContent = RESULTS_MAP[one]['title'];
        span.textContent = RESULTS_MAP[one]['contents'];

    }

    btn.addEventListener('click', Refresh);
}



var ris = {};

let flag1=false;
let flag2=false;
let flag3=false;

const img=document.querySelectorAll('.choice-grid div');
for(const box of img){ 
    box.addEventListener('click', RispostaSel);
}

/*Parte nuova*/ 
function FunzQuiz(event){
    const button = event.currentTarget;

    /*const header = document.querySelector('header');
    header.classList.add('sparisci'); */

    const griglia = document.querySelector('#anime-view');
    griglia.innerHTML = '';

    const article = document.querySelector('article');
    article.classList.remove('hidden');
}



function onJson(json) {
    console.log('JSON ricevuto');
    
    const griglia = document.querySelector('#anime-view');
    griglia.innerHTML = '';
    
    console.log(json);
    
    const riquadro = document.createElement('div');
    riquadro.classList.add('riquadro');

    const quote = document.createElement('span');
    quote.textContent = json.quote;
    
    griglia.appendChild(riquadro);
    riquadro.appendChild(quote);  
  }


function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }


function search(event)
{
  event.preventDefault();

  const scelta = document.querySelector('#tipo').value;

  if (scelta === "Ricerca per anime")
  {
    const anime = document.querySelector('#personaggio').value;
    const anime_value = encodeURIComponent(anime);
    console.log('Eseguo ricerca' + anime_value);

    fetch("https://animechan.vercel.app/api/random/anime?title=" + anime_value).then(onResponse).then(onJson);
    
  }

  else if (scelta === "Ricerca per nome");
  {

    const personaggio = document.querySelector('#personaggio').value;
    const personaggio_value = encodeURIComponent(personaggio);
    console.log('Eseguo ricerca: ' + personaggio_value);
  
    fetch("https://animechan.vercel.app/api/random/character?name=" + personaggio_value).then(onResponse).then(onJson);
  }

  
}


const form = document.querySelector('#search_content');
form.addEventListener('submit', search);

const bottone = document.querySelector('#bottone');
bottone.addEventListener('click', FunzQuiz);


/*
const secret = 'VyMxl0dNZxKEEwMaqtnSduXvjjhtaiuyyNl5Vgmn';
const client_id = '12312';
const redirect_uri = 'https://miaomiao.com';



var request = require('request');

var options = {
  uri: 'https://anilist.co/api/v2/oauth/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  json: {
    'grant_type': 'authorization_code',
    'client_id': client_id,
    'client_secret': secret,
    'redirect_uri': redirect_uri, 
    'code': code, 
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body.access_token);
  }
});




var options = {
    uri: 'https://graphql.anilist.co',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    json: {
      'query': query,
    }
  };
  
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body.data);
    }
  }); 
*/