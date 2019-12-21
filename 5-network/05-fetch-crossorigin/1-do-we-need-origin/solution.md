Abbiamo bisogno di `Origin`, perché a volte `Referer` è assente. Per esempio, quando richiediamo `fetch` di una HTTP-page da HTTPS (accesso meno sicuro da uno più sicuro), non è presente `Referer`.

La [Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) potrebbe dimenticare di inviare un `Referer`.

Come vedremo, `fetch` ha opzioni che impediscono l'invio del` Referer` e permettono persino di cambiarlo (all'interno dello stesso sito).

Da specifiche, `Referer` è un HTTP-header opzionale.

Proprio perché "Referer" non è affidabile, è stato inventato "Origin". Il browser garantisce la corretta "Origin" per le cross-origin requests.
