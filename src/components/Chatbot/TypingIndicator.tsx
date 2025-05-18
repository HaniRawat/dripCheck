import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="typing-indicator mb-4">
      <span className="animate-typing"></span>
      <span className="animate-typing"></span>
      <span className="animate-typing"></span>
    </div>
  );
};

export default TypingIndicator;