import React, { useState } from 'react';
import { Send } from 'lucide-react';

type Message = {
    id: number;
    content: string;
    sender: 'user' | 'ai';
};

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            content: "¡Hola! Soy Claude, un asistente de IA. ¿Cómo puedo ayudarte hoy?",
            sender: 'ai'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        // Agregar mensaje del usuario
        const userMessage: Message = {
            id: messages.length + 1,
            content: inputMessage,
            sender: 'user'
        };

        const aiMessage: Message = {
            id: messages.length + 2,
            content: `Dijiste: "${inputMessage}". ¿Cómo puedo ayudarte más?`,
            sender: 'ai'
        };

        setMessages([...messages, userMessage, aiMessage]);
        setInputMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Contenedor de mensajes del chat */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`
                max-w-[80%] px-4 py-3 rounded-2xl
                ${message.sender === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-white'}
              `}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Área de entrada de mensajes */}
            <div className="bg-gray-800 p-4 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Mensaje a Claude..."
                        className="
              flex-1
              bg-gray-700
              text-white
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={inputMessage.trim() === ''}
                        className="
              bg-blue-600
              text-white
              rounded-full
              p-2
              hover:bg-blue-700
              disabled:opacity-50
              transition-colors
              duration-200
            "
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;