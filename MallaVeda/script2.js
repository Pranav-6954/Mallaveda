const chatMessages = document.getElementById('chat-messages');
        const messageInput = document.getElementById('message-input');
        const sendButton = document.getElementById('send-button');

        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });

        let chatHistory =[]; // To store the conversation history

        function sendMessage() {
            const message = messageInput.value.trim();
            if (message) {
                appendMessage('user', message);
                chatHistory.push({ role: 'user', parts: [{ text: message }] }); // Add user message to history
                messageInput.value = '';

                fetch('http://localhost:9000/chat', { // Updated backend endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ chat: message, history: chatHistory }),
                })
                .then(response => response.json())
                .then(data => {
                    appendMessage('bot', data.text); // Backend now returns { text: '...' }
                    chatHistory.push({ role: 'model', parts: [{ text: data.text }] }); // Add bot response to history
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
            chatMessages.scrollTop = chatMessages.scrollHeight;}