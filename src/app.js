// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.
// US 1
// Récupération des éléments du formulaire dans le DOM
const form = document.querySelector("#daret-form");

const nomCercleInput = document.querySelector("#nom-cercle");

const cotisationInput = document.querySelector("#cotisation");

const periodiciteSelect = document.querySelector("#periodicite");

const dateDebutInput = document.querySelector("#date-debut");

const nomCercleErreur = document.querySelector("#nom-cercle-erreur");

const cotisationErreur = document.querySelector("#cotisation-erreur");

const periodiciteErreur = document.querySelector("#periodicite-erreur");

const dateDebutErreur = document.querySelector("#date-debut-erreur");

// État de la validation
let validationActive = false;

// Afficher un message d'erreur

function afficherErreur(champ, elementErreur, message) {
    elementErreur.textContent = message;
    elementErreur.classList.remove("hidden");

    champ.setAttribute("aria-invalid", "true");
    champ.setAttribute("aria-describedby", elementErreur.id);
}
// Effacer un message d'erreur

function effacerErreur(champ, elementErreur) {
    elementErreur.textContent = "";
    elementErreur.classList.add("hidden");

    champ.removeAttribute("aria-invalid");
    champ.removeAttribute("aria-describedby");
}

// Vérifier le nom du cercle

function validerNomCercle() {

    const nom = nomCercleInput.value.trim();

    const regexNom = /^[\p{L}0-9 -]+$/u;

    if (nom.length < 3 || nom.length > 40) {
        afficherErreur(nomCercleInput, nomCercleErreur, "Le nom doit contenir entre 3 et 40 caractères.");

        return false;
    }

    if (!regexNom.test(nom)) {
        afficherErreur(nomCercleInput, nomCercleErreur, "Le nom ne peut contenir que des lettres, des chiffres, des espaces et des tirets." );

        return false;
    }

    effacerErreur(nomCercleInput, nomCercleErreur);

    return true;
}

// verifier le montant de cotisation 
function validerCotisation(){

    const valeur = cotisationInput.value;

    const montant = Number(valeur);

    if(  valeur === "" || !Number.isInteger(montant) || montant < 100 || montant > 50000 ){

        afficherErreur( cotisationInput, cotisationErreur, " la cotisation doit etre un entier entre 100 et 50000 MAD");

        return false;
       
    }
        effacerErreur( cotisationInput, cotisationErreur);

        return true; 
}

// verifier la periodicite 
function validerPeriodicite(){

    const periodicite = periodiciteSelect.value;

    const periodicitesAutorisees = ["hebdomadaire", "quinzaine","mensuelle"];

    if(!periodicitesAutorisees.includes(periodicite)){

        afficherErreur( periodiciteSelect, periodiciteErreur,"Veuillez choisir une périodicité valide.");

        return false ;
    }

    effacerErreur(periodiciteSelect, periodiciteErreur);

    return true;
}

// Vérifier la date de début
 function validerDateDebut(){

    const dateSaisie = dateDebutInput.value ;

    if ( dateSaisie=== ""){

        afficherErreur(dateDebutInput,dateDebutErreur, "choisir une date de debut");

        return false;
    }

    const dateChoisie = new Date(`${dateSaisie}T00:00:00`);

    const aujourdHui = new Date();

    aujourdHui.setHours(0, 0, 0, 0);

    if (dateChoisie < aujourdHui) {

        afficherErreur(dateDebutInput,dateDebutErreur,"La date de début doit être aujourd'hui ou dans le futur." );

        return false;
    }

    effacerErreur(dateDebutInput, dateDebutErreur);

    return true;

 }

 // Gestion de l'envoi du formulaire

function gererEnvoi(event) {

    event.preventDefault();

    validationActive = true;

    const nomValide = validerNomCercle();

    const cotisationValide = validerCotisation();

    const periodiciteValide = validerPeriodicite();

    const dateValide = validerDateDebut();

    const nombreParticipants = participantsListe.children.length;

    const participantsValides = nombreParticipants >= nombreMinimum && nombreParticipants <= nombreMaximum;
    if (!nomValide) {
        nomCercleInput.focus();
        return;
    }

    if (!cotisationValide) {
        cotisationInput.focus();
        return;
    }

    if (!periodiciteValide) {
        periodiciteSelect.focus();
        return;
    }

    if (!dateValide) {
        dateDebutInput.focus();
        return;
    }

    if (!participantsValides) {
       participantsErreur.textContent = `Vous devez ajouter entre ${nombreMinimum} et ${nombreMaximum} participants.`;
       participantsErreur.classList.remove("hidden");
       participantsListe.querySelector("input")?.focus();
       return;
    }

    const inputsParticipants = participantsListe.querySelectorAll("input");

    let tousLesPrenomsValides = true;

    inputsParticipants.forEach((input) => {
        const prenomValide = validerPrenom(input);

        if (!prenomValide) {
             tousLesPrenomsValides = false;
        }
    });

if (!tousLesPrenomsValides) {
    participantsListe.querySelector('[aria-invalid="true"]')?.focus();
    return;
}

const cotisation = Number(cotisationInput.value);
const dateDebut = dateDebutInput.value;
const periodicite = periodiciteSelect.value;

// Calculs
ordreSaisie = recupererNomsParticipants();

ordreActuel = [...ordreSaisie];

const nombreTours = calculerNombreTours(nombreParticipants);

const montantBeneficiaire = calculerMontantBeneficiaire( cotisation, nombreParticipants);

const totalParticipant = calculerTotalParticipant(cotisation, nombreTours);

const datesTours = calculerDatesTours(dateDebut, periodicite, nombreTours);

resumeCagnotte.textContent = `${montantBeneficiaire} MAD`;
resumeTotalCycle.textContent = `${totalParticipant} MAD`;
resumeNbTours.textContent = nombreTours;

resumeDates.textContent =`${formaterDate(datesTours.datePremierTour)} – ${formaterDate(datesTours.dateDernierTour)}`;

etatVide.classList.add("hidden");
genererCalendrier();
contenuResultat.classList.remove("hidden");

}

form.addEventListener("submit", gererEnvoi);

// Vérifier les champs après la première validation

nomCercleInput.addEventListener("input", function () {
    if (validationActive) {
        validerNomCercle();
    }
});

cotisationInput.addEventListener("input", function () {
    if (validationActive) {
        validerCotisation();
    }
});

periodiciteSelect.addEventListener("change", function () {
    if (validationActive) {
        validerPeriodicite();
    }
});

dateDebutInput.addEventListener("change", function () {
    if (validationActive) {
        validerDateDebut();
    }
});

// US2 
// Récupération des éléments HTML des participants

const participantsListe = document.querySelector("#participants-liste");

const ajouterParticipantBtn = document.querySelector("#ajouter-participant");

const participantsCompteur = document.querySelector("#participants-compteur");

const participantsErreur = document.querySelector("#participants-erreur");

// Récupération des limites depuis le HTML

const nombreMinimum = Number(participantsListe.dataset.min);

const nombreMaximum = Number(participantsListe.dataset.max);

let prochainNumero = 4;

// creer un champ pour un participant 

function creerChampParticipant(numero){

    const participantItem = document.createElement("li");

    const label =document.createElement("label");

    label.textContent = `prenom ${numero}` ;

    label.classList.add("block","font-medium");

    const input = document.createElement("input"); 
    input.type = "text"; 
    input.name = "participants[]"; 
    input.autocomplete = "off"; 
    input.id = `participant-${numero}`;
    label.htmlFor = input.id;
    input.classList.add( "mt-1", "w-full", "rounded", "border", "border-daret-bordure", "px-3", "py-2" );

    const erreur = document.createElement("p");

    erreur.id = `erreur-participant-${numero}`;
    erreur.classList.add("hidden", "mt-1", "text-sm", "font-medium", "text-daret-erreur");

    input.setAttribute("aria-describedby", erreur.id);
    input.setAttribute("aria-invalid", "false");

    const retirerBtn = document.createElement("button");

    retirerBtn.type = "button";

    retirerBtn.textContent = "Retirer";

    retirerBtn.classList.add("mt-2", "text-red-600");

    participantItem.append(label, input, erreur,  retirerBtn);

    participantsListe.appendChild(participantItem);
}

// ajouter un participant 

function ajouterParticipant(){

    const nombreParticipants = participantsListe.children.length ;

    if (nombreParticipants >= nombreMaximum){

        participantsErreur.textContent="Vous ne pouvez pas ajouter plus de 20 participants.";

        participantsErreur.classList.remove("hidden");

        return;
    }

    participantsErreur.textContent = "";

    participantsErreur.classList.add ("hidden");

    creerChampParticipant(prochainNumero);

    prochainNumero++;

    const nouveauNombre = participantsListe.children.length;

    participantsCompteur.textContent = `${nouveauNombre} participant${nouveauNombre > 1 ? "s" : ""}`;
}
// Créer les 3 participants au démarrage
creerChampParticipant(1);
creerChampParticipant(2);
creerChampParticipant(3);

// Mettre à jour le compteur
participantsCompteur.textContent = "3 participants";

function retirerParticipant(event) {
    const bouton = event.target;

    if (bouton.textContent !== "Retirer") {
        return;
    }

    const nombreParticipants = participantsListe.children.length;

    if (nombreParticipants <= nombreMinimum) {
        participantsErreur.textContent =`Vous devez garder au moins ${nombreMinimum} participants.`;
        participantsErreur.classList.remove("hidden");
        return;
    }

    const participant = bouton.parentElement;
    participant.remove();

    const nouveauNombre = participantsListe.children.length;

    participantsCompteur.textContent =`${nouveauNombre} participant${nouveauNombre > 1 ? "s" : ""}`;
}

participantsListe.addEventListener("click", retirerParticipant);

ajouterParticipantBtn.addEventListener("click", ajouterParticipant);

// valider prenom ( longueur entre 2 et 30 )

function validerPrenom(input){

    const prenom = input.value.trim();

    const autresInputs = participantsListe.querySelectorAll("input");

    const regexPrenom = /^[\p{L}'-]+$/u;

    const erreur = input.parentElement.querySelector("p");

    if ( prenom.length < 2 || prenom.length > 30 ){

        erreur.textContent= " le prenom doit contenir entre 2 et 30 caracteres";

        erreur.classList.remove("hidden");

        input.setAttribute("aria-invalid", "true");

        return false;
    }

    if (!regexPrenom.test(prenom)) {
        erreur.textContent = "Le prénom ne peut contenir que des lettres, une apostrophe ou un trait d'union.";

        erreur.classList.remove("hidden");

        input.setAttribute("aria-invalid", "true");

        return false;
    }

    for (let i = 0; i < autresInputs.length; i++) {
        if (autresInputs[i] === input) {
            continue;
        }

        if (autresInputs[i].value.trim().toLowerCase() === prenom.toLowerCase()) {

           erreur.textContent = "Ce prénom existe déjà.";

           erreur.classList.remove("hidden");

           input.setAttribute("aria-invalid", "true");

           return false;
        }

    }    

    erreur.textContent = "";

    erreur.classList.add ("hidden");

    input.setAttribute("aria-invalid", "false");

    return true;
}

// US3
//montant reçu par le bénéficiaire
function calculerMontantBeneficiaire(cotisation, nombreParticipants) {

    return cotisation * nombreParticipants;
}
// total versé par chaque participant 
function calculerTotalParticipant(cotisation, nombreTours) {

    return cotisation * nombreTours;
}
// nombre de tours
function calculerNombreTours(nombreParticipants) {

    return nombreParticipants;
}
// date du 1er et du dernier tour
function calculerDatesTours(dateDebut, periodicite, nombreTours) {
    const dates = [];
    const date = new Date(`${dateDebut}T12:00:00`);

    for (let i = 0; i < nombreTours; i++) {
        dates.push(new Date(date));

        if (periodicite === "hebdomadaire") {
            date.setDate(date.getDate() + 7);
        } else if (periodicite === "quinzaine") {
            date.setDate(date.getDate() + 15);
        } else if (periodicite === "mensuelle") {
            date.setMonth(date.getMonth() + 1);
        }
    }

    return {
        datePremierTour: dates[0],
        dateDernierTour: dates[dates.length - 1]
    };
}
// Récupération des éléments du résumé
const contenuResultat = document.querySelector("#contenu-resultat");
const etatVide = document.querySelector("#etat-vide");

const resumeCagnotte = document.querySelector("#resume-cagnotte");
const resumeTotalCycle = document.querySelector("#resume-total-cycle");
const resumeNbTours = document.querySelector("#resume-nb-tours");
const resumeDates = document.querySelector("#resume-dates");

// Formater une date pour l'affichage
function formaterDate(date) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date);
}

// US4 

const calendrierCorps = document.querySelector("#calendrier-corps");

// recuperer les noms des participants 
function recupererNomsParticipants(){

    const inputsParticipants = participantsListe.querySelectorAll("input");
    const noms = [];

    for (let i = 0; i < inputsParticipants.length ; i++){
        noms.push(inputsParticipants[i].value.trim());
    }
    return noms ;
}
// generation du calendrier 
function genererCalendrier(){
    const noms = ordreActuel.length > 0 ? ordreActuel : recupererNomsParticipants();
    const cotisation = Number(cotisationInput.value);
    const nombreTours = noms.length;
    const dateDebut = dateDebutInput.value;
    const periodicite = periodiciteSelect.value;
    const dates = [];
    const date = new Date(`${dateDebut}T12:00:00`);
    const jourDebut = date.getDate();

    for(let i = 0 ; i < nombreTours; i++){
        dates.push(new Date(date));

        if(periodicite=== "hebdomadaire"){
            date.setDate(date.getDate()+7);  
        }else if (periodicite=== "quinzaine"){
             date.setDate(date.getDate()+15);  
        }else if (periodicite=== "mensuelle"){
            const moisSuivant = date.getMonth() + 1;
            const annee = date.getFullYear();

            date.setDate(1);
            date.setMonth(moisSuivant);

            const dernierJour = new Date(annee, moisSuivant+1, 0).getDate();

            date.setDate(Math.min(Number(jourDebut),dernierJour));
        }
    }
    calendrierCorps.innerHTML = "";

    for(let i = 0 ; i < nombreTours ; i++){
        const ligne = document.createElement("tr");

        const celluleNumero = document.createElement("td");
        const celluleDate = document.createElement("td");
        const celluleBeneficiaire = document.createElement("td");
        const celluleMontant = document.createElement("td");
        const celluleStatut = document.createElement("td");
        const celluleAction = document.createElement("td");

        ligne.appendChild(celluleNumero);
        ligne.appendChild(celluleDate);
        ligne.appendChild(celluleBeneficiaire);
        ligne.appendChild(celluleMontant);
        ligne.appendChild(celluleStatut);
        ligne.appendChild(celluleAction);
        const boutonStatut = document.createElement("button");
        boutonStatut.classList.add("bouton-statut");
        boutonStatut.textContent = "Terminé";
        boutonStatut.classList.add( "text-black","border", "px-3", "py-1", "rounded");
        celluleAction.appendChild(boutonStatut);
    
        celluleNumero.textContent = i + 1;
        celluleDate.textContent = formaterDate(dates[i]);
        celluleBeneficiaire.textContent = noms[i];
        celluleMontant.textContent = `${calculerMontantBeneficiaire(cotisation, nombreTours)} MAD`;
        celluleStatut.textContent = "À venir";


        calendrierCorps.appendChild(ligne);
    }
    makeProchainTour();
}

// US5
let ordreSaisie = [];
let ordreActuel = [];
function tirerOrdre(){
    const noms = recupererNomsParticipants();

    for (let i = noms.length-1 ; i > 0 ;i--){

        const j = Math.floor(Math.random()*(i+1));

        const temp = noms[i];
        noms[i] = noms[j];
        noms[j] = temp;
    }
    ordreActuel = noms;
    genererCalendrier();
}

function retournerOrdreSaisie() {
    ordreActuel = [...ordreSaisie];
    genererCalendrier();
}

const boutonTirage = document.querySelector("#tirage-au-sort");
boutonTirage.addEventListener("click",tirerOrdre);

const boutonOrdreSaisie = document.querySelector("#ordre-saisie");
boutonOrdreSaisie.addEventListener("click", retournerOrdreSaisie);   

// US6
function changerStatut(ligne){
    const celluleStatut = ligne.querySelector("td:nth-child(5)");
    const bouton = ligne.querySelector(".bouton-statut");

    if(celluleStatut.textContent=== "À venir"){
        celluleStatut.textContent = "Terminé";
        ligne.classList.add("ligne-terminee");
        bouton.textContent = "Annuler";

    }else{
        celluleStatut.textContent = "À venir";
        ligne.classList.remove("ligne-terminee");
        bouton.textContent = "Terminé";
    }
}

function gererClicTableau(event) {
    const bouton = event.target.closest(".bouton-statut");

    if(!bouton){
        return;
    }

    const ligne = bouton.closest("tr"); 
    changerStatut(ligne);
    makeCompteur();
    makeProchainTour();
}

calendrierCorps.addEventListener("click", gererClicTableau);

const compteurTours = document.querySelector("#compteur-tours");

function makeCompteur(){
    const lignes = calendrierCorps.querySelectorAll("tr");
    let nombreTermines = 0;

    for(let i = 0 ; i < lignes.length ; i++){
        const celluleStatut = lignes[i].querySelector("td:nth-child(5)");

        if(celluleStatut.textContent=== "Terminé"){
            nombreTermines++;
        }
    }
    compteurTours.textContent = `${nombreTermines} tours terminés sur ${lignes.length}`;
}

function makeProchainTour() {
    const lignes = calendrierCorps.querySelectorAll("tr");

    for (let i = 0; i < lignes.length; i++) {
        lignes[i].classList.remove("prochain-tour");
    }

    for (let i = 0; i < lignes.length; i++) {
        const celluleStatut = lignes[i].querySelector("td:nth-child(5)");

        if (celluleStatut.textContent === "À venir") {
            lignes[i].classList.add("prochain-tour");
            break;
        }
    }
}


