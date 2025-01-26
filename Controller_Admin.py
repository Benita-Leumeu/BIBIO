from Connexion import connection
from datetime import datetime, timedelta
import logging



def connexion_admin(data):
    conn = connection()
    email = data.get('email')
    password = data.get("password")
    
    # Vérification si l'utilisateur existe dans la table ADMIN
    cur = conn.cursor()
    cur.execute("SELECT * FROM ADMIN WHERE EMAIL = %s AND MOT_DE_PASSE = %s", (email, password))
    result = cur.fetchone()
    
    if result:
        # Récupération des informations de l'admin
        admin = {
            'ID_Admin': result[0],
            'Nom': result[1],
            'Prenom': result[2],
            'Email': result[3],
            'Role': result[5]  # Le rôle est stocké dans la 6e colonne
        }
        cur.close()
        conn.close()
        return admin, True
    else:
        return None, False
