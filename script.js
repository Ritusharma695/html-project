async function getWeather(){

    const city=document.getElementById("city").value;

    const apiKey="2657e145d2990a24ba6ee7e2bb93bcb2";

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response=await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data=await response.json();

        document.getElementById("result").innerHTML=`
        <h2>${data.name}</h2>
        <p><b>Temperature:</b> ${data.main.temp} °C</p>
        <p><b>Humidity:</b> ${data.main.humidity}%</p>
        <p><b>Wind Speed:</b> ${data.wind.speed} m/s</p>
        <p><b>Weather:</b> ${data.weather[0].main}</p>
        `;

    }

    catch(error){

        document.getElementById("result").innerHTML="<p>City not found. Please try again.</p>";

    }

}
