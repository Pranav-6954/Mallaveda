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
            messageDiv.classList.add('chat-message');
        
            // Apply different styling based on the sender
            if (sender === 'user') {
                messageDiv.textContent = `You: ${text}`;
            } else {
                messageDiv.textContent = `AI: ${text}`;
            }
        
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
       
            document.querySelectorAll('.quick-reply').forEach(button => {
                button.addEventListener('click', () => {
                  const message = button.textContent;
                  document.getElementById('message-input').value = message;
                  sendMessage();
                });
              });
              
              function submitForm() {
                const name = document.getElementById('name').value.trim();
                const age = document.getElementById('age').value.trim();
                const gender = document.getElementById('gender').value.trim();
                const height = document.getElementById('height').value.trim();
                const weight = document.getElementById('weight').value.trim();
                if (name && age && gender && height && weight) {
                  const message = `User Information:\nName: ${name}\nAge: ${age}\nGender: ${gender}\nWeight:${weight}\nHeight:${height}`;
                  document.getElementById('formContainer').style.display = 'none';
                  document.getElementById('chat-container').style.display = 'block';
              
                  appendMessage('user', message);
                  chatHistory.push({ role: 'user', parts: [{ text: message }] });
              
                  fetch('http://localhost:9000/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
                } else {
                  alert("Please fill all fields!");
                }
              }
              