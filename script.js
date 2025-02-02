const labelResult = document.getElementById('result-label');
const labelResultDescription = document.getElementById('result__description');
const resetButton = document.getElementById('reset');

const buttonCalculateKmH = document.getElementById('calculate').addEventListener('click', ()=>{
    //Get input values
    const inputDistance = parseFloat(document.getElementById('total-km').value);
    const inputTotalTime = document.getElementById('total-time').value;

    if (!inputDistance || !inputTotalTime){
        labelResult.textContent = "Please enter both distance and time.";
        labelResult.style.fontSize = "1rem";
        return;
    }
    
    //Determine total time in hours
    const [hours, minutes] = inputTotalTime.split(":").map(Number);
    const totalTimeInHours = hours + minutes / 60;
    
    switch(getCheckedValue()){
        case "radio-km-h":
            //Calculate speed in km/h
            const resultKmPerH = inputDistance / totalTimeInHours;
            
            editResultTexts("You'll need to run:", `${resultKmPerH.toFixed(1)}km/h`);
            break;
            
        case "radio-pace":
             //Calculate pace per km
            const totalTimeInSeconds = (hours * 3600) + (minutes * 60);
            const paceInSeconds = totalTimeInSeconds / inputDistance;

            //Get whole minuts
            const paceMinutes = Math.floor(paceInSeconds / 60);
            // Get remaining seconds
            const paceSeconds = Math.round(paceInSeconds % 60);
             // Format as mm:ss
            const resultPace = `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
            editResultTexts("Your pace will be:", `${resultPace} min/km`);
            break;
    }
})

resetButton.addEventListener('click', ()=>{
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.type == "time" ?  input.value = "00:00" : input.value = '';
    })

    editResultTexts("You'll need to run:", '--');
})

function getCheckedValue(){
    var radios = document.getElementsByName('result-type');
    for (var i=0; i < radios.length; i++){
        if (radios[i].checked){
            return radios[i].id;
        }
    }
}

function editResultTexts(description, result){
    labelResultDescription.innerText = description;
    labelResult.innerText = result;

    // labelResult.style.fontSize = "";
    // labelResult.style.display = 'flex';
    return;
}
