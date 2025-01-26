const textarea = document.getElementById("messageInput");
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

class ChatBot {
    constructor(options) {
        this.useMockSocket = options.useMockSocket;
        this.socketUrl = options.socketUrl;

        this.messagesInner = document.querySelector(options.messagesInnerSelector);
        this.chatbotInner = document.querySelector(options.chatbotInnerSelector);
        this.chatbotChoices = document.getElementById('chatbotChoices');
        this.sendButton = document.getElementById(options.sendButtonId);
        this.messageInput = document.getElementById(options.messageInputId);

        this.userScrolled = false;
        this.initSocket();
        this.addEventListeners();
    }

    initSocket() {
        this.socket = this.useMockSocket
            ? new MockWebSocket(this.socketUrl)
            : new WebSocket(this.socketUrl);

        this.socket.onopen = () => {
            console.log('WebSocket bağlantısı kuruldu (onopen).');
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'choices') {
                this.addMessage(data.text, 'in');
                this.addChoices(data.choices);
            } else if (data.type === 'message') {
                this.addMessage(data.text, 'in');
            }
        };
    }

    startChat() {
        if (this.socket && this.socket.readyState === 1) {
            this.socket.send('getChoices');
        } else {
            const originalOnOpen = this.socket.onopen;
            this.socket.onopen = () => {
                if (originalOnOpen) originalOnOpen();
                this.socket.send('getChoices');
            };
        }
    }

    addEventListeners() {
        if (this.sendButton && this.messageInput) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
            this.messageInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    this.sendMessage();
                }
            });
        }

        this.chatbotInner.addEventListener('scroll', () => {
            const threshold = 50;
            const position = this.chatbotInner.scrollTop + this.chatbotInner.clientHeight;
            const height = this.chatbotInner.scrollHeight;
            this.userScrolled = (height - position) > threshold;
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
        avatarDiv.innerHTML = `
            <img src="${type === 'in'
                ? './assets/img/chatbot-avatar.svg'
                : './assets/img/sender-avatar.png'
            }" alt="">
        `;

        const messageContentDiv = document.createElement('div');
        messageContentDiv.className = type === 'in' ? 'chatbot-in-message' : 'chatbot-out-message';

        const messageText = document.createElement('p');
        messageText.className = type === 'in'
            ? 'chatbot-in-message-text'
            : 'chatbot-out-message-text';
        messageText.textContent = message;

        messageContentDiv.appendChild(messageText);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(messageContentDiv);
        this.messagesInner.appendChild(messageDiv);

        requestAnimationFrame(() => this.scrollToBottom());
    }

    addChoices(choicesArray) {
        this.chatbotChoices.innerHTML = `
            <div class="chatbot-avatar">
                <img src="./assets/img/sender-avatar.png" alt="">
            </div>
            <div class="chatbot-choices-inner" id="chatbotChoicesInner"></div>
        `;

        const chatbotChoicesInner = document.getElementById('chatbotChoicesInner');

        choicesArray.forEach(choice => {
            const button = document.createElement('button');
            button.classList.add('chatbot-choice-button');
            button.textContent = choice.label;

            button.addEventListener('click', (evt) => {
                evt.stopPropagation();
                this.addMessage(choice.label, 'out');
                this.socket.send(choice.value);
                this.chatbotChoices.innerHTML = '';
            });
            chatbotChoicesInner.appendChild(button);
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

    closeConnection() {
        if (this.socket && this.socket.readyState === 1) {
            this.socket.close();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbot = document.getElementById("chatbot");
    let myChatBot = null;

    if (chatbotIcon) {
        chatbotIcon.addEventListener("click", () => {
            chatbot.classList.toggle("active");

            if (chatbot.classList.contains("active") && !myChatBot) {
                myChatBot = new ChatBot({
                    socketUrl: 'ws://localhost:5500',
                    sendButtonId: 'senderBtn',
                    messageInputId: 'messageInput',
                    messagesInnerSelector: '.chatbot-messages-inner',
                    chatbotInnerSelector: '.chatbot-inner'
                });
                myChatBot.startChat();
            }
        });

        document.addEventListener("click", (event) => {
            if (!event.target.closest('#chatbot') && !event.target.closest('#chatbot-icon')) {
                chatbot.classList.remove("active");
            }
        });
    }
});



/* 
==============================================================
 BACKEND DEVELOPER ÜÇÜN QEYD (MİSAL CAVAB FORMATİ - AZƏRBAYCAN DİLİNDƏ)
==============================================================

Bu, serverin WebSocket vasitəsilə göndərə biləcəyi JSON strukturu üçün bir nümunədir.
"type" sahəsi chatbot-un məlumatı necə emal edəcəyini müəyyənləşdirir:

1) "type": "choices"
   - "text": Bot tərəfindən istifadəçiyə verilən qısa sual və ya məlumat.
   - "choices": Obyektlərdən ibarət massivdir. Hər bir obyekt "label" (istifadəçiyə göstərilən mətn)
     və "value" (seçim seçildikdə serverə geri göndərilən açar və ya əmr) sahələrindən ibarətdir.

{
  "type": "choices",
  "text": "Xoş gəldiniz! Sizə necə kömək edə bilərik?",
  "choices": [
    { "label": "Sifariş et", "value": "ORDER" },
    { "label": "İade et", "value": "RETURN" },
    { "label": "Yardım al", "value": "HELP" },
    { "label": "Söhbəti bitir", "value": "ENDCHAT" }
  ]
}

2) "type": "message"
   - "text": Sadə mətn formatında məlumat və ya cavab. İstifadəçiyə əlavə seçim verilmir.

{
  "type": "message",
  "text": "Sifarişiniz təsdiqləndi. Təşəkkür edirik!"
}

Hər iki halda da chatbot JSON məlumatını (JSON.parse(event.data) ilə) oxuyur
və uyğun interfeys elementlərini göstərir. Server istifadəçinin göndərdiyi məlumatlardan
və ya söhbətin məntiqindən asılı olaraq bu cavabları dinamik şəkildə yarada bilər.
*/
