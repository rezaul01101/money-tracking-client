"use client";
import React, { useState } from "react";
import { useAskAiMutation } from "@/src/redux/api/askAiApi";
// Placeholder for icons - consider using a library like react-icons
const PaperclipIcon = () => <span>📎</span>;
const LibraryIcon = () => <span>📚</span>;
const SparklesIcon = () => <span>✨</span>;
const ArrowUpIcon = () => <span>↑</span>;

const ChatPage = () => {
  const [askAi, { isLoading, error }] = useAskAiMutation();
  // Example messages including an AI response
  const [messages, setMessages] = useState([
    
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newUserMessage = { text: inputMessage, sender: "user" };
      setMessages((prev) => [...prev, newUserMessage]);
      setInputMessage("");
      setIsThinking(true);
      const response = await askAi({ message: inputMessage });
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      if(response){
        setIsThinking(false);

        const cleanedHTML = response?.data?.result
        .replace(/```html\n?/g, '') // removes ```html
        .replace(/```/g, '')        // removes ```
        .trim();
        const data=  {
            text: cleanedHTML, // Truncated
            sender: "ai",
            // content: <FontSuggestions />
          }
          setMessages((prev) => [...prev, data]);
      }
      // --- Mock AI Response ---
      // Replace this with your actual AI API call
      // Simulate API delay
    //   const aiResponse = {
    //     text: `This is a simulated AI response to: "${inputMessage}"`,
    //     sender: "ai",
    //   };
    //   // --- End Mock AI Response ---

    //   setMessages((prev) => [...prev, aiResponse]);
    //   setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "user" ? (
                // User Message Styling
                <div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-[80%]">
                  {message.text}
                </div>
              ) : (
                // AI Message Styling
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 max-w-[90%] w-full">
                  <span className="font-semibold text-indigo-600 mr-2">❖</span>{" "}
                  {/* AI indicator */}
                  {/* Render complex content here if needed */}
                  <div
                      dangerouslySetInnerHTML={{ __html: message.text }}
                    />
                </div>
              )}
            </div>
          ))}
          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 animate-pulse">
                <span className="font-semibold text-indigo-600 mr-2">❖</span>{" "}
                Thinking...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white border-t border-gray-200 w-[60vw] mx-auto">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full rounded-lg border border-gray-300 px-4 py-4 pr-28 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
              disabled={isThinking}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex space-x-2 text-gray-500">
              <button type="button" className="hover:text-indigo-600">
                <PaperclipIcon />
              </button>
              <button type="button" className="hover:text-indigo-600">
                <LibraryIcon />
              </button>
              <button type="button" className="hover:text-indigo-600">
                <SparklesIcon />
              </button>
            </div>
            <button
              type="submit"
              disabled={!inputMessage.trim() || isThinking}
              className={`cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-md px-2.5 py-1.5 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors ${
                isThinking ? "animate-pulse" : ""
              }`}
            >
              <ArrowUpIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
