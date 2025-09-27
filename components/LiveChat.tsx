import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { useLanguage } from '../hooks/useLanguage';
import { useData } from '../contexts/DataContext';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon, PaperAirplaneIcon } from './Icons';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);

export default function LiveChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { t, language } = useLanguage();
    const { services: therapyServicesData, faqs: faqsData, isLoading: isDataLoading } = useData();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const generateSystemInstruction = () => {
        const servicesText = therapyServicesData
            .map(service => `- ${t(`service.${service.id}.name`)}: ${t(`service.${service.id}.short`)} (Duration: ${service.duration})`)
            .join('\n');

        const faqsText = faqsData
            .map(faq => `- Q: ${t(faq.question)}\n  A: ${t(faq.answer)}`)
            .join('\n\n');
        
        const paymentInfoText = `
- **Price per Session**: ${t('bookingModal.payment.priceEtb')} or ${t('bookingModal.payment.priceUsd')}.
- **Payment Methods**: We accept Telebirr and Bank Transfers.
  - **Telebirr**: Send payment to ${t('bookingModal.payment.telebirrNumber')}.
  - **Bank Transfer**: 
    - **Account Name**: ${t('bookingModal.payment.bankAccountName')}
    - **Commercial Bank of Ethiopia (CBE)**: Account ${t('bookingModal.payment.cbeAccount')} (SWIFT: ${t('bookingModal.payment.cbeSwift')})
    - **Abyssinia Bank**: Account ${t('bookingModal.payment.abyssiniaAccount')} (SWIFT: ${t('bookingModal.payment.abyssiniaSwift')})
`

        return `You are a friendly, empathetic, and professional AI assistant for Relief Psychological Service. Your goal is to help users by answering their questions and guiding them through our website.
        You must answer questions based ONLY on the following information provided. Do not invent services, prices, or procedures.
        If a user asks for help with a psychological problem, you must respond with empathy and strongly recommend they book a session with a professional therapist through our site. You are not a therapist.
        If asked about something not in this context, politely state that you can only provide information about Relief Psychological Service.
        The user is currently viewing the site in ${language === 'en' ? 'English' : 'Amharic'}. Please respond in the user's language.

        **About Us:**
        Relief Psychological Service provides professional and compassionate mental health support. Our mission is to empower individuals and families to achieve mental wellness and lead fulfilling lives. The CEO is Mrs. Mekdes Ayene.

        **Our Services:**
        We offer a wide range of psychological services, including counseling, therapy, and training. Here are our main services:
        ${servicesText}

        **How to Book an Appointment:**
        To book an appointment, please click the "Book Now" button in the header or click on any service card from the "Our Professional Services" section. This will open a form where you can request an appointment time and date.

        **Visitor Support:**
        We offer comprehensive support for short-term visitors in Addis Ababa, including assistance with accommodation, city navigation, psychological support, and community integration.

        **Frequently Asked Questions (FAQ):**
        ${faqsText}

        **Contact Information:**
        - Email: ${t('contactModal.email')}
        - Phone: ${t('contactModal.phone')}

        **Payment Information:**
        ${paymentInfoText}
        `;
    };

    useEffect(() => {
        if (isOpen && !isDataLoading) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const instruction = generateSystemInstruction();
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: instruction,
                    },
                });
                chatRef.current = newChat;
                const languageName = t(language === 'en' ? 'language.english' : 'language.amharic');
                const greeting = t('welcome.chatbotGreeting', { language: languageName });
                setMessages([{ text: greeting, sender: 'bot' }]);
            } catch (error) {
                console.error("Failed to initialize Gemini API:", error);
                 setMessages([{ text: 'Sorry, the chat service is currently unavailable.', sender: 'bot' }]);
            }
        }
    }, [isOpen, language, therapyServicesData, faqsData, isDataLoading, t]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        const userMessage = inputValue.trim();
        if (!userMessage || isLoading) return;

        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setInputValue('');
        setIsLoading(true);

        try {
            if (!chatRef.current) {
                throw new Error("Chat session not initialized.");
            }
            const response = await chatRef.current.sendMessage({ message: userMessage });
            setMessages(prev => [...prev, { text: response.text, sender: 'bot' }]);
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            setMessages(prev => [...prev, { text: "I'm having trouble connecting right now. Please try again later.", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <div className="fixed bottom-5 right-5 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-sky-600 text-white rounded-full p-4 shadow-lg hover:bg-sky-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <XMarkIcon className="w-7 h-7" /> : <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />}
                </button>
            </div>
            
            {isOpen && (
                <div 
                    className="fixed bottom-20 right-5 z-50 w-[calc(100%-2.5rem)] sm:w-96 h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200"
                    role="dialog"
                    aria-labelledby="chat-header"
                >
                    <header className="bg-sky-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
                        <h3 id="chat-header" className="font-bold text-lg">Relief AI Assistant</h3>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-sky-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                             {isLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-xs md:max-w-sm px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                                        <TypingIndicator />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <form onSubmit={handleSendMessage} className="p-3 border-t bg-white rounded-b-2xl">
                        <div className="flex items-center bg-gray-100 rounded-full px-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a message..."
                                aria-label="Type a message"
                                className="flex-1 bg-transparent p-2 border-none focus:ring-0 text-sm"
                                disabled={isLoading}
                            />
                            <button type="submit" disabled={!inputValue.trim() || isLoading} className="p-2 text-sky-600 disabled:text-gray-400 rounded-full hover:bg-sky-100 transition-colors" aria-label="Send message">
                                <PaperAirplaneIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}