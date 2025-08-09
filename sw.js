// फ़ाइलों को कैश में रखने के लिए नाम
const CACHE_NAME = 'ai-quiz-game-v1';
// वे फ़ाइलें जिन्हें हम ऑफ़लाइन उपलब्ध कराना चाहते हैं
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css', // अगर आपकी CSS अलग फ़ाइल में है
  '/script.js', // अगर आपकी JS अलग फ़ाइल में है
  '/icon.png'
];


// इंस्टॉल इवेंट: जब सर्विस वर्कर पहली बार रजिस्टर होता है
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});


// फ़ेच इवेंट: जब भी ऐप कोई फ़ाइल मांगता है
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      // अगर फ़ाइल कैश में है, तो वहां से दो, वरना इंटरनेट से लाओ
      return response || fetch(event.request);
    })
  );
});