importance: 4

---

# Costanti maiuscole?

Analizziamo il seguente codice:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Abbiamo una costante `birthday` che indica una data e  `age` che viene calcolata da `birthday` tramite un algoritmo (non viene fornito per brevità, e perchè non è importante per descrivere l'argomento).

Sarebbe giusto utilizzare lettere maiuscole per `birthday`? E per `age`? O anche per entrambe?

```js
const BIRTHDAY = '18.04.1982'; // make uppercase?

const AGE = someCode(BIRTHDAY); // make uppercase?
```

