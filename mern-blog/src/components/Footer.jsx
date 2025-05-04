import React from "react";
import Loading from "./Loading";
import { useState } from "react";
import { useEffect } from "react";

const Footer = function () {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className="text-sm text-center bg-gray-50 py-4">
      © 2025 | Designed & developed by the unstoppable crew:
      <p className="font-bold">Pallav, Himanshu, Vedant, Krishika, Pulkit & Jiya 🚀
      </p>
    </div>
  );
};


export default Footer;
