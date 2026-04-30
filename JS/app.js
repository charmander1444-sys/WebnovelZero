const contenedor = document.getElementById("contenedor-arcos");

fetch("data/novelas.json")
    .then(res => res.json())
    .then(data => mostrarArcos(data));

function mostrarArcos(arcos) {
    arcos.forEach(arco => {

        const img = arco.imagenes[0].src[0];

        const card = document.createElement("div");
        card.classList.add("arco");

        const scansHTML = arco.scans.map(scan => {
    return `<a href="${scan.link}" target="_blank" class="tag-scan">
                ${scan.nombre}
            </a>`;
}).join("");

card.innerHTML = `
    <img src="${img}">
    <div class="arco-content">
        <h3>${arco.nombre}</h3>
        <p>${arco.titulo}</p>

        <div class="scans">
            ${scansHTML}
        </div>

        <button onclick="verVolumenes(${arco.id})">
            Ver Volúmenes
        </button>
    </div>
`;

        contenedor.appendChild(card);
    });
}

function verVolumenes(id) {
    window.location.href = `ver.html?id=${id}`;
}