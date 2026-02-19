export default function GlobalLoading({ size = 80 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center gap-3"
      style={{ height: size }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-4 h-4 rounded-full bg-[#FFA60C]"
          style={{
            animation: "pulse 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(0.6);
              opacity: 0.4;
            }
            50% {
              transform: scale(1.2);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
