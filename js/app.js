var app = {
  init: function() {
    console.log('app init');
    app.generateNav();
  },
  activeMenu: '',
  activeModel: [],
  //Fonction pour séparer chaque éléments du tableau et le retranscrire dans la nav
  navFonction: function(arrayElement, index) {
    //Selection de la nav dans le html
    var nav = document.querySelector('.select-model');
    //ajouter dans nav le arrayElement
    var menu = document.createElement('a'); //créer un élement dans le DOM : <a>
    menu.textContent = arrayElement; //créer le texte intérieur du <a> text </a> qui sera le arrayElement soit chaque clés de models
    menu.href = "#"; //ajout du href dans le <a>
    menu.classList = "menu-item"; //ajout class dans le <a>
    menu.dataset.name = arrayElement;//ajout data-name dans le <a>
    menu.dataset.id = index;//ajout data-id dans le <a>
    menu.addEventListener('click', app.handleMenuClick);
    nav.appendChild(menu); //intégrer dans nav la var menu (qui contient un <a href class> arrayElement </a>)
  },

  //générer une nav à partir de map.models
  generateNav: function() {
    //navArray contiendra toutes les clés de models
    var navArray = Object.keys(map.models);
    //Parcourir le tableau navArray en utilisant la fonction navFonction
    navArray.forEach(app.navFonction);
  },
  
  handleMenuClick: function(event) {
    //fonction se déclenchant au click sur l'élément (dans la fonction generateNav)
    //var cible prendra la cible de l'évenement, donc le arrayElement clické
    var cible = event.target;
    //la var activeMenu prendra la valeur du nom de la cible de l'évenement
    app.activeMenu = cible.dataset.name;
    app.chargeModel();
  },

  chargeModel: function() {
    var container = document.getElementById('invader');
    container.innerHTML = "";
    var ardoise = document.createElement('div');
    ardoise.classList = "ardoise";
    //ardoise.textContent = app.activeMenu;
    container.appendChild(ardoise);
    app.creerDessin();
    //console.log(model);
  },

  creerDessin: function() {
    //Récupérer le modèle
    app.activeModel = map.models[app.activeMenu];
    //Pour chaque élément du tableau, générer une ligne
    app.activeModel.forEach(app.genererUneLigne);
  },

  genererUneLigne: function(element, index){
    //créer une ligne par div
    var divLigne = document.createElement('div');
    //affecter une classe
    divLigne.classList = 'ligne';
    //Récupére les lignes par creerDessin
    //convertir chaque string 'element' en tableau qui contiendra un caractère par index
    var ligneArray = element.split("");
    //pour chaque ligne, générer des cellules
    var nouvelleLigne = ligneArray.map(app.genererCellule);
    nouvelleLigne.forEach(function(cellule){
      divLigne.appendChild(cellule);
    });
    //intégrer les lignes dans div ardoise
    var ardoise = document.querySelector('.ardoise');
    ardoise.appendChild(divLigne);
  },

  genererCellule: function(type, index) {
    //créer une div différente suivant le type grace à map.types
    var cellule = document.createElement('div');
    //ajouter mise en forme selon le caractère
    cellule.classList = map.types[type];
    return cellule;
  },
  
};

document.addEventListener('DOMContentLoaded', app.init);
