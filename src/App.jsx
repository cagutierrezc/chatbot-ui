import { useState } from 'react';
import axios from 'axios';
import './App.css'

const API_KEY = 'AIzaSyDsRxXMEnSy58OxNucLB0wx6wEC7fvyMh0'
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

const [userMessage, setUserMessage] = useState('');
const [messages, setMessages] = useState([]);    
const [loading, setLoading] = useState(false);

function App() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Agregar el mensaje del usuario
        setMessages([...messages, { text: userMessage, user: true }]);

        try{
            const response = await axios.post(
                `${API_URL}?key=${API_KEY}`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Eres un asistente experto en ciencia de datos. Responde únicamente si la pregunta está relacionada con ciencia de datos, 
                                    análisis de datos, estadística, machine learning, o temas relacionados. 
                                    Si la pregunta no está relacionada con estos temas, responde que no puedes responder eso en este momento.

                                    Pregunta: ${userMessage}

                                    Respuesta (máximo 30 palabras):`
                                },
                            ],
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Extraer la respuesta del bot de la estructura de respuesta de Gemini
            const botResponse = response.data.candidates[0].content.parts[0].text;

            // Agregar la respuesta del bot
            setMessages([
                ...messages,
                { text: userMessage, user: true },
                { text: botResponse, user: false },
            ]);
        }catch(error) {
            // Manejo de errores: agregar un mensaje de error al chat
            setMessages([
                ...messages,
                { text: userMessage, user: true },
                { text: 'Lo siento, hubo un error al procesar tu solicitud.', user: false },
            ]);
        }
        finally {
            setLoading(false);
            setUserMessage('');
        }

    }


return (
        <main className='chatbot'>
            <header className='chatbot__header'>
                <h1>Mi chatbot GPT</h1>
            </header>
            <section className='chatbot__messages'>
            
            {messages.map((message, index) => (
                    <article key={index} className={`bubble ${message.user ? 'user' : 'assistant'}`}>
                        <h2 className='role'>
                            {message.user  ? 'Tú' : 'Asistente'}
                        </h2>
                        <p className='text'>{message.text}</p>
                    </article>
                ))}

            {loading && <p className='chatbot__messages--loading'>Cargando...</p>}

            </section>
            <section className='chatbot__controls'>
                <form className='chatbot__controls--input' onSubmit={handleSubmit}>
                    <input
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder='Escribe un mensaje...'
                        disabled={loading}
                        type='text'/>
                    <button disabled={loading}>Enviar &#x3009;</button>
                </form>
            </section>
        </main>
    )
}

export default App
