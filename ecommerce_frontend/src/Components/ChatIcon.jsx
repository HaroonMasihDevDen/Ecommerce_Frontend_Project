import React from 'react';

const ChatIcon = ({ text, size = 50, textColor = 'white', bubbleColor = 'blue' }) => {
  const iconStyle = {
    width: size,
    height: size,
    position: 'relative',
    display: 'inline-block',
  };

  const bubbleStyle = {
    fill: bubbleColor,
  };

  const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-60%, -65%)',
    color: textColor,
    fontSize: size * 0.3,
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <div style={iconStyle}>
      {/* Chat Bubble SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        <path
          d="M32 2C15.432 2 2 13.958 2 28.8c0 7.2 3.6 13.6 9.2 18.4v10l8.8-4.8c2.4 0.8 4.8 1.2 7.2 1.2 16.568 0 30-11.958 30-26.8S48.568 2 32 2z"
          style={bubbleStyle}
        />
      </svg>
      {/* Text inside the chat bubble */}
      <div style={textStyle}>{text}</div>
    </div>
  );
};

export default ChatIcon;