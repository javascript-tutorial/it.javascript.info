importanza: 5

---

# createTextNode vs innerHTML vs textContent

Abbiamo `elem`, un elemento DOM vuoto, e una stringa`text`.

Which of these 3 commands will do exactly the same?

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
