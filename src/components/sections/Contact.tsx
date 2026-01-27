"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { Send, ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <footer id="contact" className="relative bg-[#0a0a0a] min-h-screen text-[#Eaeaea] font-outfit overflow-hidden pt-24 flex flex-col justify-between">
            
            <div className="max-w-[95vw] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-8 px-4 z-10 relative">
                
                {/* Socials & Info */}
                <div className="flex flex-col justify-between h-full space-y-16">
                    <div>
                        <h4 className="text-sm font-mono uppercase tracking-widest mb-8 opacity-50">[ Socials ]</h4>
                        <ul className="space-y-4 text-2xl md:text-4xl font-light">
                            <li><a href="https://github.com/Geekyash10" target="_blank" className="hover:text-orange-500 transition-colors">Github</a></li>
                            <li><a href="https://www.linkedin.com/in/yash-mittal-433307251/" target="_blank" className="hover:text-orange-500 transition-colors">LinkedIn</a></li>
                            <li><a href="https://x.com/__Yashmittal" target="_blank" className="hover:text-orange-500 transition-colors">Twitter_X</a></li>
                            <li><a href="https://www.instagram.com/yashmittal_05?igsh=NDgwaTR0cG9rNWQ0" target="_blank" className="hover:text-orange-500 transition-colors">Instagram</a></li>
                        </ul>
                    </div>
                    
                    <div className="space-y-2">
                        <h4 className="text-sm font-mono uppercase tracking-widest mb-4 opacity-50">[ Contact ]</h4>
                        <a href="mailto:mittalyas1234@gmail.com" className="group flex items-center gap-4 text-2xl md:text-5xl font-bold transition-colors hover:text-orange-500">
                            mittalyas1234@gmail.com
                            <ArrowUpRight className="w-8 h-8 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                        </a>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full max-w-xl self-end justify-self-end">
                    <h3 className="text-2xl md:text-4xl font-light mb-12">
                        Have an idea? <br/>
                        <span className="font-bold text-orange-500">Let's build it.</span>
                    </h3>
                    
                    <ContactForm />
                </div>
            </div>

            {/* Massive Brand - Fixed at bottom */}
            <div className="relative w-full mt-10 leading-[0.75]">
                <h1 className="md:text-[22vw] text-[19vh] font-black tracking-tighter text-white/10 select-none pointer-events-none text-left">
                    Yash.
                </h1>
                
                {/* Footer Links Row */}
                <div className="absolute bottom-4 left-0 w-full px-4 md:px-8 flex flex-wrap justify-between items-end text-xs md:text-sm font-mono uppercase tracking-widest mix-blend-difference text-zinc-400">
                    <div className="flex gap-1 md:gap-8">
                        {/* <span>© 2026 Yash Mittal</span> */}
                    </div>
                    
                    <div className="flex gap-4 md:gap-8">
                        <span>[ © 2026 Yash Mittal | All rights reserved. ]</span>
                    </div>
                </div>
            </div>

        </footer>
    );
}

function ContactForm() {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        const formData = new FormData(form.current);
        const name = formData.get("user_name");
        const email = formData.get("user_email");
        const message = formData.get("message");
        
        setStatus("sending");

        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
            {
              from_name: name as string,
              from_email: email as string,
              message: `Name: ${name} Email: ${email} Message: ${message}`,
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
        )
        .then((result) => {
            setStatus("success");
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setStatus("idle"), 5000);
        }, (error) => {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        });
    };

    return (
        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-8">
            <div className="relative group">
                <input 
                    type="text" 
                    name="user_name"
                    required
                    placeholder="NAME"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-white transition-colors placeholder:text-white/20 font-mono"
                />
            </div>
            <div className="relative group">
                <input 
                    type="email" 
                    name="user_email"
                    required
                    placeholder="EMAIL"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-white transition-colors placeholder:text-white/20 font-mono"
                />
            </div>
            <div className="relative group">
                <textarea 
                    name="message"
                    required
                    rows={1}
                    placeholder="MESSAGE"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-white transition-colors placeholder:text-white/20 font-mono resize-none"
                />
            </div>

            <button 
                disabled={status === "sending"}
                className="group mt-8 w-full py-6 border border-white/20 hover:border-white bg-transparent hover:bg-white text-white hover:text-black transition-all duration-500 rounded-none flex items-center justify-between px-8 text-xl font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>
                    {status === "idle" && "Submit Request"}
                    {status === "sending" && "Sending..."}
                    {status === "success" && "Message Sent!"}
                    {status === "error" && "Failed. Try Again."}
                </span>
                <div className="relative overflow-hidden w-6 h-6">
                    {status === "idle" && (
                        <>
                            <ArrowUpRight className="w-6 h-6 absolute top-0 left-0 transition-transform duration-500 group-hover:-translate-y-full group-hover:translate-x-full" />
                            <ArrowUpRight className="w-6 h-6 absolute top-0 left-0 -translate-x-full translate-y-full transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
                        </>
                    )}
                </div>
            </button>
        </form>
    )
}
