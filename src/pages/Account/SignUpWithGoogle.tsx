import React from 'react';

interface SignUpWithGoogleProps {
  onSignUpWithGoogle: () => void;
}

const SignUpWithGoogle: React.FC<SignUpWithGoogleProps> = ({ onSignUpWithGoogle }) => {
  const handleSignUpWithGoogle = () => {
    onSignUpWithGoogle();
  };

  return (
    <div>
      <h2>Sign Up with Google</h2>
      <button onClick={handleSignUpWithGoogle}>Continue with Google</button>
    </div>
  );
};

export default SignUpWithGoogle;
