'use strict';
let flagImg = document.querySelector('.custom-image');
function fetchCountryCode() {
    const apiURLlist = 'https://restcountries.com/v3.1/all?fields=name,cca2';

    return fetch(apiURLlist)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch flag image: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return {
                countryCode: data.map(country => country.cca2),
                countryNames: data.map(country => country.name.common)
            };
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
            return { countryCode: [], countryNames: [] }; 
        });
}
function getRandomCountries(countryCode, countryList) {
    let randomCountries = []
    for(let i = 0; i < 3; i++){
        let rand = Math.floor(Math.random() * countryCode.length);    
        randomCountries.push({
            code:countryCode[rand],
            name:countryList[rand],
        });
    }
    return randomCountries;
}
let randomCountries2;
let chosenCountry;

fetchCountryCode().then(result => {
    randomCountries2 = getRandomCountries(result.countryCode, result.countryNames);
    chosenCountry = chooseRandomCountry(randomCountries2); 
    console.log(chosenCountry);
    displayFlag(chosenCountry);
    
    const buttons = document.querySelectorAll('.option');
    buttons.forEach((button, index) => 
    {
        const country = randomCountries2[index];
        if (country) 
        {
            button.textContent = country.name;
            button.addEventListener('click', function() 
            {
                checkAnswer(button);
            });
            } else {
                button.textContent = "Unavailable";
            }
        });
        
    });

function chooseRandomCountry(country) {
    let rand = Math.trunc(Math.random() * country.length);
    console.log(country[rand]);
    return country[rand];
}

function displayFlag(countryChosen){
    flagImg.src = `https://flagcdn.com/192x144/${countryChosen.code.toLowerCase()}.png`;
    flagImg.alt = `${countryChosen.code.toUpperCase()} Flag`;
}

function checkAnswer(button){
    let buttonIndex = Array.from(button.parentNode.children).indexOf(button);
    let selectedCountry = randomCountries2[buttonIndex];
    let result;
    
    if (chosenCountry === selectedCountry){
        result = "Correct";
        document.querySelector('.message').textContent = 'Correct!';

        document.querySelector('body').style.backgroundColor = '#60b347';

    }else{
        result = "Incorrect";
        document.querySelector('.message').textContent = 'Incorrect...';
        document.querySelector('body').style.backgroundColor = '#FF0000';


    }

    console.log(result);
}

document.getElementById('again').addEventListener('click', function() {
    location.reload();
});




