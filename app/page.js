'use client'
import Link from "next/link";
import { useState } from "react";


export default function Home() {

  return (

    <main className="w-full text-center p-24">
      <h1 className="text-4xl font-bold">Altrak</h1>
      <button className="hover:bg-blue-800 text-white font-bold py-2 px-4 rounded border border-white m-12">
        <Link href="/workouts">workouts</Link>
      </button>
    </main>
  );
}
