
var url = new URL(location.href);
var joueur1 = url.searchParams.get("joueur1");
var joueur2 = url.searchParams.get("joueur2");
var play1 = url.searchParams.get("play1");
var play2 = url.searchParams.get("play2");


//on charge les information utiles
const statut = document.querySelector("h2")
let jeuActif= true
let joueurActif= joueur1
let pion= play1
let etatJeu=["","","","","","","","",""]
let nombrevictoire=0
let nombrevictoire2=0

//conditions de victoire
const conditionsVictoire=[

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [1,4,7]
    
]

//Messages
const gagne=()=>`le joueur ${joueurActif} a gagné`
const egalite=()=>"Egalité"
const tourJoueur=()=>`c'est au tour du joueur ${joueurActif}`
statut.innerHTML=tourJoueur()
document.querySelectorAll(".case").forEach(cellule=>cellule.addEventListener("click",gestionClicCase))
document.querySelector("#recommencer").addEventListener("click",recommencer)
document.querySelector(".X").innerHTML=joueur1+'  '+play1
document.querySelector(".O").innerHTML=joueur2+'  '+play2
document.querySelector(".score1").innerHTML=nombrevictoire
document.querySelector(".score2").innerHTML=nombrevictoire2
document.querySelector(".joueur1").innerHTML=joueur1
document.querySelector(".pion1").innerHTML=play1
document.querySelector(".pion2").innerHTML=play2
document.querySelector(".joueur2").innerHTML=joueur2

//On recupère l'index de la case cliquée
function gestionClicCase(){
   const indexcase = parseInt(this.dataset.index)
    if(etatJeu[indexcase]!== ""||!jeuActif){
        return
    }
   etatJeu[indexcase]= pion
    this.innerHTML=pion
    Verification()
}
function Verification(){
    let tourGagnant=false
    for(let conditionVictoire of conditionsVictoire){
        let val1=etatJeu[conditionVictoire[0]]
        let val2=etatJeu[conditionVictoire[1]]
        let val3=etatJeu[conditionVictoire[2]]
        if(val1 === ""|| val2 === ""|| val3 === ""){
            continue
        }
        if(val1 === val2 && val2 === val3){
            tourGagnant = true
            break
        }
    }

    if(tourGagnant){
        statut.innerHTML = gagne()
        jeuActif = false
        if (joueurActif===joueur1){
            nombrevictoire = nombrevictoire + 1
            document.querySelector(".score1").innerHTML=nombrevictoire
        }else {
            nombrevictoire2 = nombrevictoire2 + 1
            document.querySelector(".score2").innerHTML=nombrevictoire2
        }


        return
    }if (!etatJeu.includes("")){
        statut.innerHTML= egalite()
        jeuActif=false
        return;
    }

    //changement du joueur
   pion = pion ===play1 ? play2 : play1
   joueurActif = joueurActif ===joueur1 ? joueur2 : joueur1
    statut.innerHTML= tourJoueur()
}
//recommencer le jeu!!
function recommencer(){
    pion = pion ===play1 ? play2 : play1
    joueurActif = joueurActif ===joueur1 ? joueur2 : joueur1
    jeuActif = true
   etatJeu=["","","","","","","","",""]
    statut.innerHTML =tourJoueur()
    document.querySelectorAll(".case").forEach(cellule=>cellule.innerHTML="")
}
