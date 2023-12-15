var greetInputEl = document.getElementById("greet-input");
var greetMsgEl = document.getElementById("greet-msg");
var numberInputEl = document.getElementById("mobile-number");

async function greet() {
  var name = greetInputEl.value; var phn_num = numberInputEl.value;
  
  greetMsgEl.textContent = "hello there "+name+"! welcome to this app."+phn_num;
  var response = window.api.invoke('data_insert', name, phn_num);
  console.log(response);
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});
