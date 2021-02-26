

1. Puoi sia utilizzare una funzione wrapper, che una arrow per essere concisi:

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    Ora riceve `user` dalla variabile esterna ed esegue la funzione in maniera corretta.

2. Oppure creare una funzione parziale da `user.login` che utilizzi `user` come contesto ed abbia il giusto primo argomento:


    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
