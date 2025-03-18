let botReady = false;
let bot = new RiveScript();

bot.loadFile("begin.rive").then(loading_done).catch(function(error) {
    console.error("Error loading files:", error);
});

function loading_done() {
    bot.sortReplies();
    botReady = true;
    console.log("Chatbot ready!");
    // Optionally, enable the chat interface here.
}


function addMessage(who, message) {
  var chatBox = document.getElementById("chatBox");
  var msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  msgDiv.classList.add(who);
  // Use innerHTML instead of textContent to render HTML in the reply
  msgDiv.innerHTML = who.toUpperCase() + ": " + message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}


// Handle form submission
document.getElementById("userDetailsForm").addEventListener("submit", function(e) {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var weight = document.getElementById("weight").value;
  var height = document.getElementById("height").value;
  
  // Set RiveScript user variables for user "localuser"
  bot.setUservar("localuser", "name", name);
  bot.setUservar("localuser", "age", age);
  bot.setUservar("localuser", "weight", weight);
  bot.setUservar("localuser", "height", height);
  
  document.getElementById("formContainer").style.display = "none";
  document.getElementById("chatContainer").style.display = "block";
  
  addMessage("bot", "Hello " + name + "! Welcome to MallaVeda Health Assistant. Type 'hello' to begin.");
});

// Handle sending messages
document.getElementById("sendButton").addEventListener("click", function() {
  var input = document.getElementById("userInput");
  var message = input.value;
  if (message.trim() === "") return;
  addMessage("user", message);
  input.value = "";
  
  if (!botReady) {
    addMessage("bot", "Please wait, I'm still getting ready...");
    return;
  }
  
  bot.reply("localuser", message).then(function(reply) {
    addMessage("bot", reply);
  });
});

// Allow Enter key to send messages
document.getElementById("userInput").addEventListener("keyup", function(e) {
  if (e.key === "Enter") {
    document.getElementById("sendButton").click();
  }
});
