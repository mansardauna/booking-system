import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    // Automatically close the notification after a few seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Adjust the duration as needed

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Notification;
