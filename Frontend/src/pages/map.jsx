import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Copy, RefreshCw, Trash2, MessageCircle, AlertCircle } from 'lucide-react';

const GeminiChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'model',
      content: 'Hello! I\'m your AI assistant. I will help you to explore your skills and occupation',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Check server connection on component mount
  useEffect(() => {
    checkServerConnection();
  }, []);

  const checkServerConnection = async () => {
    try {
      // Test with a simple chat request to verify server is working
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: [],
          message: 'test'
        }),
      });
      setIsConnected(response.ok);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      // Convert messages to Gemini chat history format
      // Skip the initial bot greeting message for history
      const conversationHistory = messages.slice(1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      console.log('Sending request:');
      console.log('History:', conversationHistory);
      console.log('Message:', currentMessage);

      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: conversationHistory,
          message: currentMessage
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.log('Error data:', errorData);
          throw new Error(errorData.error || `Server error: ${response.status}`);
        } else {
          const errorText = await response.text();
          console.log('Error text:', errorText);
          throw new Error(`Server error (${response.status}): Please check server logs for details`);
        }
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.log('Non-JSON response:', responseText);
        throw new Error('Invalid response format from server');
      }

      const data = await response.json();
      console.log('Success data:', data);
      
      if (!data.text) {
        throw new Error('No response received from Gemini');
      }
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'model',
        content: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsConnected(true);
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Cannot connect to server. Please check:\n• Server is running on http://localhost:3000\n• No firewall blocking the connection\n• CORS is properly configured');
        setIsConnected(false);
      } else {
        setError(err.message);
      }
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'model',
        content: 'Hello! I\'m your Gemini AI assistant. How can I help you today?',
        timestamp: new Date()
      }
    ]);
    setError('');
  };

  const copyMessage = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const regenerateResponse = async () => {
    if (messages.length < 2) return;
    
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) return;

    const messagesUpToLastUser = messages.slice(0, messages.findLastIndex(msg => msg.role === 'user') + 1);
    setMessages(messagesUpToLastUser);
    
    setIsLoading(true);
    setError('');

    try {
      const geminiHistory = messagesUpToLastUser.slice(0, -1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: geminiHistory,
          message: lastUserMessage.content
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Server error: ${response.status}`);
        } else {
          throw new Error(`Server error (${response.status}): Please check if your server is running correctly`);
        }
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format from server');
      }

      const data = await response.json();
      
      if (!data.text) {
        throw new Error('No response received from Gemini');
      }
      
      const assistantMessage = {
        id: Date.now(),
        role: 'model',
        content: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsConnected(true);
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Cannot connect to server. Please check if your server is running on http://localhost:3000');
        setIsConnected(false);
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MessageCircle className="w-8 h-8 text-purple-600" />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">AI Chatbot</h1>
              <p className="text-sm text-gray-500">
                {isConnected ? 'Connected • Powered by Google ' : 'Disconnected • Check server connection'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={checkServerConnection}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={clearChat}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
              }`}>
                {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Content */}
              <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-[85%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                }`}>
                  <div className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</div>
                </div>
                
                {/* Message Actions */}
                <div className={`mt-2 flex items-center gap-3 text-xs text-gray-500 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}>
                  <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <button
                    onClick={() => copyMessage(message.content)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    title="Copy message"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {message.role === 'model' && (
                    <button
                      onClick={regenerateResponse}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                      title="Regenerate response"
                      disabled={isLoading}
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Message */}
          {isLoading && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-block bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 text-gray-500">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-800">Connection Error</h3>
                  <pre className="text-sm text-red-700 mt-1 whitespace-pre-wrap">{error}</pre>
                  <button
                    onClick={() => setError('')}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isConnected 
                  ? "Ask AI anything... (Press Enter to send, Shift+Enter for new line)" 
                  : "Server not connected. Please check your connection."
                }
                className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent max-h-32 transition-colors"
                disabled={isLoading || !isConnected}
                rows="1"
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading || !isConnected}
              className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <div>
              Powered by Google AI • Responses may contain errors
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiChatbot;