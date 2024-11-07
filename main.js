const $horas = document.getElementById('horas');
const $minuts = document.getElementById('minuts');
const $seconds = document.getElementById('seconds');
const $dias = document.getElementById('dias');
const $themeOfMeeting = document.getElementById('nameMeeting');
const $nextDay = document.getElementById('nextDay');
const $nextHour = document.getElementById('nextHour');
const $nextMinute = document.getElementById('nextMinute');
const $horary = document.querySelector('.hora');
const $idPassword = document.getElementById('idPassword');
const $moreInfo = document.getElementById('more-info');

function regresiveCount() {
    const currentDay = new Date();
    const año = currentDay.getFullYear();
    const mes = currentDay.getMonth();
    const day = currentDay.getDate();


    const dayForWednesday = (4 - currentDay.getDay()) % 7 || 7;
    const dayForTuesday = (3 - currentDay.getDay()) % 7 || 7;

    let zoomMartes = new Date(año, mes, day + dayForTuesday, 23, 0, 0);
    let zoomMiercoles = new Date(año, mes, day + dayForWednesday, 23, 0, 0);

    // Formato de horario
    const options = { timeZoneName: 'short' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const horaryZone = formatter.formatToParts(currentDay).find(part => part.type === 'timeZoneName').value;

    // Diferencia Para llegar a hora común
    const diference = new Date().getTimezoneOffset();

    // Ajustar hora si hay diferencia de minutos
    if (diference !== 0) {
        if (diference % 60 === 0) {
            zoomMartes = new Date(año, mes, day + dayForTuesday - 1, 23 - diference / 60, 0, 0);
            zoomMiercoles = new Date(año, mes, day + dayForWednesday - 1, 23 - diference / 60, 0, 0);
        } else {
            zoomMartes = new Date(año, mes, day + dayForTuesday, 23 - Math.floor(diference / 60), 30, 0);
            zoomMiercoles = new Date(año, mes, day + dayForWednesday, 23 - Math.floor(diference / 60), 30, 0);
        }
    }



    // Cálculo de diferencias para martes y miércoles
    const diferenciaMilisegundosMartes = zoomMartes - currentDay;
    const diferenciaMilisegundosMiercoles = zoomMiercoles - currentDay;

    // Conversión de diferencias a días, horas, minutos y segundos
    // Martes
    const diferenciaSegundosMartes = Math.floor(diferenciaMilisegundosMartes / 1000);
    const diferenciaMinutosMartes = Math.floor(diferenciaSegundosMartes / 60);
    const diferenciaHorasMartes = Math.floor(diferenciaMinutosMartes / 60);
    const diferenciaDiasMartes = Math.floor(diferenciaHorasMartes / 24);

    // Miércoles
    const diferenciaSegundosMiercoles = Math.floor(diferenciaMilisegundosMiercoles / 1000);
    const diferenciaMinutosMiercoles = Math.floor(diferenciaSegundosMiercoles / 60);
    const diferenciaHorasMiercoles = Math.floor(diferenciaMinutosMiercoles / 60);
    const diferenciaDiasMiercoles = Math.floor(diferenciaHorasMiercoles / 24);
    if (diferenciaHorasMiercoles < 0 && diferenciaDiasMiercoles > -5) { 
        $horary.innerHTML = '<h2 class="in-proccess">Reunión en curso<span class="point one">.</span><span class="point two">.</span><span class="point tree">.</span></h2>';
        $nextDay.innerHTML = "martes";
        $nextHour.innerHTML = zoomMartes.getHours() % 24;
        $nextMinute.innerHTML = `${zoomMartes.getMinutes() % 60}0`;
    }else if (diferenciaDiasMartes < diferenciaDiasMiercoles && diferenciaDiasMartes > 0 || diferenciaHorasMiercoles < -5) {
        // Mostrar horas en los elementos del DOM
        if ($dias && $horas && $minuts && $seconds) {
            $dias.innerHTML = diferenciaDiasMartes;
            $horas.innerHTML = diferenciaHorasMartes % 24;
            $minuts.innerHTML = diferenciaMinutosMartes % 60;
            $seconds.innerHTML = diferenciaSegundosMartes % 60;
            $themeOfMeeting.innerHTML = "Zoom del Martes";
            $nextDay.innerHTML = "miercoles";
            $nextHour.innerHTML = zoomMiercoles.getHours() % 24;
            $nextMinute.innerHTML = `${zoomMiercoles.getMinutes() % 60}0`;
        } else {
            console.error("Uno o más elementos no existen en el DOM.");
        }

    } else if (diferenciaHorasMartes < 0 && diferenciaHorasMartes > -5) {
        $horary.innerHTML = '<h2 class="in-proccess">Reunión en curso<span class="point one">.</span><span class="point two">.</span><span class="point tree">.</span></h2>';
        $nextDay.innerHTML = "miercoles";
        $nextHour.innerHTML = zoomMiercoles.getHours() % 24;
        $nextMinute.innerHTML = `${zoomMiercoles.getMinutes() % 60}0`;
    } else if (diferenciaDiasMartes > diferenciaDiasMiercoles || diferenciaHorasMartes <= -5) {
        // Mostrar horas en los elementos del DOM
        if ($dias && $horas && $minuts && $seconds) {
            $dias.innerHTML = diferenciaDiasMiercoles;
            $horas.innerHTML = diferenciaHorasMiercoles % 24;
            $minuts.innerHTML = diferenciaMinutosMiercoles % 60;
            $seconds.innerHTML = diferenciaSegundosMiercoles % 60;
            $themeOfMeeting.innerHTML = "Zoom del Miércoles";
            $nextDay.innerHTML = "martes";
            $nextHour.innerHTML = zoomMartes.getHours() % 24;
            $nextMinute.innerHTML = `${zoomMartes.getMinutes() % 60}0`;
        } else {
            console.error("Uno o más elementos no existen en el DOM.");
        }
        
    }


        // logs
        // console.log("Diferencia en horas para martes:", diferenciaHorasMartes);
        // console.log("Diferencia en horas para miércoles:", diferenciaHorasMiercoles);
        // console.log("Diferencia en minutos para martes:", diferenciaMinutosMartes);
        // console.log("Diferencia en minutos para miércoles:", diferenciaMinutosMiercoles);
        // console.log("Diferencia en segundos para martes:", diferenciaSegundosMartes);
        // console.log("Diferencia en segundos para miércoles:", diferenciaSegundosMiercoles);
        // console.log("Diferencia en dias para martes:", diferenciaDiasMartes);
        // console.log("Diferencia en dias para miércoles:", diferenciaDiasMiercoles);


    setInterval(regresiveCount, 1000);      
    
}

regresiveCount()

$moreInfo.addEventListener('click', () => {
    $idPassword.classList.toggle('show');
})