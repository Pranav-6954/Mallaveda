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
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    if (!chatMessages || !messageInput || !sendButton) {
        console.error("❌ One or more elements not found in DOM");
        return;
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    let chatHistory = [];

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            appendMessage('user', message);
            chatHistory.push({ role: 'user', parts: [{ text: message }] });
            messageInput.value = '';

            fetch('http://localhost:9000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat: message, history: chatHistory }),
            })
                .then(response => response.json())
                .then(data => {
                    appendMessage('bot', data.text);
                    chatHistory.push({ role: 'model', parts: [{ text: data.text }] });
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                    appendMessage('bot', 'Sorry, I encountered an error.');
                });
        }
    }

    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(`${sender}-message`);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
