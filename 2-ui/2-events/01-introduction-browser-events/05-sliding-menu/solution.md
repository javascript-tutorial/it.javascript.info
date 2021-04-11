
# HTML e CSS
Per prima cosa creiamo l'HTML ed il CSS.

Un menù è un componente grafico indipendente nella pagina, quindi è bene inserirlo all'interno di un singolo elemento genitore del DOM.

Una lista di elementi del menù può essere rappresentata da una lista di `ul/li`.

Ecco la struttura d'esempio:

```html
<div class="menu">
  <span class="title">Dolciumi (cliccami)!</span>
  <ul>
    <li>Torte</li>
    <li>Ciambelle</li>
    <li>Miele</li>
  </ul>
</div>
```

Usiamo `<span>` per il titolo perché `<div>`, avendo un `display:block` implicito, occuperebbe il 100% della larghezza disponibile.

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Dolciumi (cliccami)!</div>
```

Impostando un `onclick` su di esso, intercetterà i click alla destra del testo.

Dato che `<span>` ha un `display: inline` implicito, occupa esattamente lo spazio necessario per la visualizzazione del testo:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Dolciumi (cliccami)!</span>
```

# Azionamento del menù

L'azionamento del menù dovrebbe cambiare la direzione della freccia e mostrare/nascondere la lista degli elementi.

Tutte queste modifiche sono gestite perfettamente dai CSS. In JavaScript dovremmo solamente etichettare lo stato corrente del menù aggiungendo/rimuovendo la classe `.open`.

Senza di essa, il menù risulterebbe chiuso:

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

...invece con `.open`, la frecca si modifica e la lista si apre:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
