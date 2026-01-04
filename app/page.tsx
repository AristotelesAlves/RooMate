'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const route = useRouter();

  const redirect = () => {
    route.push('/inicio');
  }

  useEffect(() => {
    redirect()
  },[])

  return (
    <div className="flex items-center justify-center min-h-screen">
      Carregando...
    </div>
  );
}
