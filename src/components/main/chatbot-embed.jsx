"use client";

import { useEffect } from "react";

const ChatbotEmbed = () => {
  useEffect(() => {
    // Dynamically inject the script into the document when the component mounts
    const chatbotConfigScript = document.createElement("script");
    chatbotConfigScript.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "zRxmwVALCs5YwJ4WLqLj4",
        domain: "www.chatbase.co"
      }
    `;
    document.body.appendChild(chatbotConfigScript);

    const chatbotScript = document.createElement("script");
    chatbotScript.src = "https://www.chatbase.co/embed.min.js";
    chatbotScript.setAttribute("chatbotId", "zRxmwVALCs5YwJ4WLqLj4");
    chatbotScript.setAttribute("domain", "www.chatbase.co");
    chatbotScript.defer = true;
    document.body.appendChild(chatbotScript);

    // Cleanup the injected scripts when the component unmounts
    return () => {
      document.body.removeChild(chatbotConfigScript);
      document.body.removeChild(chatbotScript);
    };
  }, []);

  return <div id="chatbot-container"></div>;
};

export default ChatbotEmbed;
