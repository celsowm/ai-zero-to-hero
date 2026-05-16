from jinja2 import Template

tmpl = Template("Olá, {{ nome }}!")
print(tmpl.render(nome="Mundo"))
# Saída: Olá, Mundo!
