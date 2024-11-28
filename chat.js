import axios from "axios"

(function() {
    // Массив сообщений
    let messages = [];

    // Ссылка на элементы DOM
    const chatContainer = document.getElementById('chat-container');
    const messagesContainer = document.getElementById('chat-messages');
    const inputField = document.getElementById('chat-input');
    const sendButton = document.getElementById('chat-send-button');
    const toggleButton = document.getElementById('chat-toggle-button'); // Кнопка для скрытия/показа чата

    // Состояние для управления видимостью чата
    let isChatVisible = true;

    // Генерация или получение уникального ID пользователя
    const userId = localStorage.getItem('userId') || generateUniqueId();
    localStorage.setItem('userId', userId);

    /**
     * Генерирует уникальный идентификатор для пользователя.
     * Используем UUID, который можно легко сгенерировать.
     * @returns {string} - Уникальный идентификатор.
     */
    function generateUniqueId() {
        // Генерация UUID (можно использовать стороннюю библиотеку для генерации UUID, например uuid.js)
        return 'user-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Добавляет новое сообщение в историю сообщений.
     * @param {string} content - Текст сообщения.
     * @param {string} role - Роль отправителя (user или assistant).
     * @param id
     */
    const addMessage = (content, role = "user", id) => {
        const message = { id: id, role, content }; // Использование userId + индекс
        messages.push(message);
        renderMessages();
    };

    /**
     * Отображает все сообщения в контейнере.
     */
    const renderMessages = () => {
        messagesContainer.innerHTML = ''; // Очистка предыдущих сообщений
        messages.forEach((msg) => {
            const messageElement = document.createElement('div');
            messageElement.className = `chat-message ${msg.role}`;
            messageElement.setAttribute('data-id', msg.id); // Добавление ID в атрибут

            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble';
            bubble.textContent = msg.content;
            messageElement.appendChild(bubble);
            messagesContainer.appendChild(messageElement);
        });

        // Прокрутка вниз
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    /**
     * Обработчик отправки сообщения.
     * Отправляется сообщение пользователя и имитируется ответ ассистента.
     */
    const handleSend = async () => {
        const input = inputField.value.trim();
        if (input) {
            addMessage(input, 'user', userId);
            let answer;
            answer = await axios.post(`http://localhost:8080/1/${userId}`, {
                "guestion": input
            })

            console.log(answer);

            inputField.value = ''; // Очищаем поле ввода
            addMessage(answer.data, 'assistant');
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

    /**
     * Переключает видимость чата.
     */
    const toggleChatVisibility = () => {
        isChatVisible = !isChatVisible;
        if (isChatVisible) {
            chatContainer.style.display = 'flex';
            toggleButton.textContent = 'Скрыть чат';

            // Пересчёт высоты прокрутки
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
            chatContainer.style.display = 'none';
            toggleButton.textContent = 'Открыть чат';
        }
    };

    // Обработчики событий
    sendButton.addEventListener('click', handleSend);
    inputField.addEventListener('keydown', handleKeyDown);
    toggleButton.addEventListener('click', toggleChatVisibility); // Обработчик для кнопки скрытия/показа

    // Инициализация чата с приветственным сообщением
    addMessage('Добро пожаловать в чат!', 'assistant');
})();
