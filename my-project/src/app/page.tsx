"use client";
import { useState } from 'react';
import CurrentSong from "@/components/CurrentSong";
import SongElement from "@/components/SongElement";
import DateDisplay from "../components/MusicPlayer/DateDisplay"
import Header from "../components/MusicPlayer/Header"
import Image from "next/image";
import { CarouselMain } from "../components/Carousel";


export default function Home() {
  const [bgColor, setBgColor] = useState("#5F2F85"); // Default purple color

  return (
    <div 
      style={{ 
        background: `linear-gradient(to bottom, ${bgColor} 0%, rgba(0, 0, 0, 1) 100%)`,
        transition: 'background 0.3s ease-in-out' 
      }}
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden"
    >
      <main className="w-full flex flex-col row-start-2 items-center">
        <Header/>
        <DateDisplay/>
        <CarouselMain onSlideChange={setBgColor}/>
        <SongElement
          isUpNext={true}
          songName="FLY HIGH!!!!"
          artist="Burnout Syndromes"
          coverUrl="https://static.wikia.nocookie.net/jpop/images/e/e0/FLY_HIGH_Limited.jpg/revision/latest?cb=20191210062110"
        />
        <SongElement
          isUpNext={false}
          songName="FLY HIGH!!!!"
          artist="Burnout Syndromes"
          coverUrl="https://static.wikia.nocookie.net/jpop/images/e/e0/FLY_HIGH_Limited.jpg/revision/latest?cb=20191210062110"
        />
        <SongElement
          isUpNext={false}
          songName="FLY HIGH!!!!"
          artist="Burnout Syndromes"
          coverUrl="https://static.wikia.nocookie.net/jpop/images/e/e0/FLY_HIGH_Limited.jpg/revision/latest?cb=20191210062110"
        />


        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}