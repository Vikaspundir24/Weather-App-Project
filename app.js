const tapSearch = document.querySelector(".tapSearch")
const leftMain = document.querySelector(".left-main")
const leftMain2 = document.querySelector(".left-main2")
const cross = document.querySelector(".cross")
const newName = document.getElementById("inputForm")
const submitBtn = document.querySelector(".submitBtn")
const answers = document.querySelector(".answers-main2")
const cel = document.querySelector(".cel")
const fah = document.querySelector(".fah")





const d = new Date();
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function checkDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }

}

const dat = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const m = new Date();

/* === EVENT LISTENERS === */

tapSearch.addEventListener("click", () => {
    leftMain.style.display = "none"
    leftMain2.style.display = "flex"


})

cross.addEventListener("click", () => {
    leftMain.style.display = "flex"
    leftMain2.style.display = "none"
})





submitBtn.addEventListener("click", () => {

    suggest();
    allData();
    getInfo();

    leftMain.style.display = "flex"
    leftMain2.style.display = "none"
})

fah.addEventListener("click", () =>{
    document.querySelectorAll('.maxTempf').forEach(item => {
        item.style.display = "flex" 
      })
    document.querySelectorAll('.minTempf').forEach(item2 => {
        item2.style.display = "flex" 
      })
    document.querySelectorAll('.minTemp').forEach(item3 => {
        item3.style.display = "none" 
      })
    document.querySelectorAll('.maxTemp').forEach(item4 => {
        item4.style.display = "none" 
      })

      document.querySelector(".cel-left").style.display = "none"
      document.querySelector(".fah-left").style.display = "flex"
      cel.style.backgroundColor = "#585676"
      fah.style.backgroundColor = "white"
      fah.style.color = "black"
      cel.style.color = "white"
})
cel.addEventListener("click", () =>{

    document.querySelectorAll('.maxTempf').forEach(item => {
        item.style.display = "none" 
      })
    document.querySelectorAll('.minTempf').forEach(item2 => {
        item2.style.display = "none" 
      })
    document.querySelectorAll('.minTemp').forEach(item3 => {
        item3.style.display = "flex" 
      })
    document.querySelectorAll('.maxTemp').forEach(item4 => {
        item4.style.display = "flex" 
      })
      document.querySelector(".fah-left").style.display = "none"
      document.querySelector(".cel-left").style.display = "flex"

      fah.style.backgroundColor = "#585676"
      cel.style.backgroundColor = "white"
      cel.style.color = "black"
      fah.style.color = "white"
})




/* ====FUNCTION====== */


function allData() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newName.value}&appid=25c01fde9cba2a86991082780f31863d`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            const finalData = data
            console.log(finalData)

            /* CELSIUS */
            for (i = 0; i < 5; i++) {
                document.getElementById((i + 1) + "max").innerText = (finalData.list[i].main.temp_max - 273.15).toFixed(1) + "৹C";
            }
            /* FAHRENHEIT */
            for (i = 0; i < 5; i++) {
                document.getElementById((i + 1) + "maxf").innerText = ((finalData.list[i].main.temp_max - 273.15) * 9/5 + 32  ).toFixed(1) + "৹F";
            }
            /* CELSIUS */
            for (i = 0; i < 5; i++) {
                document.getElementById((i + 1) + "min").innerText = (finalData.list[i].main.temp_min - 273.15).toFixed(1) + "৹C";
            }
            /* FAHRENHEIT */
            for (i = 0; i < 5; i++) {
                document.getElementById((i + 1) + "minf").innerText = ((finalData.list[i].main.temp_min - 273.15) * 9/5 + 32  ).toFixed(1) + "৹F";
            }
            for (i = 0; i < 5; i++) {
                document.getElementById((i + 1) + "img").src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
            }
            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1)).innerText = weekday[checkDay(i + 1)];
            }

            /* ===== TODAY DATA====== RIGHT SIDE==== */

            document.getElementById("windSpeed").innerText = (finalData.list[0].wind.speed * 2.237).toFixed(2);
            document.getElementById("humidity").innerText = finalData.list[0].main.humidity;
            document.getElementById("progBar").value = finalData.list[0].main.humidity;
            document.getElementById("visibility").innerText = (finalData.list[0].visibility / 1609).toFixed(2);
            document.getElementById("airPressure").innerText = finalData.list[0].main.grnd_level;

            /* ===== TODAY DATA ===== LEFT SIDE */

            document.querySelector(".mainImg").src = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png"
            document.getElementById("leftTempf").innerText = ((finalData.list[0].main.temp - 273.15) * 9/5 + 32 ).toFixed(2);
            document.getElementById("leftTemp").innerText = (finalData.list[0].main.temp - 273.15).toFixed(2);
            document.getElementById("typeLeft").innerText = finalData.list[0].weather[0].description;
            document.getElementById("date").innerText = weekday[d.getDay()] + " , " + d.getDate() + " " + months[m.getMonth()];;

        })
        .catch(err => alert("Something Went Wrong: City not found"))


}



function getInfo() {
    const cityName = document.getElementById("cityName")
    cityName.innerHTML = newName.value
    newName.value = "";

}

function DefaultScreen() {
    document.getElementById("inputForm").defaultValue = "Pantnagar"
    allData();
    getInfo();

}

function suggest() {


    let newSug = `<div class="sug">
     <p id="suggestion" >${newName.value}</p>
     <p>></p>
 </div>`

    answers.innerHTML += newSug
}

document.querySelectorAll('.sug').forEach(item => {
    item.addEventListener('click', event => {
        console.log("taps")
        callSug();
    })
})




function callSug() {
    const form = document.getElementById("suggestion");
    newName.value = form.value;
    console.log("tap")
    allData()
    getInfo();
}