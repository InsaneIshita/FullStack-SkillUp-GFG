import React from "react";

export default function Avatar({ role }) {
  const base = "avatar";
  if (role === "error") return <div className={`${base} avatar--error`}>!</div>;
  if (role === "user") return <div className={`${base} avatar--user`}>You</div>;
  return <div className={`${base} avatar--ai`}><img src="src\assets\icons8-chatbot-32.png" alt="AI Chatbot Logo" style={{ textAlign: 'left', width: '22px', height: '22px' , display: 'flex', alignItems: 'left', justifyContent: 'left' }} /></div>;
}