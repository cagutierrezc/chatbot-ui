import { useState } from 'react';
import axios from 'axios';
import './App.css'

const API_KEY = 'YOUR_API_KEY'
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

function App() {
    


return (
        <main className='chatbot'>
            <header className='chatbot__header'>
                <h1>Mi chatbot GPT</h1>
            </header>
            <section className='chatbot__messages'>
                <article className={`bubble user`}>
                    <h2 className='role'>
                        Tu
                    </h2>
                    <p className='text'>texto usuario prueba</p>
                </article>

                <article className={`bubble assistant`}>
                    <h2 className='role'>
                        Chatbot
                    </h2>
                    <p className='text'>texto chatbot prueba</p>
                </article>

            </section>
            <section className='chatbot__controls'>
                <form className='chatbot__controls--input' >
                    <input
                        placeholder='Escribe un mensaje...'
                        type='text'/>
                    <button>Enviar &#x3009;</button>
                </form>
            </section>
        </main>
    )
}

export default App
