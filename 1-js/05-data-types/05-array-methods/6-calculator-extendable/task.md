importance: 5

---

# Create una calcolatrice estensibile

Create un costruttore `Calculator` che crei oggetti calcoltrice "estensibili".

Il compito consiste in due parti.

1. La priam parte, consiste nell'implementare il metodo `calculate(str)` che prenda una stringa come `"1 + 2"` nel formato "NUMERO operatore NUMERO" (delimitata da spazi) e ne ritorni il risultato. Dovrebbe interpretare sia `+` che `-`.

    Esempio d'uso:

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2. Successivamente aggiungete il metodo `addMethod(name, func)` che ha lo scopo di insegnare alla calcolatrice una nuova operazione. Questo prende il nome dell'operatore `name` e i due argomenti della funzione `func(a,b)` che lo implementa.

    Ad esempio, proviamo ad aggiungere la moltiplicazione `*`, divisione `/` e la potenza `**`:

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

<<<<<<< HEAD
- Non è richiesta la gestione delle parentesi o di operazioni complesse.
- I numeri e l'operatore sono separati esattamente da un singolo carattere spaziatore.
- Se ne hai voglia potresti provare ad aggiungere un minimo di gestione degli errori.
=======
- No parentheses or complex expressions in this task.
- The numbers and the operator are delimited with exactly one space.
- There may be error handling if you'd like to add it.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
