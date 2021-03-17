
Prima di tutto, dobbiamo trovare tutte le referenze esterne.

Ci sono due modi.

Il primo è quello di trovare tutti i link utilizzando `document.querySelectorAll('a')` e poi filtrare quelli che ci servono:

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // nessun attributo

  if (!href.includes('://')) continue; // nessun protocolo

  if (href.startsWith('http://internal.com')) continue; // interno

  link.style.color = 'orange';
}
```

Nota: utilizziamo `link.getAttribute('href')`, non `link.href`, perché abbiamo bisogno del valore dall'HTML.

...Un'altra, più semplice alternativa sarebbe aggiungere dei controlli ai selettori CSS:

```js
// cerca tutti i link che hanno :// in href
// ma href non inizia con http://internal.com
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
