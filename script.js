const labelResult = document.getElementById('result-label');
const labelResultDescription = document.getElementById('result__description');
const resetButton = document.getElementById('reset');
const radios = document.getElementsByName('result-type');
const radioDiv = document.querySelector(".calculator-header__buttons__results-options");

const RESULT_DESCRIPTION_TEXTS = {
    KM_H: "You'll need to run:",
    PACE: "Your pace will be:"
}

radioDiv.addEventListener("click", e => {
    switch(e.target.id){
        case "radio-km-h":
            editResultTexts(RESULT_DESCRIPTION_TEXTS.KM_H, '--');
            labelResult.style.fontSize = "1.5rem";
            break;
        case "radio-pace":
            editResultTexts(RESULT_DESCRIPTION_TEXTS.PACE, '--');
            break;
    } 
})

const buttonCalculateKmH = document.getElementById('calculate').addEventListener('click', ()=>{
    //Get input values
    const inputDistance = parseFloat(document.getElementById('total-km').value);
    const inputTotalTime = document.getElementById('total-time').value;
    labelResult.style.fontSize = "1.5rem";

    // Error handling
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
            
            editResultTexts(RESULT_DESCRIPTION_TEXTS.KM_H, `${resultKmPerH.toFixed(1)}km/h`);
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
            editResultTexts(RESULT_DESCRIPTION_TEXTS.PACE, `${resultPace} min/km`);
            break;
    }
})

resetButton.addEventListener('click', ()=>{
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.type == "time" ?  input.value = "00:00" : input.value = '';
    })
    radios[0].checked = true;
    editResultTexts(RESULT_DESCRIPTION_TEXTS.KM_H, '--');
})

function getCheckedValue(){
    const checkedRadio = document.querySelector("input[name='result-type']:checked");
    return checkedRadio.id;
}

function editResultTexts(description, result){
    labelResultDescription.innerText = description;
    labelResult.innerText = result;
    labelResult.style.fontSize = "1.5rem";
    return;
}
