import React, { useState } from 'react';

const Chat = () => {
    const [mensajes, setMensajes] = useState([
        { id: 1, texto: 'Hola, ¿cómo estás?', remitente: 'usuario' },
        { id: 2, texto: '¡Hola! Estoy bien, gracias por preguntar. ¿Cómo puedo asistirte hoy?', remitente: 'ia' },
    ]);
    const [entrada, setEntrada] = useState('');

    const manejarEnvio = () => {
        if (entrada.trim()) {
            setMensajes([...mensajes, { id: mensajes.length + 1, texto: entrada, remitente: 'usuario' }]);
            setEntrada('');
        }
    };

    return (
        <div className="bg-gray-800 text-white h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
                {mensajes.map((mensaje) => (
                    <div key={mensaje.id} className={`p-4 rounded-lg mb-4 ${mensaje.remitente === 'usuario' ? 'bg-gray-700' : 'bg-blue-700'}`}>
                        <p className="text-lg">{mensaje.remitente === 'usuario' ? `Usuario: ${mensaje.texto}` : `IA: ${mensaje.texto}`}</p>
                    </div>
                ))}
            </div>
            <div className="bg-gray-700 p-4 flex">
                <input
                    type="text"
                    className="bg-gray-800 text-white flex-1 p-2 rounded-l-lg"
                    placeholder="Escribe tu mensaje..."
                    value={entrada}
                    onChange={(e) => setEntrada(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg" onClick={manejarEnvio}>Enviar</button>
            </div>
        </div>
    );
};

export default Chat;