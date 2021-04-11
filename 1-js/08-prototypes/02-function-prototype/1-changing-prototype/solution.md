
Riposte:

1. `true`. 

    L'assegnazione a `Rabbit.prototype` imposta `[[Prototype]]` per i nuovi oggetti, ma non influenza gli oggetti già esistenti. 

2. `false`. 

    Gli oggetti vengono assegnati per riferimento. L'oggetto in `Rabbit.prototype` non viene duplicato, è sempre un oggetto riferito sia da `Rabbit.prototype` che da `[[Prototype]]` di `rabbit`. 

    Quindi quando cambiamo il suo contenuto tramite un riferimento, questo sarà visibile anche attraverso l'altro.

3. `true`.

    Tutte le operazion di `delete` vengono applicate direttamente all'oggetto. Qui `delete rabbit.eats` prova a rimuovere la proprietà `eats` da `rabbit`, ma non esiste. Quindi l'operazione non avrà alcun effetto.

4. `undefined`.

    La proprietà `eats` viene rimossa da prototype, non esiste più.
