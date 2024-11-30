import React, { useState } from 'react';

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, surname, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registro exitoso:', data);
            } else {
                const errorMsg = await response.text();
                setError(`Error: ${errorMsg}`);
            }
        } catch (error) {
            setError('Error de red. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold text-center mb-4">Registrarse</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="mb-4 p-2 border border-gray-300 rounded w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={loading}>
                        {loading ? 'Cargando...' : 'Registrarse'}
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default Register;