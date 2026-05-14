import React, { useEffect, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton = ({ onSuccess, onError, text = "Continue with Google" }) => {
  const buttonRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Wait for Google SDK to load
    const initializeGoogleButton = () => {
      if (window.google && buttonRef.current && !isInitialized) {
        window.google.accounts.id.initialize({
          client_id: '212670045708-rshpm3jgafap87al4m937ahfcuao526v.apps.googleusercontent.com',
          callback: (response) => {
            if (response.credential) {
              onSuccess(response);
            } else {
              onError?.(new Error('Google login failed'));
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        
        window.google.accounts.id.renderButton(buttonRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: '350',
        });
        
        setIsInitialized(true);
      }
    };

    // Check if Google SDK is already loaded
    if (window.google) {
      initializeGoogleButton();
    } else {
      // Wait for SDK to load
      window.addEventListener('google-loaded', initializeGoogleButton);
      // Fallback: check after 500ms
      const timer = setTimeout(() => {
        if (window.google) {
          initializeGoogleButton();
        }
      }, 500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('google-loaded', initializeGoogleButton);
      };
    }
  }, [onSuccess, onError, isInitialized]);

  return (
    <div className="w-full">
      <div ref={buttonRef} className="w-full flex justify-center"></div>
    </div>
  );
};

export default GoogleLoginButton;