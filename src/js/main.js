import '../css/style.css'

import { TERMS } from './TERMS.js';

  const EXIT_ANIMATION = 'animate__fadeOutUp',
    INTRO_ANIMATION = 'animate__fadeInUp',
    START_ANIMATION = "animate__animated",
    controls = {
      trend: document.querySelector('#nova_trend'),
      adj: document.querySelector('#novo_adjetivo'),
      subst: document.querySelector('#novo_substantivo')
    },
    TEMPO_MS = 300,
    ADJETIVOS_LENGTH = TERMS.adjetivos.length,
    SUBSTANTIVOS_LENGTH = TERMS.substantivos.length,
    CONTAINER_ADJETIVOS = document.querySelector('#adjetivos'),
    CONTAINER_SUBSTANTIVOS = document.querySelector('#verbos_substantivo');
  
  function returRandom(a) {return Math.floor(Math.random() * a);}
  
  function criar_tendencia(is_adjetivo, is_substantivo) {
    let n = 0;
    if (is_adjetivo) {
      n = returRandom(ADJETIVOS_LENGTH);
      let novo_adjetivo = TERMS.adjetivos[n];
      novo_elemento_dom(CONTAINER_ADJETIVOS, novo_adjetivo);
    }
    if (is_substantivo) {
      n = returRandom(SUBSTANTIVOS_LENGTH);
      let novo_substantivo = TERMS.substantivos[n];
      novo_elemento_dom(CONTAINER_SUBSTANTIVOS, novo_substantivo);
    }
    return;
  }
  
  function novo_elemento_dom(container, innerText) {
    var dom_to_remove = container.querySelector('.j-ativo')
    dom_to_remove.className = `${START_ANIMATION} ${EXIT_ANIMATION}`;
    dom_to_remove.addEventListener("animationend", function(e) {
      e.target.remove();
    });
    var dom_palavra = document.createElement('div');
    dom_palavra.innerHTML = innerText;
    dom_palavra.className = `j-ativo ${START_ANIMATION} ' ' ${INTRO_ANIMATION}`;
    container.appendChild(dom_palavra);
  }
  
  function click_criar_tendencia(e) {
    removeListeners();
    setTimeout(addListeners, TEMPO_MS);
    switch (e.target.id) {
      case "novo_adjetivo":
        criar_tendencia(true, false);
        gtag('event', 'click_criar_adjetivo');
        break;
      case "novo_substantivo":
        criar_tendencia(false, true);
        gtag('event', 'click_criar_substantivo');
        break;
      default:
        criar_tendencia(true, true);
        gtag('event', 'click_criar_tendencia');
        break;
    }
  }
  
  function addListeners() {
    for (const p in controls) {
      controls[p].addEventListener('click', click_criar_tendencia);
    }
  }
  
  function removeListeners() {
    for (const p in controls) {
      controls[p].removeEventListener('click', click_criar_tendencia);
    }
  }
  criar_tendencia(true, true);
  setTimeout(addListeners, TEMPO_MS);
  
  var traduzir_br = document.querySelector('#btn_traduzir'),
  spinner = document.querySelector('#spinner-container');
  traduzir_br.addEventListener('click', function(e){
    spinner.className =  `${START_ANIMATION} ${INTRO_ANIMATION}`;
    let texto = '',
     text_parts = document.querySelectorAll('.j-ativo');
    texto = `${text_parts[0].textContent}%20${text_parts[1].textContent}`;
    texto = texto.toLowerCase();
    console.log(texto);
    fetch('https://script.google.com/macros/s/AKfycbxvPUZTWBm5aE8_EZSM_CI8QxhkUm70scZYtidZ2XJYd91_U6r5B_iTZC35DoYIU4Ro/exec?text='+texto,{redirect: "follow",method: "GET"})
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      document.querySelector('#traduzido').textContent = response.text;
      spinner.className =  `${START_ANIMATION} ${EXIT_ANIMATION}`;
    });
  });