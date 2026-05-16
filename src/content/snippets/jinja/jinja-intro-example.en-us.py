from jinja2 import Template

tmpl = Template("Hello, {{ name }}!")
print(tmpl.render(name="World"))
# Output: Hello, World!
