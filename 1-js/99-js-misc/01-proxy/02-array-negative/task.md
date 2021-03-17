
# Accesso ad un array[-1]

In alcuni linguaggi di programmazione, possiamo accedere agli elementi dell'array utilizzando indici negativi, che iniziano il conteggio dalla coda dell'array.

Come nell'esempio:

```js
let array = [1, 2, 3];

array[-1]; // 3, l'ultimo elemento
array[-2]; // 2, il penultimo elemento
array[-3]; // 1, il terzultimo elemento
```

In altre parole, `array[-N]` equivale a `array[array.length - N]`.

Create un proxy che implementa questa funzionalità.

Così è come dovrebbe funzionare:

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* il vostro codice */
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

// Le altre funzionalità dell'array devono rimanere tali
```
