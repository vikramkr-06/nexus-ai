"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  Send,
  Paperclip,
  Smile,
  Phone,
  Mail,
  HelpCircle,
  BookOpen,
  Clock,
  CheckCheck,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "support";
  timestamp: Date;
  read: boolean;
}

// Demo messages
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! Welcome to NexusAI support. How can I help you today?",
    sender: "support",
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
  {
    id: "2",
    content: "Hi! I have a question about the premium features.",
    sender: "user",
    timestamp: new Date(Date.now() - 3500000),
    read: true,
  },
  {
    id: "3",
    content: "Of course! I'd be happy to help you understand our premium features. What specific feature would you like to know more about?",
    sender: "support",
    timestamp: new Date(Date.now() - 3400000),
    read: true,
  },
];

const supportOptions = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Browse our help guides",
    href: "#",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Find quick answers",
    href: "/#faq",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@nexusai.com",
    href: "mailto:support@nexusai.com",
  },
];

export function SupportContent() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      read: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate support response
    setIsTyping(true);
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your message! Our support team will respond shortly. In the meantime, feel free to check our FAQ section for quick answers.",
        sender: "support",
        timestamp: new Date(),
        read: false,
      };
      setMessages((prev) => [...prev, supportMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold">Support</h1>
          <p className="text-muted-foreground">
            Get help from our support team or browse resources.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat Section */}
        <FadeIn delay={0.1} className="lg:col-span-2">
          <Card className="flex flex-col h-[600px]">
            {/* Chat Header */}
            <CardHeader className="border-b flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src="/support-avatar.png" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        S
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-background" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Support Team</CardTitle>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      Online • Usually replies in minutes
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  24/7
                </Badge>
              </div>
            </CardHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.sender === "user" && "flex-row-reverse"
                    )}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      {message.sender === "support" ? (
                        <>
                          <AvatarImage src="/support-avatar.png" />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            S
                          </AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="bg-muted text-xs">
                          U
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={cn(
                          "flex items-center gap-1 mt-1",
                          message.sender === "user" && "justify-end"
                        )}
                      >
                        <span
                          className={cn(
                            "text-[10px]",
                            message.sender === "user"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          )}
                        >
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === "user" && (
                          <CheckCheck
                            className={cn(
                              "h-3 w-3",
                              message.read
                                ? "text-primary-foreground"
                                : "text-primary-foreground/50"
                            )}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        S
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <Smile className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* Support Options */}
        <FadeIn delay={0.2}>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {supportOptions.map((option) => (
                  <a
                    key={option.title}
                    href={option.href}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <option.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{option.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Support Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Live Chat</span>
                    <span className="font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium">&lt; 2 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
