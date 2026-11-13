(() => {
  const query = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.slice(1));
  const value = key => hash.get(key) || query.get(key);
  const error = value('error') || value('error_code');
  const signupSuccess = !error && hash.has('access_token') && value('type') === 'signup';
  // The auth service verifies the email before redirecting here. Do not store,
  // exchange, log, or forward its tokens; the mobile app has its own sign-in.
  window.history.replaceState(null, '', window.location.pathname);
  if (error) {
    document.querySelector('#icon').textContent = '!';
    document.querySelector('#title').textContent = 'This link couldn’t be used.';
    document.querySelector('#message').textContent = 'The confirmation link may have expired or already been used. If your email is already confirmed, you can sign in to the app.';
    document.querySelector('#next').textContent = 'Return to Fusing Journal and try signing in. If your email still needs confirmation, request a fresh confirmation email and use its latest link.';
  } else if (signupSuccess) {
    document.querySelector('#icon').textContent = '✓';
    document.querySelector('#title').textContent = 'Your email is confirmed.';
    document.querySelector('#message').textContent = 'You’re ready to return to Fusing Journal. Sign in to the app to continue with your journal.';
  }
})();
