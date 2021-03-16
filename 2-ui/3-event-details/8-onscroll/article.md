# Scrolling

L'evento `scroll` permette di reagire allo scroll della pagina o di un elemento. Ci sono poche e semplici operazioni che possiamo compiere in questi casi.

Per esempio:
- Mostrare/nascondere controlli aggiuntivi o informazioni, a seconda della posizione del documento in cui si trova l'utente.
- Caricare più dati quando l'utente scolla fino in fondo alla pagina.

Ecco una piccola funzione per mostrare lo scroll del documento:

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});
```

```online
Eccolo in azione:

Scroll attuale = <b id="showScroll">Scrolla la finestra</b>
```

L'evento `scroll` funziona sia sulla `window` che sugli elementi scrollabili.

## Prevenire lo scrolling

Come possiamo rendere qualcosa non scrollabile?

Sicuramente, non possiamo prevenire lo scrolling usando `event.preventDefault()` nel listener `onscroll`, perché quest'ultimo viene generato *dopo* che lo scroll è avvenuto.

Tuttavia, possiamo prevenire lo scrolling con l'utilizzo di `event.preventDefault()` su un evento che causi esso stesso lo scroll, pere esempio l'evento `keydown` per `key:pageUp` e `key:pageDown`.

Se aggiungiamo un gestore di evento a questi eventi con `event.preventDefault()` al loro interno, allora lo scroll non comincerà affatto.

Ci sono vari modi per iniziare uno scroll, al punto tale che spesso è più affidabile usare i CSS tramite la proprietà `overflow`.

Ecco alcune attività che potrete risolvere o analizzare per vedere le applicazioni di `onscroll`.
