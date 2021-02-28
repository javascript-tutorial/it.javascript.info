Risposta: **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

L' *exotic object* [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) restituito da `f.bind(...)` memorizza il contesto (e gli argomenti, se forniti) solo in fase di creazione. 

Una funzione non può essere riassegnata.
