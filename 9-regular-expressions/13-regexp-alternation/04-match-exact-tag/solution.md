
L'inizio del pattern è ovvio: `pattern:<style`.

Ma successivamente non possiamo semplicemente scrivere `pattern:<style.*?>`, poiché altrimenti `match:<styler>` troverebbe corrispondenza.

Abbiamo bisogno di uno spazio dopo `match:<style` e dopo facoltativamente qualcos'altro o la `match:>` finale.

Tradotto nel linguaggio delle regexp: `pattern:<style(>|\s.*?>)`.

In azione:

```js run
let regexp = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```
