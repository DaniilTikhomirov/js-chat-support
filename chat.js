(function() {
    // Массив сообщений
    let messages = [];

    // Ссылка на элементы DOM
    const chatContainer = document.getElementById('chat-container');
    const messagesContainer = document.getElementById('chat-messages');
    const inputField = document.getElementById('chat-input');
    const sendButton = document.getElementById('chat-send-button');

    /**
     * Добавляет новое сообщение в историю сообщений.
     * @param {string} content - Текст сообщения.
     * @param {string} role - Роль отправителя (user или assistant).
     */
    const addMessage = (content, role = "user") => {
        const message = { role, content };
        messages.push(message);
        renderMessages();
    };

    /**
     * Отображает все сообщения в контейнере.
     */
    const renderMessages = () => {
        messagesContainer.innerHTML = ''; // Очистка предыдущих сообщений
        messages.forEach((msg, index) => {
            const messageElement = document.createElement('div');
            messageElement.className = `chat-message ${msg.role}`;
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble';
            bubble.textContent = msg.content;
            messageElement.appendChild(bubble);
            messagesContainer.appendChild(messageElement);
        });
    };

    /**
     * Обработчик отправки сообщения.
     * Отправляется сообщение пользователя и имитируется ответ ассистента.
     */
    const handleSend = () => {
        const input = inputField.value.trim();
        if (input) {
            addMessage(input, 'user');
            inputField.value = ''; // Очищаем поле ввода
            setTimeout(() => addMessage('Спасибо за ваше сообщение!', 'assistant'), 1000); // Ответ ассистента через 1 сек
        }
    };

    /**
     * Обработчик нажатия клавиш на клавиатуре.
     * Если нажата клавиша Enter, то отправляется сообщение.
     */
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    // Обработчики событий
    sendButton.addEventListener('click', handleSend);
    inputField.addEventListener('keydown', handleKeyDown);

    // Инициализация чата с приветственным сообщением
    addMessage('Добро пожаловать в чат!', 'assistant');
})();
