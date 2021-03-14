E' possibile farlo in diversi modi, ad esempio:


Il nodo DOM `<div>`:

```js
document.body.firstElementChild
// oppure
document.body.children[0]
// oppure (il primo nodo è uno spazio, quindi prendiamo il secondo)
document.body.childNodes[1]
```

Il nodo DOM `<ul>`:

```js
document.body.lastElementChild
// oppure
document.body.children[1]
```

Il secondo `<li>` (con Pete):

```js
// prendi <ul>, e quindi il suo ultimo elemento figlio
document.body.lastElementChild.lastElementChild
```
