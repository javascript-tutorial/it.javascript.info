# Trovate le coppie di bbtag

Un "bb-tag" si presenta così `[tag]...[/tag]`, in cui `tag` è uno tra: `b`, `url` o `quote`.

Ad esempio:
```
[b]text[/b]
[url]http://google.com[/url]
```

I BB-tags possono essere annidati. Un tag, tuttavia, non può essere contenuto all'interno di uno dello stesso tipo, ad esempio:

```
Normale:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

Non può verificarsi:
[b][b]text[/b][/b]
```

I tag possono contenere interruzioni di linea, questo è del tutto normale:

```
[quote]
  [b]text[/b]
[/quote]
```

Create una regexp per trovare tutti i BB-tags con il loro contenuto.

Per esempio:

```js
let regexp = /your regexp/flags;

let str = "..[url]http://google.com[/url]..";
alert( str.match(regexp) ); // [url]http://google.com[/url]
```

In caso di tag annidati ci occorre il tag esterno (se lo desideriamo possiamo continuare la ricerca nel contenuto appena ricavato):

```js
let regexp = /your regexp/flags;

let str = "..[url][b]http://google.com[/b][/url]..";
alert( str.match(regexp) ); // [url][b]http://google.com[/b][/url]
```
