from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from fastapi.responses import JSONResponse

# Créer l'application FastAPI
app = FastAPI()

# ✅ Activer les CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Charger les données
df = pd.read_csv('spotify_tracks.csv')

#Danceability par rapport au tempo (limité à 100 morceaux)
@app.get("/tempo")
def read_tempo():
    items = df[['track_name', 'tempo', 'danceability']].head(100)
    response = items.to_dict(orient="records")  # Assurez-vous que c'est un tableau d'objets
    return JSONResponse(content={"items": response})

#Danceability par rapport au valence (limité à 100 morceaux)
@app.get("/danceability-valence")
def read_danceability_valence():
    items = df[['track_name', 'valence', 'danceability']].head(100)
    response = items.to_dict(orient="records")
    return JSONResponse(content={"items": response})

#Loudness moyen par langue
@app.get("/loudness-language")
def get_loudness_language():
    grouped_data = df.groupby('language')['loudness'].mean().reset_index()
    response = grouped_data.to_dict(orient="records")
    return JSONResponse(content={"items": response})
