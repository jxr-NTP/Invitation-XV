function openInvitation() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    // Ocultar pantalla de bienvenida
    welcomeScreen.classList.add('hidden');

    // Mostrar contenido principal después de la transición
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.style.opacity = '1';
    }, 1000); // Tiempo que coincide con la transición
}

// Comprobar orientación
function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        // Modo vertical
        document.body.classList.remove('horizontal');
        document.body.classList.add('vertical');
    } else {
        // Modo horizontal
        document.body.classList.remove('vertical');
        document.body.classList.add('horizontal');
    }
}

// Comprobar orientación al cargar la página
window.addEventListener('load', checkOrientation);

// Comprobar orientación al cambiar el tamaño o rotar el dispositivo
window.addEventListener('resize', checkOrientation);

// Observa la visibilidad de los contenedores
const containers = document.querySelectorAll('.container');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.2 } // Activa el efecto cuando el 20% del contenedor es visible
);

containers.forEach((container) => {
    observer.observe(container);
});

// Efecto mágico para las secciones
function addMagicScroll() {
    const sections = document.querySelectorAll('.container');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.opacity = '1';
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach((section) => {
        section.style.transform = 'scale(0.9)';
        section.style.opacity = '0';
        observer.observe(section);
    });
}

// Inicializar efectos al cargar
document.addEventListener('DOMContentLoaded', () => {
    addMagicScroll();
});


// Configuración de la fecha del evento
const eventDate = new Date('2025-03-15T15:00:00');

function updateCountdown() {
    const now = new Date();
    const timeLeft = eventDate - now;

    if (timeLeft <= 0) {
        document.getElementById('countdown-timer').innerText = "¡El evento ha comenzado!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('countdown-timer').innerText =
        `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}

// Actualizar la cuenta regresiva cada segundo
setInterval(updateCountdown, 1000);

// Iniciar inmediatamente
updateCountdown();

// LAMPARAS
// Configuración
const recentPositions = new Set(); // Usamos un Set para almacenar posiciones recientes
const sectionCount = 20; // Dividir el ancho de la pantalla en 20 secciones
const minDistance = 80; // Distancia mínima entre posiciones recientes (no utilizado aquí pero disponible)
const lanternInterval = 2000; // Tiempo entre generación de lámparas (en ms)
const maxLanterns = 20; // Máximo número de lámparas visibles simultáneamente
let activeLanterns = 0; // Contador de lámparas activas

function generateLantern() {
    if (activeLanterns >= maxLanterns) return; // No generar más si ya alcanzamos el límite

    const lanternContainer = document.getElementById('lantern-container');
    const screenWidth = window.innerWidth;

    // Dividir el ancho en secciones
    const sectionWidth = screenWidth / sectionCount;

    let sectionIndex;
    let attempts = 0;

    do {
        // Elegir una sección aleatoria
        sectionIndex = Math.floor(Math.random() * sectionCount);
        attempts++;
    } while (
        recentPositions.has(sectionIndex) &&
        attempts < 10 // Evitar bucles infinitos
    );

    // Si no se pudo encontrar una sección adecuada, usar cualquiera
    if (attempts >= 10) {
        sectionIndex = Math.floor(Math.random() * sectionCount);
    }

    // Actualizar posiciones recientes
    recentPositions.add(sectionIndex);
    setTimeout(() => recentPositions.delete(sectionIndex), lanternInterval * 2); // Liberar la sección tras 2 intervalos

    // Calcular posición en el eje x dentro de la sección elegida
    const x = sectionIndex * sectionWidth + Math.random() * sectionWidth;

    // Crear una nueva lámpara
    const lantern = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lantern.setAttribute('class', 'lantern');

    // Inserta tu SVG aquí
    lantern.innerHTML = `<svg width="77.3" height="100" viewBox="0 0 451.96638 584.70755" version="1.1" id="svg1"
        xml:space="preserve" inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)"
        sodipodi:docname="prueba1.svg" inkscape:export-filename="prueba1.png" inkscape:export-xdpi="96"
        inkscape:export-ydpi="96" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg">

        <g inkscape:groupmode="layer" id="layer2" inkscape:label="Capa 2"
            transform="translate(-571.52088,-114.40015)" style="display:inline">

            <defs>
                <linearGradient id="lampGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    // Color superior (#ffa20c)
                    <stop offset="0%" style="stop-color:#ffa20c;stop-opacity:1" />
                    // Color en el centro 
                    <stop offset="50%" style="stop-color:#ffcc30;stop-opacity:1" />
                    // Color inferior (#ffe957)
                    <stop offset="100%" style="stop-color:#ffe957;stop-opacity:1" />
                </linearGradient>
            </defs>

            // Aplicar el gradiente al path
            <path id="path1"
                style="display:inline;opacity:1;fill:url(#lampGradient);fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:6.488;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1;paint-order:markers stroke fill"
                d="M 1003.1736,382.15257 C 1049.2887,673.62506 1028.042,669.10512 821.68584,692.682 615.32959,716.25889 613.2936,684.72389 583.74041,431.10427 554.18723,177.48466 565.06176,134.45589 767.74312,120.57482 970.42447,106.69373 957.05858,90.68004 1003.1736,382.15257 Z"
                inkscape:transform-center-x="10.074087" inkscape:transform-center-y="-16.366055"
                sodipodi:nodetypes="zzzzz" inkscape:label="path1" />


            <path
                style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                d="m 589.43033,211.71886 c 0,0 20.67076,5.0111 24.42909,-5.01109 3.75832,-10.0222 0.6264,-33.19852 10.64858,-37.58324 10.0222,-4.38471 12.52775,3.13194 12.52775,3.13194"
                id="path2" />
            <g id="g7">
                <path
                    style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 733.50126,188.34521 c 0,0 -21.04175,8.66538 -26.38901,-0.60695 -5.34725,-9.27235 -6.04902,-32.64879 -16.65349,-35.33488 -10.60449,-2.68607 -11.84661,5.13921 -11.84661,5.13921"
                    id="path2-1" sodipodi:nodetypes="cssc" />
                <path
                    style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 734.48012,188.33478 c 0,0 22.49935,5.04302 26.25768,-4.97917 3.75832,-10.0222 0.6264,-33.19852 10.64858,-37.58324 10.0222,-4.38471 12.52775,3.13194 12.52775,3.13194"
                    id="path2-9" sodipodi:nodetypes="cssc" />
            </g>
            <g id="g9">
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3.35181;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path4" sodipodi:type="arc" sodipodi:cx="609.5415" sodipodi:cy="304.45145"
                    sodipodi:rx="1.8240124" sodipodi:ry="2.8345068" sodipodi:start="0" sodipodi:end="6.2276374"
                    sodipodi:arc-type="slice"
                    d="m 611.36552,304.45145 a 1.8240124,2.8345068 0 0 1 -1.79869,2.83423 1.8240124,2.8345068 0 0 1 -1.84864,-2.75552 1.8240124,2.8345068 0 0 1 1.74735,-2.91076 1.8240124,2.8345068 0 0 1 1.89716,2.67468 l -1.8212,0.15737 z"
                    transform="rotate(-11.178551)" />
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 641.27087,203.73795 c 0,0 5.53614,3.65568 9.14646,1.74755 5.27202,-2.78636 2.08499,-7.3162 -1.90378,-14.28399 -2.47201,-4.31826 -1.1247,-27.70578 0.6567,-30.51839"
                    id="path5" sodipodi:nodetypes="cssc" />
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 679.43014,195.99284 c 0,0 -4.01293,5.28291 -8.05146,4.6782 -5.89732,-0.88301 -4.39043,-6.21273 -2.9345,-14.10834 0.90229,-4.89327 -4.86616,-24.92347 -7.47856,-26.98733"
                    id="path5-2" sodipodi:nodetypes="cssc" />
            </g>
            <g id="g9-5" style="display:inline" transform="rotate(2.7211372,1099.5652,3271.4673)">
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3.35181;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path4-9" sodipodi:type="arc" sodipodi:cx="609.5415" sodipodi:cy="304.45145"
                    sodipodi:rx="1.8240124" sodipodi:ry="2.8345068" sodipodi:start="0" sodipodi:end="6.2276374"
                    sodipodi:arc-type="slice"
                    d="m 611.36552,304.45145 a 1.8240124,2.8345068 0 0 1 -1.79869,2.83423 1.8240124,2.8345068 0 0 1 -1.84864,-2.75552 1.8240124,2.8345068 0 0 1 1.74735,-2.91076 1.8240124,2.8345068 0 0 1 1.89716,2.67468 l -1.8212,0.15737 z"
                    transform="rotate(-11.178551)" />
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 641.27087,203.73795 c 0,0 5.53614,3.65568 9.14646,1.74755 5.27202,-2.78636 2.08499,-7.3162 -1.90378,-14.28399 -2.47201,-4.31826 -1.1247,-27.70578 0.6567,-30.51839"
                    id="path5-1" sodipodi:nodetypes="cssc" />
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 679.43014,195.99284 c 0,0 -4.01293,5.28291 -8.05146,4.6782 -5.89732,-0.88301 -4.39043,-6.21273 -2.9345,-14.10834 0.90229,-4.89327 -4.86616,-24.92347 -7.47856,-26.98733"
                    id="path5-2-4" sodipodi:nodetypes="cssc" />
            </g>
            <g id="g9-5-3" style="display:inline"
                transform="matrix(1.0552885,0.14117564,-0.13839421,0.98752752,281.41951,-117.21345)">
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3.35181;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path4-9-6" sodipodi:type="arc" sodipodi:cx="595.99756" sodipodi:cy="334.84988"
                    sodipodi:rx="1.8259028" sodipodi:ry="2.8316195" sodipodi:start="0.95992643"
                    sodipodi:end="4.1955109" sodipodi:arc-type="slice"
                    d="m 597.04486,337.1694 a 1.8259028,2.8316195 0 0 1 -1.87041,0.20806 1.8259028,2.8316195 0 0 1 -1.00224,-2.4579 1.8259028,2.8316195 0 0 1 0.92305,-2.53139 l 0.9023,2.46171 z"
                    transform="matrix(0.97022351,-0.24221135,0.23660435,0.97160608,0,0)" />
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 641.27087,203.73795 c 0,0 5.53614,3.65568 9.14646,1.74755 5.27202,-2.78636 3.80046,-7.43653 -0.18829,-14.40433 -2.47201,-4.31826 -4.31731,-10.37278 -2.73993,-22.42913"
                    id="path5-1-4" sodipodi:nodetypes="cssc" />
            </g>
            <g id="g8">
                <g id="g6"
                    transform="matrix(0.53638526,-0.08304376,-0.10324791,-0.48764458,377.92082,339.21473)">
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3.35181;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        id="path4-5" sodipodi:type="arc" sodipodi:cx="650.98145" sodipodi:cy="371.11566"
                        sodipodi:rx="0.87433839" sodipodi:ry="6.7578597" sodipodi:start="0"
                        sodipodi:end="6.2107774" sodipodi:arc-type="slice"
                        d="m 651.85578,371.11566 a 0.87433839,6.7578597 0 0 1 -0.85851,6.75675 0.87433839,6.7578597 0 0 1 -0.88959,-6.51214 0.87433839,6.7578597 0 0 1 0.82631,-6.99251 0.87433839,6.7578597 0 0 1 0.9195,6.25901 l -0.87204,0.48889 z"
                        transform="rotate(-11.178551)" />
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        d="m 699.64142,262.05549 c 0,0 2.17923,-0.84299 3.64188,-4.92582 2.32322,-6.485 2.0523,-12.10191 -1.93647,-19.0697 -2.47201,-4.31826 -0.38025,-17.19864 1.40115,-20.01125"
                        id="path5-0" sodipodi:nodetypes="cssc" />
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        d="m 732.44991,258.78893 c 0,0 -2.51891,-1.51987 -6.07743,-5.54734 -2.34211,-2.65075 -5.67871,-5.43526 -4.22278,-13.33087 0.90229,-4.89327 -4.99395,-20.90589 -7.60635,-22.96975"
                        id="path5-2-2" sodipodi:nodetypes="cssc" />
                </g>
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:2.64053;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path6" sodipodi:type="arc" sodipodi:cx="734.95453" sodipodi:cy="153.62944"
                    sodipodi:rx="0.10664776" sodipodi:ry="1.6151986" sodipodi:start="0" sodipodi:end="6.2107774"
                    sodipodi:arc-type="slice"
                    d="m 735.06118,153.62944 a 0.10664776,1.6151986 0 0 1 -0.10472,1.61493 0.10664776,1.6151986 0 0 1 -0.10851,-1.55647 0.10664776,1.6151986 0 0 1 0.10079,-1.67128 0.10664776,1.6151986 0 0 1 0.11216,1.49597 l -0.10637,0.11685 z" />
            </g>
            <g id="g7-5" style="display:inline" transform="translate(143.88664,-12.20339)">
                <path
                    style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 733.50126,188.34521 c 0,0 -21.04175,8.66538 -26.38901,-0.60695 -5.34725,-9.27235 -6.04902,-32.64879 -16.65349,-35.33488 -10.60449,-2.68607 -11.84661,5.13921 -11.84661,5.13921"
                    id="path2-1-0" sodipodi:nodetypes="cssc" />
                <path
                    style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 734.48012,188.33478 c 0,0 22.49935,5.04302 26.25768,-4.97917 3.75832,-10.0222 0.6264,-33.19852 10.64858,-37.58324 10.0222,-4.38471 12.52775,3.13194 12.52775,3.13194"
                    id="path2-9-4" sodipodi:nodetypes="cssc" />
            </g>
            <g id="g8-3" style="display:inline" transform="translate(143.88664,-12.20339)">
                <g id="g6-5"
                    transform="matrix(0.53638526,-0.08304376,-0.10324791,-0.48764458,377.92082,339.21473)">
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3.35181;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        id="path4-5-5" sodipodi:type="arc" sodipodi:cx="650.98145" sodipodi:cy="371.11566"
                        sodipodi:rx="0.87433839" sodipodi:ry="6.7578597" sodipodi:start="0"
                        sodipodi:end="6.2107774" sodipodi:arc-type="slice"
                        d="m 651.85578,371.11566 a 0.87433839,6.7578597 0 0 1 -0.85851,6.75675 0.87433839,6.7578597 0 0 1 -0.88959,-6.51214 0.87433839,6.7578597 0 0 1 0.82631,-6.99251 0.87433839,6.7578597 0 0 1 0.9195,6.25901 l -0.87204,0.48889 z"
                        transform="rotate(-11.178551)" />
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        d="m 699.64142,262.05549 c 0,0 2.17923,-0.84299 3.64188,-4.92582 2.32322,-6.485 2.0523,-12.10191 -1.93647,-19.0697 -2.47201,-4.31826 -0.38025,-17.19864 1.40115,-20.01125"
                        id="path5-0-8" sodipodi:nodetypes="cssc" />
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        d="m 732.44991,258.78893 c 0,0 -2.51891,-1.51987 -6.07743,-5.54734 -2.34211,-2.65075 -5.67871,-5.43526 -4.22278,-13.33087 0.90229,-4.89327 -4.99395,-20.90589 -7.60635,-22.96975"
                        id="path5-2-2-9" sodipodi:nodetypes="cssc" />
                </g>
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:2.64053;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path6-5" sodipodi:type="arc" sodipodi:cx="734.95453" sodipodi:cy="153.62944"
                    sodipodi:rx="0.10664776" sodipodi:ry="1.6151986" sodipodi:start="0" sodipodi:end="6.2107774"
                    sodipodi:arc-type="slice"
                    d="m 735.06118,153.62944 a 0.10664776,1.6151986 0 0 1 -0.10472,1.61493 0.10664776,1.6151986 0 0 1 -0.10851,-1.55647 0.10664776,1.6151986 0 0 1 0.10079,-1.67128 0.10664776,1.6151986 0 0 1 0.11216,1.49597 l -0.10637,0.11685 z" />
            </g>
            <path
                style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                d="m 1009.3646,586.13397 c 0,0 -20.87191,-4.09329 -24.18394,6.08512 -3.31201,10.17841 0.84045,33.19378 -8.9783,38.01686 -9.81876,4.82308 -12.65384,-2.57558 -12.65384,-2.57558"
                id="path2-8" />
            <g id="g7-6" style="display:inline" transform="rotate(177.46867,795.26137,403.56534)">
                <path
                    style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 733.50126,188.34521 c 0,0 -21.04175,8.66538 -26.38901,-0.60695 -5.34725,-9.27235 -6.04902,-32.64879 -16.65349,-35.33488 -10.60449,-2.68607 -11.84661,5.13921 -11.84661,5.13921"
                    id="path2-1-1" sodipodi:nodetypes="cssc" />
                <path
                    style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 734.48012,188.33478 c 0,0 22.49935,5.04302 26.25768,-4.97917 3.75832,-10.0222 0.6264,-33.19852 10.64858,-37.58324 10.0222,-4.38471 12.52775,3.13194 12.52775,3.13194"
                    id="path2-9-6" sodipodi:nodetypes="cssc" />
            </g>
            <g id="g9-3" style="display:inline" transform="rotate(177.46867,795.26137,403.56534)">
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3.35181;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path4-99" sodipodi:type="arc" sodipodi:cx="609.5415" sodipodi:cy="304.45145"
                    sodipodi:rx="1.8240124" sodipodi:ry="2.8345068" sodipodi:start="0" sodipodi:end="6.2276374"
                    sodipodi:arc-type="slice"
                    d="m 611.36552,304.45145 a 1.8240124,2.8345068 0 0 1 -1.79869,2.83423 1.8240124,2.8345068 0 0 1 -1.84864,-2.75552 1.8240124,2.8345068 0 0 1 1.74735,-2.91076 1.8240124,2.8345068 0 0 1 1.89716,2.67468 l -1.8212,0.15737 z"
                    transform="rotate(-11.178551)" />
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 641.27087,203.73795 c 0,0 5.53614,3.65568 9.14646,1.74755 5.27202,-2.78636 2.08499,-7.3162 -1.90378,-14.28399 -2.47201,-4.31826 -1.1247,-27.70578 0.6567,-30.51839"
                    id="path5-3" sodipodi:nodetypes="cssc" />
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 679.43014,195.99284 c 0,0 -4.01293,5.28291 -8.05146,4.6782 -5.89732,-0.88301 -4.39043,-6.21273 -2.9345,-14.10834 0.90229,-4.89327 -4.86616,-24.92347 -7.47856,-26.98733"
                    id="path5-2-9" sodipodi:nodetypes="cssc" />
            </g>
            <g id="g9-5-6" style="display:inline" transform="rotate(-179.81019,727.34154,412.29316)">
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3.35181;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path4-9-8" sodipodi:type="arc" sodipodi:cx="609.5415" sodipodi:cy="304.45145"
                    sodipodi:rx="1.8240124" sodipodi:ry="2.8345068" sodipodi:start="0" sodipodi:end="6.2276374"
                    sodipodi:arc-type="slice"
                    d="m 611.36552,304.45145 a 1.8240124,2.8345068 0 0 1 -1.79869,2.83423 1.8240124,2.8345068 0 0 1 -1.84864,-2.75552 1.8240124,2.8345068 0 0 1 1.74735,-2.91076 1.8240124,2.8345068 0 0 1 1.89716,2.67468 l -1.8212,0.15737 z"
                    transform="rotate(-11.178551)" />
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 641.27087,203.73795 c 0,0 5.53614,3.65568 9.14646,1.74755 5.27202,-2.78636 2.08499,-7.3162 -1.90378,-14.28399 -2.47201,-4.31826 -1.1247,-27.70578 0.6567,-30.51839"
                    id="path5-1-5" sodipodi:nodetypes="cssc" />
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 679.43014,195.99284 c 0,0 -4.01293,5.28291 -8.05146,4.6782 -5.89732,-0.88301 -4.39043,-6.21273 -2.9345,-14.10834 0.90229,-4.89327 -4.86616,-24.92347 -7.47856,-26.98733"
                    id="path5-2-4-0" sodipodi:nodetypes="cssc" />
            </g>
            <g id="g9-5-3-3" style="display:inline"
                transform="matrix(-1.0604939,-0.09443031,0.09464429,-0.99267619,1331.6023,901.14178)">
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3.35181;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path4-9-6-8" sodipodi:type="arc" sodipodi:cx="595.99756" sodipodi:cy="334.84988"
                    sodipodi:rx="1.8259028" sodipodi:ry="2.8316195" sodipodi:start="0.95992643"
                    sodipodi:end="0.87784587" sodipodi:arc-type="slice"
                    d="m 597.04486,337.1694 a 1.8259028,2.8316195 0 0 1 -2.52118,-0.6481 1.8259028,2.8316195 0 0 1 0.36609,-3.92234 1.8259028,2.8316195 0 0 1 2.53621,0.48714 1.8259028,2.8316195 0 0 1 -0.26202,3.94233 l -1.1664,-2.17855 z"
                    transform="matrix(0.97022351,-0.24221135,0.23660435,0.97160608,0,0)" />
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 641.27087,203.73795 c 0,0 5.53614,3.65568 9.14646,1.74755 5.27202,-2.78636 3.51932,-9.45362 0.12661,-16.76978 -5.13567,-11.07475 -5.34842,-10.41264 -1.65037,-26.7934"
                    id="path5-1-4-2" sodipodi:nodetypes="cssc" />
            </g>
            <g id="g8-31" style="display:inline" transform="rotate(177.46867,795.26137,403.56534)">
                <g id="g6-6"
                    transform="matrix(0.53638526,-0.08304376,-0.10324791,-0.48764458,377.92082,339.21473)">
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3.35181;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        id="path4-5-7" sodipodi:type="arc" sodipodi:cx="650.98145" sodipodi:cy="371.11566"
                        sodipodi:rx="0.87433839" sodipodi:ry="6.7578597" sodipodi:start="0"
                        sodipodi:end="6.2107774" sodipodi:arc-type="slice"
                        d="m 651.85578,371.11566 a 0.87433839,6.7578597 0 0 1 -0.85851,6.75675 0.87433839,6.7578597 0 0 1 -0.88959,-6.51214 0.87433839,6.7578597 0 0 1 0.82631,-6.99251 0.87433839,6.7578597 0 0 1 0.9195,6.25901 l -0.87204,0.48889 z"
                        transform="rotate(-11.178551)" />
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        d="m 699.64142,262.05549 c 0,0 2.17923,-0.84299 3.64188,-4.92582 2.32322,-6.485 2.0523,-12.10191 -1.93647,-19.0697 -2.47201,-4.31826 -0.38025,-17.19864 1.40115,-20.01125"
                        id="path5-0-83" sodipodi:nodetypes="cssc" />
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        d="m 732.44991,258.78893 c 0,0 -2.51891,-1.51987 -6.07743,-5.54734 -2.34211,-2.65075 -5.67871,-5.43526 -4.22278,-13.33087 0.90229,-4.89327 -4.99395,-20.90589 -7.60635,-22.96975"
                        id="path5-2-2-5" sodipodi:nodetypes="cssc" />
                </g>
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:2.64053;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path6-2" sodipodi:type="arc" sodipodi:cx="734.95453" sodipodi:cy="153.62944"
                    sodipodi:rx="0.10664776" sodipodi:ry="1.6151986" sodipodi:start="0" sodipodi:end="6.2107774"
                    sodipodi:arc-type="slice"
                    d="m 735.06118,153.62944 a 0.10664776,1.6151986 0 0 1 -0.10472,1.61493 0.10664776,1.6151986 0 0 1 -0.10851,-1.55647 0.10664776,1.6151986 0 0 1 0.10079,-1.67128 0.10664776,1.6151986 0 0 1 0.11216,1.49597 l -0.10637,0.11685 z" />
            </g>
            <g id="g7-5-0" style="display:inline" transform="rotate(177.46867,723.45287,411.25652)">
                <path
                    style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 733.50126,188.34521 c 0,0 -21.04175,8.66538 -26.38901,-0.60695 -5.34725,-9.27235 -6.04902,-32.64879 -16.65349,-35.33488 -10.60449,-2.68607 -11.84661,5.13921 -11.84661,5.13921"
                    id="path2-1-0-5" sodipodi:nodetypes="cssc" />
                <path
                    style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    d="m 734.48012,188.33478 c 0,0 22.49935,5.04302 26.25768,-4.97917 3.75832,-10.0222 0.6264,-33.19852 10.64858,-37.58324 10.0222,-4.38471 12.52775,3.13194 12.52775,3.13194"
                    id="path2-9-4-2" sodipodi:nodetypes="cssc" />
            </g>
            <g id="g8-3-6" style="display:inline" transform="rotate(177.46867,723.45287,411.25652)">
                <g id="g6-5-6"
                    transform="matrix(0.53638526,-0.08304376,-0.10324791,-0.48764458,377.92082,339.21473)">
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3.35181;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        id="path4-5-5-3" sodipodi:type="arc" sodipodi:cx="650.98145" sodipodi:cy="371.11566"
                        sodipodi:rx="0.87433839" sodipodi:ry="6.7578597" sodipodi:start="0"
                        sodipodi:end="6.2107774" sodipodi:arc-type="slice"
                        d="m 651.85578,371.11566 a 0.87433839,6.7578597 0 0 1 -0.85851,6.75675 0.87433839,6.7578597 0 0 1 -0.88959,-6.51214 0.87433839,6.7578597 0 0 1 0.82631,-6.99251 0.87433839,6.7578597 0 0 1 0.9195,6.25901 l -0.87204,0.48889 z"
                        transform="rotate(-11.178551)" />
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        d="m 699.64142,262.05549 c 0,0 2.17923,-0.84299 3.64188,-4.92582 2.32322,-6.485 2.0523,-12.10191 -1.93647,-19.0697 -2.47201,-4.31826 -0.38025,-17.19864 1.40115,-20.01125"
                        id="path5-0-8-3" sodipodi:nodetypes="cssc" />
                    <path
                        style="display:inline;fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                        d="m 732.44991,258.78893 c 0,0 -2.51891,-1.51987 -6.07743,-5.54734 -2.34211,-2.65075 -5.67871,-5.43526 -4.22278,-13.33087 0.90229,-4.89327 -4.99395,-20.90589 -7.60635,-22.96975"
                        id="path5-2-2-9-3" sodipodi:nodetypes="cssc" />
                </g>
                <path
                    style="fill:none;fill-opacity:1;stroke:#fb12ac;stroke-width:2.64053;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path6-5-6" sodipodi:type="arc" sodipodi:cx="734.95453" sodipodi:cy="153.62944"
                    sodipodi:rx="0.10664776" sodipodi:ry="1.6151986" sodipodi:start="0" sodipodi:end="6.2107774"
                    sodipodi:arc-type="slice"
                    d="m 735.06118,153.62944 a 0.10664776,1.6151986 0 0 1 -0.10472,1.61493 0.10664776,1.6151986 0 0 1 -0.10851,-1.55647 0.10664776,1.6151986 0 0 1 0.10079,-1.67128 0.10664776,1.6151986 0 0 1 0.11216,1.49597 l -0.10637,0.11685 z" />
            </g>
            <g id="g11" transform="rotate(-5.2499334,755.46669,227.29031)">
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 698.39964,382.20028 15.27634,-2.77918 c 0,0 -0.10475,-6.59322 0.88545,-8.13083 0.99017,-1.53766 -26.42275,-19.91149 -40.73151,9.87982 -1.47355,3.06799 9.31672,-6.83985 15.63542,-3.82908 4.89988,2.33473 8.9343,4.85927 8.9343,4.85927 z"
                    id="path11-5-3" sodipodi:nodetypes="ccsssc" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 838.81154,437.08387 -14.23922,-6.19151 c 0,0 -3.58183,5.53643 -5.26018,6.26298 -1.67834,0.72662 10.87406,31.24715 39.34051,14.45654 2.93155,-1.72915 -11.54713,0.49867 -15.12181,-5.519 -2.772,-4.66644 -4.7193,-9.00901 -4.7193,-9.00901 z"
                    id="path11-5-8" sodipodi:nodetypes="ccsssc" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 780.56666,469.57278 -4.75551,-14.78091 c 0,0 -6.52274,0.96715 -8.17677,0.18681 -1.65407,-0.78031 -16.2803,28.80244 15.12809,39.08718 3.23452,1.05915 -8.00088,-8.34091 -5.84339,-14.99944 1.67304,-5.16339 3.64758,-9.49364 3.64758,-9.49364 z"
                    id="path11-5-2" sodipodi:nodetypes="ccsssc" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 717.5294,446.60423 8.96843,-12.67508 c 0,0 -4.68847,-4.63679 -5.05703,-6.42813 -0.36862,-1.79134 -32.80913,4.26497 -22.18449,35.56002 1.09414,3.22284 1.8695,-11.40569 8.49028,-13.67638 5.13412,-1.76082 9.78281,-2.78043 9.78281,-2.78043 z"
                    id="path11-5-5" sodipodi:nodetypes="ccsssc" />
                <path
                    style="fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:2.6992;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
                    id="path9" sodipodi:type="arc" sodipodi:cx="773.66974" sodipodi:cy="394.12012"
                    sodipodi:rx="55.230946" sodipodi:ry="55.230946" sodipodi:start="4.8700787"
                    sodipodi:end="4.8598527" sodipodi:arc-type="arc"
                    d="m 782.34304,339.57444 a 55.230946,55.230946 0 0 1 45.89437,63.07951 55.230946,55.230946 0 0 1 -62.96197,46.05548 55.230946,55.230946 0 0 1 -46.2163,-62.84403 55.230946,55.230946 0 0 1 62.72567,-46.3768"
                    sodipodi:open="true" />
                <path
                    style="fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 763.16815,250.63272 c 0,0 1.99004,11.74127 1.586,13.92918 -0.40402,2.18795 -15.77507,23.50355 -15.77507,23.50355 0,0 -2.48158,16.41901 -0.3511,20.11447 2.13048,3.69549 10.73533,13.72306 10.69702,15.91738 -0.0383,2.1943 -0.17872,10.24009 -0.17872,10.24009 0,0 16.88047,-2.99781 25.60661,0.0811 8.72617,3.07893 10.54838,3.47657 10.54838,3.47657 0,0 0.40217,-23.04021 -1.76662,-24.54137 -2.16877,-1.50119 -16.66981,-9.0709 -17.67758,-14.21008 -1.0078,-5.13919 3.00048,-25.18985 1.97355,-29.23189 -1.02693,-4.04203 -14.66247,-19.27905 -14.66247,-19.27905 z"
                    id="path10" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 879.05615,294.50372 c 0,0 -7.82902,8.97352 -9.77846,10.04585 -1.94945,1.07235 -28.18069,2.66795 -28.18069,2.66795 0,0 -14.28091,8.47338 -15.7928,12.46206 -1.51192,3.9887 -3.82676,16.99782 -5.54967,18.3573 -1.72284,1.35949 -8.03995,6.34433 -8.03995,6.34433 0,0 13.00708,11.16928 16.14797,19.8733 3.14087,8.70408 3.98665,10.36637 3.98665,10.36637 0,0 18.08992,-14.27472 17.87897,-16.9039 -0.21092,-2.6292 -3.53139,-18.64653 -0.19115,-22.68011 3.3402,-4.03358 21.39885,-13.62425 23.87765,-16.97808 2.47881,-3.35382 5.64148,-23.55512 5.64148,-23.55512 z"
                    id="path10-5" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 917.09548,412.72511 c 0,0 -11.90314,-0.36436 -13.96842,-1.19191 -2.06529,-0.82756 -19.93124,-20.10012 -19.93124,-20.10012 0,0 -15.60726,-5.67063 -19.65028,-4.31071 -4.04305,1.35992 -15.57057,7.8184 -17.71426,7.34809 -2.14365,-0.47026 -10.00377,-2.19452 -10.00377,-2.19452 0,0 -0.38982,17.14015 -5.12902,25.0878 -4.73926,7.94768 -5.48842,9.65569 -5.48842,9.65569 0,0 22.50849,4.93771 24.40784,3.10754 1.89939,-1.83016 12.18001,-14.55373 17.41703,-14.52829 5.23699,0.0254 24.10353,7.9089 28.2687,7.6992 4.16517,-0.20968 21.79188,-10.5728 21.79188,-10.5728 z"
                    id="path10-5-1" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 849.05476,517.81006 c 0,0 -7.00595,-9.62987 -7.61751,-11.7691 -0.61156,-2.13921 3.67113,-28.06762 3.67113,-28.06762 0,0 -5.08236,-15.80861 -8.63449,-18.17034 -3.55215,-2.36174 -15.71974,-7.51395 -16.66165,-9.49624 -0.94195,-1.98221 -4.39576,-9.25034 -4.39576,-9.25034 0,0 -13.78409,10.1949 -22.96883,11.31976 -9.18484,1.12483 -10.99368,1.57942 -10.99368,1.57942 0,0 9.89041,20.81328 12.5006,21.19278 2.6102,0.37952 18.9648,0.70731 22.15376,4.86156 3.18899,4.15415 8.51978,23.89442 11.2378,27.05752 2.71798,3.16307 21.70866,10.74262 21.70866,10.74262 z"
                    id="path10-5-2" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 722.47801,530.28919 c 0,0 3.03586,-11.51525 4.3073,-13.34107 1.27145,-1.82585 24.0727,-14.89211 24.0727,-14.89211 0,0 9.04006,-13.9291 8.62567,-18.17452 -0.41438,-4.24547 -4.11066,-16.93142 -3.16961,-18.9141 0.94098,-1.98267 4.39123,-9.25249 4.39123,-9.25249 0,0 -16.61198,-4.24019 -23.28803,-10.64762 -6.67608,-6.40751 -8.17149,-7.5221 -8.17149,-7.5221 0,0 -9.88031,20.81808 -8.52493,23.08083 1.35535,2.26278 11.43657,15.14493 10.23227,20.24165 -1.20426,5.09672 -13.1344,21.70297 -13.86819,25.80835 -0.7338,4.10538 5.39309,23.61323 5.39309,23.61323 z"
                    id="path10-5-0" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 637.84634,439.40396 c 0,0 10.78752,-5.04451 13.00403,-5.23762 2.21653,-0.19312 26.85542,8.94737 26.85542,8.94737 0,0 16.48706,-1.97981 19.48183,-5.01737 2.9948,-3.03756 10.36919,-14.00178 12.49453,-14.54909 2.12528,-0.54734 9.91801,-2.55431 9.91801,-2.55431 0,0 -7.38428,-15.47286 -6.74002,-24.7038 0.64432,-9.23096 0.5424,-11.09327 0.5424,-11.09327 0,0 -22.31552,5.74718 -23.18502,8.23738 -0.86952,2.49019 -4.30483,18.48329 -8.99016,20.82308 -4.6853,2.33981 -25.07941,3.81505 -28.70208,5.88117 -3.62268,2.0661 -14.67896,19.2665 -14.67896,19.2665 z"
                    id="path10-5-5" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 655.59741,309.22195 c 0,0 10.2876,5.99857 11.70794,7.71112 1.42037,1.71256 7.92848,27.17367 7.92848,27.17367 0,0 11.01174,12.42917 15.2138,13.16267 4.20209,0.73352 17.41437,0.55644 19.07406,1.99243 1.65967,1.43592 7.74521,6.70097 7.74521,6.70097 0,0 8.51924,-14.87815 16.47582,-19.60236 7.95663,-4.7242 9.42985,-5.86795 9.42985,-5.86795 0,0 -17.42672,-15.07722 -19.9691,-14.3748 -2.5424,0.7024 -17.64754,6.98055 -22.2381,4.45989 -4.59055,-2.52062 -17.41118,-18.44944 -21.17189,-20.25212 -3.76071,-1.80269 -24.19612,-1.10351 -24.19612,-1.10351 z"
                    id="path10-5-27" />
                <path
                    style="opacity:1;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 735.86163,326.98022 10.40794,11.52236 c 0,0 5.54958,-3.56143 7.37817,-3.52949 1.82859,0.0319 3.01047,-32.94792 -29.85027,-29.42156 -3.38408,0.36315 10.72113,4.31764 11.48956,11.27467 0.59588,5.39488 0.5746,10.15402 0.5746,10.15402 z"
                    id="path11" sodipodi:nodetypes="ccsssc" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 801.67416,323.03783 -2.14704,15.37792 c 0,0 6.29407,1.96627 7.44402,3.38837 1.15,1.42208 27.18755,-18.85381 3.37937,-41.77615 -2.45183,-2.3606 3.5764,10.99064 -1.26251,16.04788 -3.75237,3.92166 -7.41384,6.96198 -7.41384,6.96198 z"
                    id="path11-5" sodipodi:nodetypes="ccsssc" />
                <path
                    style="display:inline;fill:#de32d1;fill-opacity:1;stroke:#fb12ac;stroke-width:3;stroke-linecap:round;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
                    d="m 846.61616,371.23393 -13.49229,7.68429 c 0,0 2.28363,6.186 1.85889,7.96487 -0.42468,1.77887 31.52797,10.03076 35.15633,-22.81885 0.37365,-3.38296 -6.52381,9.54069 -13.48319,8.79385 -5.3967,-0.57914 -10.03974,-1.62416 -10.03974,-1.62416 z"
                    id="path11-5-6" sodipodi:nodetypes="ccsssc" />
            </g>
        </g>
    </svg>`;

    // Posición inicial
    const y = window.innerHeight + 60; // Empieza debajo de la pantalla
    lantern.style.left = `${x}px`;
    lantern.style.top = `${y}px`;

    // Incrementar contador de lámparas activas
    activeLanterns++;

    // Eliminar la lámpara al finalizar la animación
    lantern.addEventListener('animationend', () => {
        lantern.remove();
        activeLanterns--; // Decrementar contador al eliminar lámpara
    });

    lanternContainer.appendChild(lantern);
}

function startLanterns() {
    // Generar lámparas iniciales (poco a poco)
    let initialLanterns = 0;
    const interval = setInterval(() => {
        if (initialLanterns < maxLanterns) {
            generateLantern();
            initialLanterns++;
        } else {
            clearInterval(interval);
        }
    }, 500);

    // Generar lámparas adicionales periódicamente
    setInterval(generateLantern, lanternInterval);
}

// Iniciar las lámparas al cargar la página
window.onload = startLanterns;
