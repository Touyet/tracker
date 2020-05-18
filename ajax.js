// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.addEventListener("load", function () {
		if (req.status >= 200 && req.status < 400) {
			// Appelle la fonction callback en lui passant la réponse de la requête
			callback(req.responseText);
		} else {
			console.error(req.status + " " + req.statusText + " " + url);
		}
	});
	req.addEventListener("error", function () {
		console.error("Erreur réseau avec l'URL " + url);
	});
	req.send(null);
}

// Exécute un appel AJAX POST
// Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès
function ajaxPost(url, data, callback) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(data);
}

function liensMenu(e) {
	ajaxGet(e, function(text) {
		//document.getElementById('principal').innerHTML = text;
		//console.log(text);
	});
}

function diffusion() {
	if (statutDiffusion) {
		// La diffusion est active, on coupe la diffusion
		statutDiffusion = false;
		document.getElementById("btnDiffusion").innerText = "Lancer la diffusion";
		document.getElementById("urlDiffuseur").innerText = "";
		
		clearInterval(intervalDiffusion);
	} else {
		// On active la diffusion
		statutDiffusion = true;
		if (document.getElementById("nomDiffuseur").value) {
			document.getElementById("btnDiffusion").innerText = "Stopper la diffusion";
			document.getElementById("urlDiffuseur").innerText = "Lien de diffusion : " + document.location.href + "?diffuseur=" + document.getElementById("nomDiffuseur").value;
			
			// On commence par récupérer un id placé dans un cookie pour permettre d'envoyer les données
			var cle = "";
			ajaxGet("/oot/api/diffusion/" + document.getElementById("nomDiffuseur").value, function(retour) {
				// Traitement à la réception, on peut identifier le fait d'avoir bien reçu une réponse valide du serveur
				cle = retour.split("/")[0];
				document.getElementById("urlDiffuseur").innerText = "Lien de diffusion : " + document.location.href + "/" + retour.split("/")[1];
			});
			
			//On envoie ici les données de diffusion avec une certaine fréquence
			intervalDiffusion = setInterval(function () {
				ajaxPost("/oot/api/data/" + cle, generationJSON(), function(text) {
					// Traitement à la réception, on peut identifier le fait d'avoir bien reçu une réponse valide du serveur
					document.getElementById("statutDiffusion").innerText = retour;
				})
			}, 10000);
		}
	}
}

// Récupération du query
function getParams(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

// Cette fonction a pour objectif de récupérer la diffusion depuis le serveur à distance à intervalles réguliers
function modeLecteur(codeDiffuseur) {
	// On va récupérer des données json via appel ajax
	ajaxGet("/oot/api/lecture/" + codeDiffuseur, function(retour) {
		// On a récupéré l'historique, on peut le charger
		historique = JSON.parse(retour);
		chargerHistorique(true);
	})
}