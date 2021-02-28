importance: 5

---

# Aggiungi toString al dizionario

Abbiamo un oggetto `dictionary`, creato come `Object.create(null)`, in cui memorizziamo coppie `key/value`.

Aggiungi un metodo `dictionary.toString()`, il quale dovrebbe ritornare un lista di chiavi separate da virgola. Il metodo `toString` non deve essere mostrato nei cicli `for..in`.

Dovrebbe funzionare così:

```js
let dictionary = Object.create(null);

*!*
// il tuo codice per aggiungere il metodo toString
*/!*

// aggiungiamo dei valori
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ è una proprietà comune in questo caso

// nel ciclo compaiono solo apple e __proto__ 
for(let key in dictionary) {
  alert(key); // "apple", poi "__proto__"
}  

// la tua implementazione di toString in azione
alert(dictionary); // "apple,__proto__"
```
