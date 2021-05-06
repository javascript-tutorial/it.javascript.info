# Trovate i commenti HTML

Trovate tutti i commenti HTML nel testo:

```js
let regexp = /your regexp/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```
