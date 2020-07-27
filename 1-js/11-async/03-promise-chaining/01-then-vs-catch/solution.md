<<<<<<< HEAD
La risposta breve è: **no, non sono uguali**:
=======
The short answer is: **no, they are not equal**:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

La differenza è che se un errore accade in `f1`, allora è gestito da`.catch` qui:

```js run
promise
  .then(f1)
  .catch(f2);
```

...Ma non qui:

```js run
promise
  .then(f1, f2);
```

Questo perché un errore è passato giù nella catena, e nel secondo pezzo di codice non c'è una catena sotto`f1`.

<<<<<<< HEAD
In altre parole, `.then` passa i risultati/errori al prossimo `.then/catch`. Così nel primo esempio, c'è un `catch` sotto, e nel secondo -- non c'è, così l'errore non è gestito.
=======
In other words, `.then` passes results/errors to the next `.then/catch`. So in the first example, there's a `catch` below, and in the second one there isn't, so the error is unhandled.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
