//@ts-nocheck
"use client";

import axios from "axios";
import Image from "next/image";
import { Mic } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  if (typeof window === "undefined") {
    return;
  }

  let recognition;
  try {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
  } catch (e) {
    console.error(e);
  }

  const handleClick = () => {
    recognition.start();
  };

  recognition.onresult = (event) => {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;

    console.log(transcript);

    axios.post("http://localhost:8000/speech", {
      message: transcript,
    });
  };

  return (
    <div className="w-full h-full">
      <h1 className="ml-[40%] mt-5 text-lg text-nowrap">Speech to text</h1>
      <div className="flex justify-center items-center mt-5">
        <div className="w-[350px] ">
          <Textarea placeholder="Type your message here." />
        </div>

        <Button className="ml-3" onClick={handleClick}>
          <Mic />
        </Button>
      </div>
    </div>
  );
}
