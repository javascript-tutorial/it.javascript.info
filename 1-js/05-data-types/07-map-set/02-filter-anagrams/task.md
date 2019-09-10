importance: 4

---

# Filtrare anagrammi

Gli [anagrammi](https://en.wikipedia.org/wiki/Anagram) sono parole che hanno le stesse lettere, ma in un ordine differente.

Ad esempio:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Scrivete una funzione `aclean(arr)` che ritorna un array ripulito dagli anagrammi.

Ad esempio:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

Da ogni gruppo di anagrammi dovrebbe rimanere solamente una parola, non ha importanza quale.

