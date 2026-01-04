export const DiagonalGrid = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-white text-blue-400">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diagonal-grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="white" />
      <rect width="100%" height="100%" fill="url(#diagonal-grid)" />
    </svg>
  </div>
);
