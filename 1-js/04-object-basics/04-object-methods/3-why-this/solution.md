
Vediamo la spiegazione.

1. Questa è una normale chiamata ad un metodo dell'oggetto.

2. Stessa cosa, le parentesi non cambiano l'ordine delle operazioni, il punto viene eseguito per primo in ogni caso.

3. Qui abbiamo una chiamata più complessa `(expression).method()`. La chiamata viene interpretata come fosse divisa in due righe:

    ```js no-beautify
    f = obj.go; // calculate the expression
    f();        // call what we have
    ```

    Qui `f()` viene eseguita come una funzione, senza `this`.

4. Molto simile a `(3)`, alla sinistra del punto `.` abbiamo un espressione.

Per spiegare il comportamento di `(3)` e `(4)` dobbiamo ricordare che la proprietà di accesso (il punto o le parentesi quadre) ritornano un valore di tipo riferimento.  

Qualsiasi operazione tranne la chiamata ad un metodo (come l'assegnazione `=` o `||`) trasforma questo riferimento in un valore oridnario, che non porta più le informazioni necessarie per impostare `this`.

