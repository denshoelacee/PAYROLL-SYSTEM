import Echo from 'laravel-echo';
import Pusher from 'pusher-js'; // ✅ Use import, not require

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: '127.0.0.1',
  wsPort: 6001,
  wssPort: 6001,
  forceTLS: false,
  enabledTransports: ['ws'],
});

export default echo;
