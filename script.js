// VARIABILI PER IL MOVIMENTO
// (False = Abbassato, True = Alzato)
var braccioSinistro = false;
var braccioDestro = false;
var gambaSinistra = false;
var gambaDestra = false;

// METODI PER IL MOVIMENTO
// Metodo per il movimento dei bracci (eseguito con ritardo ogni volta)
function muoviArto(idBottone, nomeBraccio, movimentoX, movimentoY, ritardo, iAttuale, iMax){
    // Ritarda l'esecuzione della funzione di n secondi
    setTimeout(function() {
        // Ottieni l'oggetto da muovere
        const oggetto = scene.getObjectByName(nomeBraccio);

        if(idBottone == 1 && !braccioSinistro || idBottone == 2 && braccioSinistro || idBottone == 3 && !braccioDestro || idBottone == 4 && braccioDestro || idBottone == 5 && !gambaSinistra || idBottone == 6 && gambaSinistra || idBottone == 7 && !gambaDestra || idBottone == 8 && gambaDestra) {
            // Effettua la rotazione del braccio
            oggetto.rotation.x += movimentoX;
            oggetto.position.y += movimentoY;

            // Effettua il rendering
            renderer.render(scene, camera);

            // Chiamata ricorsiva al movimento (per renderlo fluido)
            iAttuale++;
            if(iAttuale < iMax)
                muoviArto(idBottone, nomeBraccio, movimentoX, movimentoY, ritardo, iAttuale, iMax);
            else
                if(idBottone == 1)
                    braccioSinistro = true;
                else if(idBottone == 2)
                    braccioSinistro = false;
                else if(idBottone == 3)
                    braccioDestro = true;
                else if(idBottone == 4)
                    braccioDestro = false;
                else if(idBottone == 5)
                    gambaSinistra = true;
                else if(idBottone == 6)
                    gambaSinistra = false;
                else if(idBottone == 7)
                    gambaDestra = true;
                else if(idBottone == 8)
                    gambaDestra = false;
        }
    }, ritardo);
}

// IMPORTAZIONE OGGETTO 3D
// Imposto la scena
var scene = new THREE.Scene();

// Imposto la vista
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 500;

// Imposto il renderer
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Imposto l'illuminazione
var hlight = new THREE.AmbientLight(0xffffff, 1);
scene.add(hlight);

// Aggiungo il renderer alla pagina HTML
const container = document.querySelector('#Robot');
container.appendChild(renderer.domElement);

// Imposto il loader del file GLB e lo carico
var loader = new THREE.GLTFLoader();
loader.load('Robot - GIGANTE.glb', function(gltf) {
    // Aggiungi il contenuto del file alla scena
    scene.add(gltf.scene);

    // Effettua il rendering
    renderer.render(scene, camera);
},
undefined,
    // In caso di errore stampalo a schermo
    function(error) {
    console.error(error);
});
