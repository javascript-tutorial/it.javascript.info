
Il tag di apertura è `pattern:\[(b|url|quote)\]`.

Successivamente per trovare tutto fino al tag di chiusura usiamo il pattern `pattern:.*?` con il flag `pattern:s` per cercare la corrispondenza con ogni carattere inclusa una nuova riga. Per concludere aggiungiamo un riferimento all'indietro per il tag di chiusura.

L'intero pattern risultante è: `pattern:\[(b|url|quote)\].*?\[/\1\]`.

In azione:

```js run
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

Si noti che oltre l'escape di `pattern:[` e `pattern:]`, abbiamo dovuto fare l'escape dello slash del tag di chiusura `pattern:[\/\1]`, poiché normalmente lo slash termina il pattern.
