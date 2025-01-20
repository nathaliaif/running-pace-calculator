const labelResultKmH = document.getElementById('result-km-h');

const buttonCalculateKmH = document.getElementById('calculate-kmh').addEventListener('click', ()=>{
    //Get input values
    const inputDistance = parseFloat(document.getElementById('total-km').value);
    const inputTotalTime = document.getElementById('total-time').value;
    
    if (!inputDistance || !inputTotalTime){
        labelResultKmH.textContent = "Please enter both distance and time.";
        return;
    }
    
    const [hours, minutes] = inputTotalTime.split(":").map(Number);
    const totalTimeInHours = hours + minutes / 60;
    
    //Calculate speed in km/h
    const resultKmPerH = inputDistance / totalTimeInHours;
    
    labelResultKmH.innerText = `${resultKmPerH}km/h`;
    labelResultKmH.style.display = 'flex';
})

