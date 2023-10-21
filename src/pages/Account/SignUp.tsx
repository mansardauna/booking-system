import React from 'react';
import SignUpWithGoogle from './SignUpWithGoogle';

function YourComponent() {
  const handleSignUpWithGoogle = () => {
    // Implement the Google OAuth flow here
    //  you can use Firebase Authentication for Google sign-up.
  };

  return (
    <div>
      <SignUpWithGoogle onSignUpWithGoogle={handleSignUpWithGoogle} />
    </div>
  );
}

export default YourComponent;
