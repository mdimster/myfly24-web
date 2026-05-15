"use client";

export default function TravelChecklist({ messages }: { messages: string[] }) {
  return (
    <div style={{
      marginTop: "12px",
      padding: "16px",
      background: "linear-gradient(135deg, #1A2847, #2A3B5C)",
      borderRadius: "16px",
      color: "white",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer"
    }}>
      🎒 Deine Reise-Checkliste ({messages.length} Nachrichten analysiert)
    </div>
  );
}
