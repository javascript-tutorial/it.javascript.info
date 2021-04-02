importance: 5

---

# Crea un albero da un oggetto

Scrivi una funzione `createTree` che crea una lista `ul/li` annidata partendo dall'oggetto annidato.

Ad esempio:

```js
let data = {
  "Fish": {
    "trout": {},
    "salmon": {}
  },

  "Tree": {
    "Huge": {
      "sequoia": {},
      "oak": {}
    },
    "Flowering": {
      "apple tree": {},
      "magnolia": {}
    }
  }
};
```

La sintassi:

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // creates the tree in the container
*/!*
```

Il risultato (l'albero) dovrebbe somigliare a questo:

[iframe border=1 src="build-tree-dom"]

Scegli uno dei due metodi per risolvere la task:

1. Crea l'HTML per l'albero e assegnala a `container.innerHTML`.
2. Crea i nodi dell'albero e appendili utilizzando i metodi del DOM.

Sarebbe grandioso se riuscissi con entrambi.

P.S. L'albero non dovrebbe avere elementi "extra" -ad esempio`<ul></ul>` vuoti- come foglie.
