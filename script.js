const toggle = document.getElementById("themeToggle");

// Load stored theme
const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){
document.body.classList.add("light-mode");
}

// Toggle theme
if(toggle){
toggle.onclick = () => {

document.body.classList.toggle("light-mode");

if(document.body.classList.contains("light-mode")){
localStorage.setItem("theme","light");
}else{
localStorage.setItem("theme","dark");
}

};
}

// particles only on about page
if(document.getElementById("particles-js")){
particlesJS("particles-js",{
particles:{
number:{value:70},
size:{value:3},
color:{value:"#ffd000"},
line_linked:{enable:true,color:"#ffd000"},
move:{speed:2}
}
});
}