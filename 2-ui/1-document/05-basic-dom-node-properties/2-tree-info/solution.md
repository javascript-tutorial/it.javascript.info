Effettuiamo un ciclo iterativo sugli elementi `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

Durante le iterazioni abbiamo bisogno di ricavare il testo all'interno di ogni `li`.

Possiamo leggere il testo dal primo nodo figlio di `li` che è un nodo di testo:

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title è il testo nel <li> prima di qualsiasi altro nodo
}
```

A questo punto possiamo ricavare il numero dei discendenti con `li.getElementsByTagName('li').length`.
