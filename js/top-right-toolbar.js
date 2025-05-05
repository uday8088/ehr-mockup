document.addEventListener('DOMContentLoaded', function() {
  // Theme selector functionality
  const themeToggle = document.getElementById('theme-toggle');
  const themeSelector = document.querySelector('.theme-selector');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      themeSelector.classList.toggle('active');
      
      // Close other dropdowns
      const fontSizeSelector = document.querySelector('.font-size-selector');
      if (fontSizeSelector) {
        fontSizeSelector.classList.remove('active');
      }
      
      // Toggle active state for icon
      this.classList.toggle('active');
    });
  }
  
  // Apply theme when option is clicked
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const theme = this.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', theme);
      
      // Close dropdown
      const themeSelector = this.closest('.theme-selector');
      if (themeSelector) {
        themeSelector.classList.remove('active');
      }
      
      // Remove active state from toggle
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.classList.remove('active');
      }
      
      // Save theme preference to localStorage
      localStorage.setItem('preferredTheme', theme);
      
      // Show feedback
      showFeedback(`Theme changed to ${theme}`);
    });
  });
  
  // Font size selector functionality
  const fontSizeToggle = document.getElementById('font-size-toggle');
  const fontSizeSelector = document.querySelector('.font-size-selector');
  
  if (fontSizeToggle && fontSizeSelector) {
    fontSizeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      fontSizeSelector.classList.toggle('active');
      
      // Close other dropdowns
      const themeSelector = document.querySelector('.theme-selector');
      if (themeSelector) {
        themeSelector.classList.remove('active');
      }
      
      // Toggle active state for icon
      this.classList.toggle('active');
    });
  }
  
  // Apply font size when option is clicked
  const fontSizeOptions = document.querySelectorAll('.font-size-option');
  fontSizeOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const fontSize = this.getAttribute('data-size');
      document.body.classList.remove('font-small', 'font-medium', 'font-large');
      document.body.classList.add(`font-${fontSize}`);
      
      // Close dropdown
      const fontSizeSelector = this.closest('.font-size-selector');
      if (fontSizeSelector) {
        fontSizeSelector.classList.remove('active');
      }
      
      // Remove active state from toggle
      const fontSizeToggle = document.getElementById('font-size-toggle');
      if (fontSizeToggle) {
        fontSizeToggle.classList.remove('active');
      }
      
      // Save font size preference to localStorage
      localStorage.setItem('preferredFontSize', fontSize);
      
      // Show feedback
      showFeedback(`Font size changed to ${fontSize}`);
    });
  });
  
  // Notification button functionality
  const notificationBtn = document.getElementById('notification-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Notifications feature will be implemented soon!');
      // Here you would typically show a dropdown with notifications
    });
  }
  
  // User avatar functionality
  const userAvatar = document.querySelector('.user-avatar');
  if (userAvatar) {
    userAvatar.addEventListener('click', function(e) {
      e.preventDefault();
      alert('User profile feature will be implemented soon!');
      // Here you would typically show a dropdown with user profile options
    });
  }
  
  // Logout button functionality
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('Are you sure you want to log out?')) {
        window.location.href = 'index.html';
      }
    });
  }
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    const themeSelector = document.querySelector('.theme-selector');
    const fontSizeSelector = document.querySelector('.font-size-selector');
    
    if (themeSelector) {
      themeSelector.classList.remove('active');
    }
    
    if (fontSizeSelector) {
      fontSizeSelector.classList.remove('active');
    }
    
    // Remove active states from toggles
    const themeToggle = document.getElementById('theme-toggle');
    const fontSizeToggle = document.getElementById('font-size-toggle');
    
    if (themeToggle) {
      themeToggle.classList.remove('active');
    }
    
    if (fontSizeToggle) {
      fontSizeToggle.classList.remove('active');
    }
  });
  
  // Set user initials from logged in user
  function setUserInitials() {
    const userInfo = document.querySelector('.login-details strong');
    if (userInfo) {
      const userName = userInfo.textContent.trim();
      const initials = userName.split(' ')
        .map(name => name.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase();
      
      const userAvatar = document.querySelector('.user-avatar');
      if (userAvatar) {
        userAvatar.textContent = initials;
      }
    }
  }
  
  // Load saved preferences
  function loadSavedPreferences() {
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    const savedFontSize = localStorage.getItem('preferredFontSize');
    if (savedFontSize) {
      document.body.classList.remove('font-small', 'font-medium', 'font-large');
      document.body.classList.add(`font-${savedFontSize}`);
    }
  }
  
  // Feedback toast
  function showFeedback(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('feedback-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'feedback-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.backgroundColor = '#333';
      toast.style.color = 'white';
      toast.style.padding = '10px 20px';
      toast.style.borderRadius = '4px';
      toast.style.zIndex = '1000';
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      document.body.appendChild(toast);
    }
    
    // Set message and show toast
    toast.textContent = message;
    toast.style.opacity = '1';
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 3000);
  }
  
  // Initialize
  setUserInitials();
  loadSavedPreferences();
});