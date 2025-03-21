from fastapi import FastAPI
from app.models.database import init_db
from app.routers import map

app = FastAPI()

# Inicializa la base de datos y crea las tablas si no existen
init_db()

# Incluye las rutas definidas en el módulo "map"
app.include_router(map.router)