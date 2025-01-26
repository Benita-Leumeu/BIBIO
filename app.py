from flask import Flask
from flask_cors import CORS
from routes.auth_route import auth_bp  # Importer le blueprint des routes d'authentification
from routes.action_route import action_pb  # Importer le blueprint des routes d'authentification

app = Flask(__name__)
CORS(app)

# Enregistrer les blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(action_pb)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
