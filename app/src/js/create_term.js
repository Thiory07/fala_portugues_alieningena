const exitAnimation = 'animate__fadeOutUp',
  introAnimation = 'animate__fadeInUp',
  animationStart = "animate__animated",
  controls = {
    trend: document.querySelector('#nova_trend'),
    adj: document.querySelector('#novo_adjetivo'),
    subst: document.querySelector('#novo_substantivo')
  },
  tempo_ms = 400,
  adjetivosLength = 4850,
  substantivosLength = 996,
  adjetivos_container = document.querySelector('#adjetivos'),
  substantivos_container = document.querySelector('#verbos_substantivo');

function returRandom(a) {
  return Math.floor(Math.random() * a);
}

function criar_tendencia(is_adjetivo, is_substantivo) {
  let n = 0;
  if (is_adjetivo) {
    n = returRandom(adjetivosLength);
    let novo_adjetivo = terms.adjetivos[n];
    novo_elemento_dom(adjetivos_container, novo_adjetivo);
  }
  if (is_substantivo) {
    n = returRandom(substantivosLength);
    let novo_substantivo = terms.substantivos[n];
    novo_elemento_dom(substantivos_container, novo_substantivo);
  }
  return;
}

function novo_elemento_dom(container, innerText) {
  var dom_to_remove = container.querySelector('.j-ativo')
  dom_to_remove.className = animationStart + ' ' + exitAnimation;
  dom_to_remove.addEventListener("animationend", function(e) {
    e.target.remove();
  });
  var dom_palavra = document.createElement('div');
  dom_palavra.innerHTML = innerText;
  dom_palavra.className = 'j-ativo ' + animationStart + ' ' + introAnimation;
  container.appendChild(dom_palavra);
}

function click_criar_tendencia(e) {
  removeListeners();
  setTimeout(addListeners, tempo_ms);
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
setTimeout(addListeners, tempo_ms)