
# URL objects

La classe built-in [URL](https://url.spec.whatwg.org/#api) fornisce una comoda interfaccia per la creazione ed il parsing degli URL.

Non esistono metodi netowrking che richiedono esattamente un oggetto `URL` object, perché le stringhe sono già abbastanza adatte allo scopo. Quindi tecnicamente non dobbiamo usare `URL`. Talvolta però può essere davvero utile.

## Creare un URL

La sintassi per creare un nuovo oggetto `URL`:

```js
new URL(url, [base])
```

- **`url`** -- l'URL completo o solo il path (se base è stato impostato, gaurda sotto),
- **`base`** -- un base URL opzionale: se impostato ed l'argomento `url` contiene solo il path, URL viene generato relativamente a `base`.

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

Possiamo facilemnte creare un nuovo URL basato sul path relativo ad un URL già esistente:

```js run
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

L'oggetto `URL` ci permette immediatamente di accedere ai suoi componenti, in modo da avere un bel modo di effettuare il parse dell'url, come per esempio:

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
- `search` - una stringa contenente parametri, comincia con il punto interrogativo `?`
- `hash` cominca con il carattere cancelletto `#`
- possono essere presenti anche le proprietà `user` e `password` se è presente l'autenticazione HTTP: `http://login:password@site.com` (non illustrata sopra, perché usata raramente).


```smart header="Possiamo passare gli oggetti `URL` ai metodi di networking (e molti altri) anziché una stringa"
Possiamo usare un oggetto `URL` dentro `fetch` o `XMLHttpRequest`, quasi ovunque ci si aspetti una stringa.

Generalmente, l'oggetto `URL` può essere passato a qualunque metodo al posto di una stringa, dal momento che la maggior parte dei metodi effettueranno una conversione in stringa, e trasformeneranno un oggetto `URL` in una stringa con l'URL completo.
```

## SearchParams "?..."

Mettiamo il caso che volessimo creare un url con dei parametri prestabiliti, ad esmepio, `https://google.com/search?query=JavaScript`.

Possiamo inserirli dentro la stringa URL:

```js
new URL('https://google.com/search?query=JavaScript')
```

...Ma i parametri hanno bisogno di essere encodati se contengono spazi, lettere non latine, etc (più informazioni su questo in basso).

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

url.searchParams.set('tbs', 'qdr:y'); // aggiunto un parametrio con due punti :

// i parametri vengono codificati automaticamente
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// itera i parametri di ricerca (decodificati)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, then tbs=qdr:y
}
```


## Encoding

There's a standard [RFC3986](https://tools.ietf.org/html/rfc3986) that defines which characters are allowed in URLs and which are not.

Those that are not allowed, must be encoded, for instance non-latin letters and spaces - replaced with their UTF-8 codes, prefixed by `%`, such as `%20` (a space can be encoded by `+`, for historical reasons, but that's an exception).

The good news is that `URL` objects handle all that automatically. We just supply all parameters unencoded, and then convert the `URL` to string:

```js run
// using some cyrillic characters for this example

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```

As you can see, both `Тест` in the url path and `ъ` in the parameter are encoded.

The URL became longer, because each cyrillic letter is represented with two bytes in UTF-8, so there are two `%..` entities.

### Encoding strings

In old times, before `URL` objects appeared, people used strings for URLs.

As of now, `URL` objects are often more convenient, but strings can still be used as well. In many cases using a string makes the code shorter.

If we use a string though, we need to encode/decode special characters manually.

There are built-in functions for that:

- [encodeURI](mdn:/JavaScript/Reference/Global_Objects/encodeURI) - encodes URL as a whole.
- [decodeURI](mdn:/JavaScript/Reference/Global_Objects/decodeURI) - decodes it back.
- [encodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/encodeURIComponent) - encodes a URL component, such as a search parameter, or a hash, or a pathname.
- [decodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/decodeURIComponent) - decodes it back.

A natural question is: "What's the difference between `encodeURIComponent` and `encodeURI`? When we should use either?"

That's easy to understand if we look at the URL, that's split into components in the picture above:

```
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

As we can see, characters such as `:`, `?`, `=`, `&`, `#` are allowed in URL.

...On the other hand, if we look at a single URL component, such as a search parameter, these characters must be encoded, not to break the formatting.

- `encodeURI` encodes only characters that are totally forbidden in URL.
- `encodeURIComponent` encodes same characters, and, in addition to them, characters `#`, `$`, `&`, `+`, `,`, `/`, `:`, `;`, `=`, `?` and `@`.

So, for a whole URL we can use `encodeURI`:

```js run
// using cyrillic characters in url path
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...While for URL parameters we should use `encodeURIComponent` instead:

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Compare it with `encodeURI`:

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

As we can see, `encodeURI` does not encode `&`, as this is a legit character in URL as a whole.

But we should encode `&` inside a search parameter, otherwise, we get `q=Rock&Roll` - that is actually `q=Rock` plus some obscure parameter `Roll`. Not as intended.

So we should use only `encodeURIComponent` for each search parameter, to correctly insert it in the URL string. The safest is to encode both name and value, unless we're absolutely sure that it has only allowed characters.

````smart header="Encoding difference compared to `URL`"
Classes [URL](https://url.spec.whatwg.org/#url-class) and [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) are based on the latest URI specification: [RFC3986](https://tools.ietf.org/html/rfc3986), while `encode*` functions are based on the obsolete version [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

There are a few differences, e.g. IPv6 addresses are encoded differently:

```js run
// valid url with IPv6 address
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

As we can see, `encodeURI` replaced square brackets `[...]`, that's not correct, the reason is: IPv6 urls did not exist at the time of RFC2396 (August 1998).

Such cases are rare, `encode*` functions work well most of the time.
````
