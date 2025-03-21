from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlmodel import Session, select
from app.models.database import get_session
from app.models.line import Line
from app.schemas.line import LineResponse

router = APIRouter()

clients = []

@router.websocket("/map/{line_id}/ws")
async def websocket_endpoint(websocket: WebSocket, line_id: str, session: Session = Depends(get_session)):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Mensaje recibido en la línea {line_id}: {data}")

            if data == "info":
                # Buscar en la base de datos
                query = select(Line).where(Line.id == int(line_id))
                result = session.exec(query).first()
                if result:
                    response = LineResponse(
                        id=result.id,
                        name=result.name,
                    )
                else:
                    response = {"type": "error", "message": "Línea no encontrada"}
            else:
                response = {"type": "error", "message": "Comando no reconocido"}

            # Enviar la respuesta al cliente
            await websocket.send_json(response.model_dump() if isinstance(response, LineResponse) else response)
    except WebSocketDisconnect:
        clients.remove(websocket)
        print(f"Cliente desconectado de la línea {line_id}")