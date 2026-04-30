const contenedor = document.getElementById("contenedor-volumenes");
const viewer = document.getElementById("pdfViewer");
const tituloVolumen = document.getElementById("titulo-volumen");
const tituloArco = document.getElementById("titulo-arco");

// Obtener ID
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Cargar JSON
fetch("data/novelas.json")
    .then(res => res.json())
    .then(data => {
        const arco = data.find(a => a.id === id);

        if (!arco) {
            contenedor.innerHTML = "<p>Error: Arco no encontrado</p>";
            return;
        }

        cargarArco(arco);
    });

function cargarArco(arco) {
    tituloArco.textContent = arco.nombre;

    const lista = arco.volumenes_detalle.map((vol, index) => {

        const capitulosHTML = vol.capitulos.map(cap =>
            `<div class="capitulo">• ${cap}</div>`
        ).join("");

        return `
            <div class="volumen-card">
                
                <div class="volumen-header" onclick="toggleVolumen(${index})">
                    <span>${vol.volumen}</span>
                    <span class="icono">▼</span>
                </div>

                <div class="volumen-body" id="vol-${index}">
                    
                    <button class="btn-leer"
                        onclick='abrirPDF("${vol.driveId}", "${vol.volumen}", ${JSON.stringify(vol.capitulos)})'>
                        Leer
                    </button>

                    <div class="capitulos">
                        ${capitulosHTML}
                    </div>

                </div>
            </div>
        `;
    }).join("");

    contenedor.innerHTML = lista;
}

// Toggle
function toggleVolumen(index) {
    const el = document.getElementById(`vol-${index}`);
    el.classList.toggle("activo");
}

// PDF
function abrirPDF(driveId, nombre, capitulos) {
    const url = `https://drive.google.com/file/d/${driveId}/preview`;

    viewer.src = url;
    tituloVolumen.textContent = nombre;

    // cargar capítulos en panel derecho
    const panel = document.getElementById("panel-capitulos");

    panel.innerHTML = capitulos.map(c =>
        `<div class="capitulo-item">${c}</div>`
    ).join("");

    document.getElementById("visor").scrollIntoView({
        behavior: "smooth"
    });
}

// Volver
function volver() {
    window.location.href = "index.html";
}