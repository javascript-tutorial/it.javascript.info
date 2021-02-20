importance: 5

---

# Modal form

Creare una funzione `showPrompt(html, callback)` che mostra un form con un messaggio `html`, un campo di input ed i pulsanti `OK/CANCEL`.

- Un utente dovrebbe digitare qualcosa nel campo di testo e premere `key:Enter` o il pulsante OK, quindi verrà chiamata `callback(value)` con il valore che è stato inserito.
- Altrimenti, se l'utente preme `key:Esc` oppure CANCEL, viene chiamata `callback(null)`.

In entrambi i casi, questo termina l'elaborazione dell'input e rimuove il form.

Requisiti:

- Il form dovrebbe essere al centro della finestra.
- Il form è *modal*. In altre parole, non possono esserci interazioni con il resto della pagina fino a quando non viene chiusa.
- Quando viene mostrato il form, il focus dovrebbe essere dentro il campo `<input>` per l'utente.
- I tasti `key:Tab`/`key:Shift+Tab` dovrebbe cambiare il focus tra i campi del form, e non permettergli di lasciarlo per altri elementi della pagina.

Usage example:

```js
showPrompt("Enter something<br>...smart :)", function(value) {
  alert(value);
});
```

Una demo nell'iframe:

[iframe src="solution" height=160 border=1]

P.S.: Il sorgente del documento ha HTML e CSS per il form, con posizionamento fixed, ma sta a te renderla modale.
