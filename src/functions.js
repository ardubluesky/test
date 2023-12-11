var greetInputEl = document.getElementById("greet-input");
var greetMsgEl = document.getElementById("greet-msg");

async function greet() {
  var name = greetInputEl.value;

  greetMsgEl.textContent = "hello there "+name+"! welcome to this app.";

}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});
