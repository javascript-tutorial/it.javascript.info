```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('Viene eseguita dopo 3 secondi'));
```

È da notare che in questo task, `resolve` è chiamato senza argomenti. Non ritorniamo alcun valore da `delay`, ci assicuriamo solo del ritardo.
