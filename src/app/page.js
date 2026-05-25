"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Boot from "@/components/boot";

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push("/login")
    }, 5000);
  }, [])

  return (
    <>
      <Boot />
    </>
  );
};

export default Home;
