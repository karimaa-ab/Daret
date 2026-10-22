// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.

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

    console.log("Les champs du cercle sont valides.");
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
