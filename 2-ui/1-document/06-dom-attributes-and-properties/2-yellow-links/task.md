importance: 3

---

# Rendi tutti i link esterni arancioni

Rendi tutti i link esterni arancioni modificandone la proprietà `style`.

Un link è esterno se:
- Il suo `href` ha `://` 
- Ma non comincia con `http://internal.com`.

Esempio:

```html run
<a name="list">the list</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // imposta lo stile per un singolo link
  let link = document.querySelector('a');
  link.style.color = 'orange';
</script>
```

Il risultato dovrebbe essere:

[iframe border=1 height=180 src="solution"]
