"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importing useRouter
import { Message } from "@/types/message";
import { Send } from "react-feather";
import LoadingDots from "@/components/LoadingDots";
import { AuroraBackground } from "@/components/core/aurora-background";
import { BackgroundGradient } from "@/components/core/background-gradient";
import Markdown from "react-markdown";

export default function Question1() {
  const router = useRouter(); // Initialize useRouter for navigation
  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hello! I'm Anna, your AI assistant here to help you.",
    },
  ]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    if (message === "") return;

    let userToken = localStorage.getItem("user_token");
    if (!userToken) {
      // Generate a simple unique identifier (UUID)
      userToken =
        "user-" +
        Date.now() +
        "-" +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem("user_token", userToken);
    }

    setHistory((oldHistory) => [
      ...oldHistory,
      { role: "user", content: message },
    ]);
    setMessage("");
    setLoading(true);
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_token: localStorage.getItem("user_token"),
        question_id: 9,
        prompt: message,
      }),
    })
      .then(async (res) => {
        const r = await res.json();
        console.log(r);

        setHistory((oldHistory) => [...oldHistory, r]);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleButtonClick = () => {
    router.push("/risk-asses");
  };

  return (
    <div className="relative h-screen">
      <AuroraBackground className="absolute inset-0 -z-100">
        {/* Top-right "Get Started" Button */}
        <button
          onClick={handleButtonClick}
          className="absolute top-4 right-4 bg-black dark:bg-white rounded-full text-white dark:text-black px-4 py-2 z-50"
        >
          Continue
        </button>

        <div className="flex h-full">
          {/* Left Side - Text Section */}
          <div className="flex-1 flex flex-col justify-center items-center p-8">
            <div className="max-w-xl w-full">
              <h2 className="text-4xl font-bold mb-4">
                Is your AI system designed to interact directly with people, or
                does it generate synthetic audio, images, videos, or text
                content?
              </h2>
              <p className="text-2xl text-gray-700 mb-4">
                Some AI systems, regardless of whether they are classified as
                high-risk, may still present transparency issues that need to be
                addressed. For example, if your AI system generates synthetic
                videos or text content, you may be required to ensure that the
                outputs are clearly marked as artificially generated. Similarly,
                if your system interacts directly with people, it may need to
                inform users that they are interacting with an AI, unless this
                is obvious.
                <br />
                <br />
                Transparency measures can be critical for building trust and
                compliance. If you're unsure about your system's transparency
                requirements, ANNA can help guide you through the necessary
                steps to address them.
              </p>
            </div>
          </div>

          {/* Right Side - Chatbot Section */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
            <form
              className="w-[800px] h-[900px] rounded-3xl border border-gray-200 flex flex-col bg-white bg-opacity-100 overflow-clip shadow-md p-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              <div className="overflow-y-scroll flex flex-col gap-5 h-full">
                {history.map((message, idx) => {
                  const isLastMessage = idx === history.length - 1;
                  return (
                    <div
                      key={idx}
                      className={`flex gap-2 ${
                        message.role === "user" ? "self-end" : ""
                      }`}
                      ref={isLastMessage ? lastMessageRef : null}
                    >
                      {message.role === "assistant" && (
                        <img
                          src="images/anna.webp"
                          className="h-10 w-10 rounded-full"
                          alt="assistant avatar"
                        />
                      )}
                      <div
                        className={`w-auto max-w-xl break-words bg-white rounded-xl p-4 shadow-lg ${
                          message.role === "user"
                            ? "rounded-tl-xl rounded-br-none"
                            : "rounded-tr-xl rounded-bl-none"
                        }`}
                      >
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          {message.role === "user" ? "You" : "Anna"}
                        </p>
                        <div className="prose">
                          <section>
                            <Markdown>{message.content}</Markdown>
                          </section>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {loading && (
                  <div className="flex gap-2">
                    <img
                      src="images/anna.webp"
                      className="h-10 w-10 rounded-full"
                      alt="assistant avatar"
                    />
                    <div className="w-auto max-w-xl break-words bg-white rounded-xl p-4 shadow-lg">
                      <p className="text-sm font-medium text-gray-700 mb-4">
                        Anna
                      </p>
                      <LoadingDots />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex sticky bottom-0 w-full px-4 py-4">
                <div className="w-full relative">
                  <textarea
                    aria-label="chat input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="w-full h-12 resize-none rounded-full border border-gray-300 bg-white pl-4 pr-16 py-3 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleClick();
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick();
                    }}
                    className="flex w-10 h-10 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900 absolute right-2 bottom-3"
                    type="submit"
                    aria-label="Send"
                    disabled={!message || loading}
                  >
                    <Send />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}
