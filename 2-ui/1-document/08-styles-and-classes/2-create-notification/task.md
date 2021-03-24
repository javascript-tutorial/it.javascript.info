importance: 5

---

# Create un messaggio di notifica

Scrivete una funzione `showNotification(options)` che crei una notifica: `<div class="notification">` con un dato contenuto. La notifica dovrebbe automaticamente sparire dopo 1.5 secondi.

Le opzioni sono:

```js
// mostra un elemento con il testo "Hello" in prossimità dell'angolo in alto a destra della finestra
showNotification({
  top: 10, // 10px dalla parte superiore della finestra (valore predefinito 0px)
  right: 10, // 10px dal bordo destro della finestra (valore predefinito 0px)
  html: "Hello!", // l'HTML della notifica
  className: "welcome" // una classe addizionale per il div (opzionale)
});
```

[demo src="solution"]


Usate il posizionamento CSS per mostrare l'elemento alle coordinate top/right ricevute. Il documento sorgente ha gli stili necessari.
