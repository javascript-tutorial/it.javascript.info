importance: 4

---

# Costanti maiuscole?

Analizziamo il seguente codice:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
Abbiamo una costante `birthday` che indica una data e  `age` che viene calcolata da `birthday` tramite un algoritmo (non viene fornito per brevità, e perchè non è importante per descrivere l'argomento).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d

Sarebbe giusto utilizzare lettere maiuscole per `birthday`? E per `age`? O anche per entrambe?

```js
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
```
