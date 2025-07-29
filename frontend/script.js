document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    
    const API_URL = 'http://localhost:3001/api/chat';
    
    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    
    // Send message on Enter (but allow Shift+Enter for new line)
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });
    
    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <span>${isUser ? 'U' : 'AI'}</span>
            </div>
            <div class="message-content">
                ${content}
            </div>
        `;
        
        // Remove welcome message if it exists
        const welcomeMessage = chatMessages.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Show/hide typing indicator
    function showTyping(show = true) {
        if (show) {
            typingIndicator.classList.add('show');
            chatMessages.appendChild(typingIndicator);
        } else {
            typingIndicator.classList.remove('show');
            if (typingIndicator.parentNode) {
                typingIndicator.parentNode.removeChild(typingIndicator);
            }
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Handle form submission
    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const message = messageInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, true);
        
        // Clear input and reset height
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Disable input and show typing
        sendButton.disabled = true;
        messageInput.disabled = true;
        showTyping(true);
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Hide typing and add AI response
            showTyping(false);
            
            // Add a small delay for better UX
            setTimeout(() => {
                addMessage(data.reply, false);
            }, 300);
            
        } catch (error) {
            console.error('Error:', error);
            showTyping(false);
            
            setTimeout(() => {
                addMessage('Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi.', false);
            }, 300);
        } finally {
            // Re-enable input
            sendButton.disabled = false;
            messageInput.disabled = false;
            messageInput.focus();
        }
    });
    
    // Focus on input when page loads
    messageInput.focus();
});