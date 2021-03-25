
# URL objects

La classe built-in [URL](https://url.spec.whatwg.org/#api) fornisce una comoda interfaccia per la creazione ed il parsing degli URL.

Non esistono metodi di networking che richiedono esattamente un oggetto di tipo `URL`, in quanto le stringhe sono già abbastanza adatte allo scopo. Quindi, tecnicamente non siamo obbligati all'utilizzo di `URL`. Talvolta però può essere molto utile.

## Creare un URL

Ecco la sintassi per creare un nuovo oggetto `URL`:

```js
new URL(url, [base])
```

- **`url`** -- l'URL completo o solo il path (se il parametro base è stato impostato, vedi il parametro seguente),
- **`base`** -- un base URL opzionale: se è impostato e l'argomento `url` contiene solamente il path, l'URL viene generato in relazione a `base`.

Ad esempio:

```js
let url = new URL('https://javascript.info/profile/admin');
```

Questi due URL sono identici:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Possiamo facilmente creare un nuovo URL basato su uno già esistente:

```js run
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

L'oggetto `URL` ci permette di accedere alle sue componenti, in modo da avere un modo elegante di effettuare il parsing dell'url, ad esempio:

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Ecco una tabella informativa per le componenti dell'URL:

![](url-object.svg)

- `href` è l'url completo, equivalente di `url.toString()`
- `protocol` termina con il carattere `:`
- `search` è una stringa contenente parametri, comincia con il punto interrogativo `?`
- `hash` comincia con il carattere cancelletto `#`
- possono essere presenti anche le proprietà `user` e `password`, se è presente l'autenticazione HTTP: `http://login:password@site.com` (non illustrata nella figura precedente, perché è usata molto raramente).


```smart header="Possiamo passare gli oggetti `URL` ai metodi di networking (e molti altri) anziché una stringa"
Possiamo usare un oggetto `URL` dentro `fetch` o `XMLHttpRequest`, ed in generale, quasi ovunque ci si aspetti una stringa.

Generalmente, l'oggetto `URL` può essere passato a qualunque metodo al posto di una stringa, dal momento che la maggior parte di essi, effettueranno una conversione automatica in stringa, trasformando, quindi, un oggetto `URL` in una stringa con l'URL completo.
```

## SearchParams "?..."

Mettiamo il caso che volessimo creare un url con dei parametri prestabiliti, ad esempio, `https://google.com/search?query=JavaScript`.

Possiamo inserirli dentro la stringa URL:

```js
new URL('https://google.com/search?query=JavaScript')
```

...Ma i parametri hanno bisogno di essere codificati se contengono spazi, lettere non latine, etc (chiarimenti su questo aspetto, poco più avanti).

Abbiamo una proprietà URL appositamente per questo: `url.searchParams`, un oggetto di tipo [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

Fornisce metodi comodi per i parametri di ricerca:

- **`append(name, value)`** -- aggiunge il parametro per nome `name`,
- **`delete(name)`** -- rimuove il parametro partendo dal `name`,
- **`get(name)`** -- recupera il parametro dal nome `name`,
- **`getAll(name)`** -- recupera tutti i parametri con lo stesso `name` (un caso reale potrebbe essere ad esempio `?user=John&user=Pete`, nel caso di una select a scelta multipla),
- **`has(name)`** -- controlla l'esistenza del parametro a partire dal nome `name`,
- **`set(name, value)`** -- imposta/sostituisce il parametro,
- **`sort()`** -- ordina i parametri per nome, raramente necessario,
- ...ed è anche iterabile, similmente a `Map`.

Ecco un esempio con parametri che contengono spazi e segni di punteggiatura:

```js run
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // aggiunto un parametro con spazio e !

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // aggiunto un parametro con due punti :

// i parametri vengono codificati automaticamente
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// itera i parametri di ricerca (decodificati)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, then tbs=qdr:y
}
```


## Codifica (Encoding)

Lo standard [RFC3986](https://tools.ietf.org/html/rfc3986) definisce i caratteri ammessi e vietati utilizzabili all'interno degli URL.

Quelli non permessi devono essere codificati, per esempio lettere non latine e spazi, e devono essere sostituiti con il relativo codice, con il prefisso `%`, come `%20` (lo spazio può essere codificato con `+`, per ragioni storiche, ma si tratta di una eccezione).

La buona notizia è che l'oggetto `URL` gestisce questo aspetto in maniera del tutto automatica. È sufficiente inserire i parametri privi di codifica, e convertire l'`URL` in una stringa:

```js run
// per questo esempio usiamo qualche carattere in cirillico

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```

Come possiamo notare, sia `Тест` nel path dell'url che il parametro `ъ` vengono codificati.

L'URL diventa più lungo, perché, il fatto che ogni lettera cirillica venga rappresentata con due bytes in UTF-8, ha come conseguenza quella di avere due entità `%..`.

### Codificare le stringhe

Tempo addietro, prima che gli oggetti `URL` facessero la loro comparsa, si usavano le stringhe per gli URL.

Oggi come oggi, è spesso più conveniente usare gli oggetti `URL`, ma le stringhe possono essere usate alla stessa stregua. In molti casi, l'uso delle stringhe rende il codice più compatto.

Comunque con l'uso delle stringhe siamo costretti a codificare/decodificare manualmente i caratteri speciali.

Ed esistono delle funzioni built-in adatte allo scopo:

- [encodeURI](mdn:/JavaScript/Reference/Global_Objects/encodeURI) - codifica l'URL per intero.
- [decodeURI](mdn:/JavaScript/Reference/Global_Objects/decodeURI) - lo decodifica.
- [encodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/encodeURIComponent) - codifica un componente dell'URL, come un parametro di ricerca, o l'hash, o il path.
- [decodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/decodeURIComponent) - lo decodifica.

Viene naturale porsi una domanda: "Qual'è la differenza tra `encodeURIComponent` e `encodeURI`? Quando usare uno piuttosto che un altro?"

È facile comprendere che se guardiamo un URL, diviso in componenti nella figura in alto:

```
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

Come possiamo notare, i caratteri come `:`, `?`, `=`, `&`, `#` sono perfettamente leciti all'interno di un URL.

...D'altra parte, se guardiamo i suoi singoli componenti, per esempio il parametro di ricerca, questo tipo di caratteri devono essere codificati, per non invalidarne la formattazione.

- `encodeURI` codifica solo i caratteri che sono del tutto vietati nell'URL.
- `encodeURIComponent` codifica gli stessi caratteri, e in aggiunta a questi, anche i caratteri `#`, `$`, `&`, `+`, `,`, `/`, `:`, `;`, `=`, `?` and `@`.

Quindi per un URL intero, possiamo usare `encodeURI`:

```js run
// using cyrillic characters in url path
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...Invece, per i parametri dell'URL dovremmo usare `encodeURIComponent`:

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Confrontiamolo con `encodeURI`:

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

Come possiamo vedere, `encodeURI` non codifica `&`, dal momento che questo è un carattere valido in un URL completo.

Dovremmo però codificare `&` se si trova all'interno di un parametro di ricerca, altrimenti otterremmo `q=Rock&Roll`, che significherebbe `q=Rock` più un non specificato parametro `Roll`, e che è diverso da quello che intendevamo.

Quindi dovremmo usare solo `encodeURIComponent` per ogni parametro di ricerca, per inserirlo correttamente nella stringa dell'URL. La cosa più sicura è quella di codificare sia il nome che il valore, a meno che non siamo certi che contengano solo caratteri leciti.

````smart header="Differenze tra l'uso di encode ed `URL`"
Le classi [URL](https://url.spec.whatwg.org/#url-class) e [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) sono entrambi basati sulle ultime specifiche URI: [RFC3986](https://tools.ietf.org/html/rfc3986), mentre le funzioni `encode*` sono basate sulla vecchia versione [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

C'è qualche piccola differenza, come per esempio nel caso degli indirizzi IPv6 che sono codificati in maniera differente:

```js run
// url valido con indirizzo IPv6
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

Come possiamo vedere, `encodeURI` ha eseguito la sostituzione delle parentesi quadre `[...]`, e non è corretto: la ragione è che gli url IPv6 non esistevano ancora al tempo della RFC2396 (Agosto 1998).

Tuttavia questi sono dei casi rari, e le funzioni `encode*` vanno bene nella maggior parte dei casi.
````
