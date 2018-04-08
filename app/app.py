import os
from sanic import Sanic
from sanic.response import html
from jinja2 import Environment, FileSystemLoader

base_dir = os.path.dirname(os.path.abspath(__name__))
templates_dir = os.path.join(base_dir, 'templates')
jinja_env = Environment(loader=FileSystemLoader(templates_dir), autoescape=True)
app = Sanic(__name__)


def render_template(template_name, **context):
    template = jinja_env.get_template(template_name)
    return template.render(context)


@app.route('/')
async def index(request):
    return html(render_template('index.html'))
