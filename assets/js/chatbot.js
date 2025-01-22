const textarea = document.getElementById("messageInput");
const chatbotIcon = document.getElementById("chatbot-icon");
const chatbot = document.getElementById("chatbot");
if (textarea) {
    textarea.addEventListener("input", () => {
        if (textarea.value.trim() !== "") {
            textarea.style.height = "auto";
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        } else {
            textarea.style.height = "17px";
        }
    });
}
if (chatbotIcon) {
    chatbotIcon.addEventListener("click", function () {
        chatbot.classList.toggle("active");
    })
    document.addEventListener("click", (event) => {
        if (!chatbot.contains(event.target) && !chatbotIcon.contains(event.target)) {
            chatbot.classList.remove("active");
        }
    });
}

class MockWebSocket {
    constructor(url) {
        this.url = url;
        console.log(`Mock WebSocket bağlantısı kuruldu: ${url}`);
    }

    send(message) {
        console.log(`Mesaj gönderildi: ${message}`);
        setTimeout(() => {
            if (this.onmessage) {
                this.onmessage({ data: `Simüle edilmiş bot yanıtı: ${message}` });
            }
        }, 1000);
    }

    close() {
        console.log('Mock WebSocket bağlantısı kapatıldı.');
    }
}

class ChatBot {
    constructor(options) {
        this.useMockSocket = options.useMockSocket;
        this.socketUrl = options.socketUrl;
        this.sendButton = document.getElementById(options.sendButtonId);
        this.messageInput = document.getElementById(options.messageInputId);
        this.messagesInner = document.querySelector(options.messagesInnerSelector);
        this.chatbotInner = document.querySelector(options.chatbotInnerSelector);
        this.userScrolled = false;
        this.initSocket();
        this.addEventListeners();
    }

    initSocket() {
        this.socket = this.useMockSocket
            ? new MockWebSocket(this.socketUrl)
            : new WebSocket(this.socketUrl);

        this.socket.onopen = () => {
            console.log('WebSocket bağlantısı kuruldu.');
        };

        this.socket.onmessage = (event) => {
            this.addMessage(event.data, 'in');
        };
    }

    addEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.sendMessage();
            }
        });
        this.chatbotInner.addEventListener('scroll', () => {
            const threshold = 50; // Piksel cinsinden bir eşik değeri
            const position = this.chatbotInner.scrollTop + this.chatbotInner.clientHeight;
            const height = this.chatbotInner.scrollHeight;
            this.userScrolled = height - position > threshold;
        });
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (message) {
            this.addMessage(message, 'out');
            this.socket.send(message);
            this.messageInput.value = '';
        }
    }

    addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${type === 'in' ? 'chatbot-in' : 'chatbot-out'}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'chatbot-avatar';
        avatarDiv.innerHTML = `<img src="${type === 'in' ? './assets/img/chatbot-avatar.svg' : './assets/img/sender-avatar.png'}" alt="">`;

        const messageContentDiv = document.createElement('div');
        messageContentDiv.className = type === 'in' ? 'chatbot-in-message' : 'chatbot-out-message';

        const messageText = document.createElement('p');
        messageText.className = type === 'in' ? 'chatbot-in-message-text' : 'chatbot-out-message-text';
        messageText.textContent = message;

        messageContentDiv.appendChild(messageText);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(messageContentDiv);
        this.messagesInner.appendChild(messageDiv);

        // Yeni mesaj eklenince scroll işlemini beklemek için requestAnimationFrame kullanıyoruz
        requestAnimationFrame(() => {
            this.scrollToBottom();
        });
    }

    scrollToBottom() {
        if (!this.userScrolled) {
            this.chatbotInner.scrollTo({
                top: this.chatbotInner.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ChatBot({
        useMockSocket: true,
        socketUrl: 'ws://localhost:5500',
        sendButtonId: 'senderBtn',
        messageInputId: 'messageInput',
        messagesInnerSelector: '.chatbot-messages-inner',
        chatbotInnerSelector: '.chatbot-inner'
    });
});

