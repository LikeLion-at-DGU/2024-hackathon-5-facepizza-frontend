import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const usePrompt = (message, when) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = message;
    };

    const handleNavigation = (event) => {
      const confirm = window.confirm(message);
      if (!confirm) {
        navigate(location.pathname); // Prevent navigation
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('pushState', handleNavigation);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('pushState', handleNavigation);
    };
  }, [message, when, navigate, location]);
};

export default usePrompt;
