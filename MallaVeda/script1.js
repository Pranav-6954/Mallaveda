
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



document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript Loaded!");

    let sendButton = document.getElementById("sendButton");
    let userInput = document.getElementById("userInput");

    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
        console.log("✅ Send button event attached!");
    } else {
        console.error("❌ Send button NOT FOUND!");
    }

    if (userInput) {
        userInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    } else {
        console.error("❌ User input field NOT FOUND!");
    }
});

// ✅ Function to Send Messages to Backend
async function sendMessage() {
    let userMessage = document.getElementById("userInput").value.trim();
    if (!userMessage) return;

    addMessage("user", userMessage);
    document.getElementById("userInput").value = "";

    console.log("User message:", userMessage); // Debugging

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userMessage })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Backend Response:", data);

        const botReply = data.reply || "Sorry, I couldn't process your request.";
        addMessage("bot", botReply);

    } catch (error) {
        console.error("❌ Error:", error);
        addMessage("bot", `Error: ${error.message}`);
    }
}

// ✅ Function to Display Messages in Chat
function addMessage(who, message) {
    let chatBox = document.getElementById("chatBox");
    let msgDiv = document.createElement("div");
    msgDiv.classList.add("message", who);
    msgDiv.innerHTML = `<strong>${who.toUpperCase()}:</strong> ${message}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
