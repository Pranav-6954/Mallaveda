 const bot = new RiveScript();

bot.loadFile("./brains.rive").then(loading_done);

function loading_done() {
    bot.sortReplies();
    console.log("Chatbot ready!");
}

function toggleChatbot() {
    const popup = document.getElementById("chatbot-popup");
    const toggleButton = document.getElementById("chatbot-toggle");

    if (popup.style.display === "none" || popup.style.display === "") {
        popup.style.display = "block";
        toggleButton.style.display = "none"; 
    } else {
        popup.style.display = "none";
        toggleButton.style.display = "block";
    }
}
function checkEnter(event) {
    if (event.key === "Enter") {
        processUserMessage();
    }
}

function processUserMessage() {
    const inputField = document.getElementById("chatbot-input");
    const userMessage = inputField.value;
    if (userMessage.trim() === "") return;
    addMessageToChat("You", userMessage);
    inputField.value = "";
    bot.reply("local-user", userMessage).then(function(reply) {
        addMessageToChat("Bot", reply);
    });
}
function addMessageToChat(sender, message) {
    const messagesDiv = document.getElementById("chatbot-messages");
    const messageElement = document.createElement("div");
    messageElement.className = sender === "You" ? "user-message" : "bot-reply";
    messageElement.textContent = `${sender}: ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
