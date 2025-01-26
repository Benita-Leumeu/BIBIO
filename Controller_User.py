from Connexion import connection
from datetime import datetime, timedelta

def connexion_user(data):
    conn=connection()
    email=data.get('email')
    password=data.get("password")
    # Vérification si l'utilisateur existe déjà dans la base de données
    cur = conn.cursor()
    cur.execute("SELECT * FROM UTILISATEURS WHERE email = %s AND MOT_DE_PASSE = %s", (email, password))
    # cur.execute(f"SELECT * FROM UTILISATEURS WHERE email = '{email}' AND MOT_DE_PASSE = '{password}'")
    result = cur.fetchone()
    if result:
        user = {
            'ID_User': result[0],  # Supposons que la première colonne est l'ID de l'utilisateur
            'Nom': result[1],
            'Prenom': result[2],
            'email': result[3],
            'Pswd':result[4],
            'Adresse':result[5],
            'Telephone':result[6],
            'Sexe':result[7]
                # Ajoutez d'autres champs utilisateur si nécessaire
            }
        cur.close()
        conn.close()
        return user,True
    else:
        return None,False

def get_all_books():
    conn=connection()
    # Vérification si l'utilisateur existe déjà dans la base de données
    cur = conn.cursor()
    cur.execute("SELECT * FROM LIVRES")
    # cur.execute(f"SELECT * FROM UTILISATEURS WHERE email = '{email}' AND MOT_DE_PASSE = '{password}'")
    result = cur.fetchall()
    mapped = []
    for item in result:
        mapped.append({
            'id': item[0],
            'nom': item[1],
            'autheur':item[2],
            'annee':item[3],
            'categorie':item[5],
            'chemin_livre':item[4],
            
        })
    return mapped

#inscription 
#     
def inscription_user(data):
    conn = connection()
    email = data.get('email')
    password = data.get('password')
    nom = data.get('nom')
    prenom = data.get('prenom')
    adresse = data.get('adresse')
    telephone = data.get('telephone')
    sexe = data.get('sexe')

    cur = conn.cursor()

    # Vérification si l'utilisateur existe déjà
    cur.execute("SELECT * FROM UTILISATEURS WHERE email = %s", (email,))
    result = cur.fetchone()
    
    if result:
        cur.close()
        conn.close()
        return None, False, "L'utilisateur existe déjà."

    try:
        # Insertion du nouvel utilisateur
        cur.execute(
            "INSERT INTO UTILISATEURS (NOM, PRENOM, EMAIL, MOT_DE_PASSE, ADRESSE, TELEPHONE, SEXE) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (nom, prenom, email, password, adresse, telephone, sexe)
        )
        conn.commit()

        # Récupérer l'utilisateur nouvellement créé
        cur.execute("SELECT * FROM UTILISATEURS WHERE email = %s", (email,))
        new_user = cur.fetchone()

        user = {
            'ID_User': new_user[0],
            'Nom': new_user[1],
            'Prenom': new_user[2],
            'email': new_user[3],
            'Adresse': new_user[5],
            'Telephone': new_user[6],
            'Sexe': new_user[7]
        }

        cur.close()
        conn.close()
        return user, True, "Inscription réussie."
    except Exception as e:
        cur.close()
        conn.close()
        return None, False, f"Erreur lors de l'inscription : {str(e)}"
    

#reservation 
#  
#
query =  "INSERT INTO RESERVATION (ID_MEMBRE, ID_LIVRE, DATE_EMPRUNT, DATE_RETOUR) VALUES (%s, %s, TO_DATE(%s), TO_DATE(%s))"  
def reservation(data):
    conn = connection()
    user_id = data.get('user_id')
    book_id = data.get('book_id')
    reservation_date = data.get('reservation_date')
    return_date = data.get('return_date')

    cur = conn.cursor()
    # Vérifier si le livre est déjà réservé ou emprunté par cet utilisateur
    cur.execute("SELECT * FROM RESERVATION WHERE ID_MEMBRE = %s AND ID_LIVRE = %s AND (DATE_RETOUR IS NULL OR DATE_RETOUR > CURRENT_DATE)", (user_id, book_id))
    existing_reservation = cur.fetchone()

    if existing_reservation:
        cur.close()
        conn.close()
        return False, "Ce livre est déjà réservé par un autre utilisateur"
    
    if not return_date:
        # Si aucune date de retour n'est fournie, définir une date de retour par défaut (ex: 14 jours plus tard)
        return_date = (datetime.today() + timedelta(days=15)).strftime('%Y-%m-%d')

    try:
        # Insertion d'une nouvelle reservation
        cur.execute(
            query,
            (user_id, book_id, reservation_date, return_date)
        )
        conn.commit()

        cur.close()
        conn.close()
        return  True, "Reservation réussie."
    except Exception as e:
        cur.close()
        conn.close()
        return False, f"Erreur de reservation : {str(e)}"
    
def get_reservation_by_user(user_id):
    conn=connection()
    # Vérification si l'utilisateur existe déjà dans la base de données
    cur = conn.cursor()
    cur.execute("SELECT * FROM RESERVATION WHERE ID_MEMBRE = %s", (user_id,))
    # cur.execute(f"SELECT * FROM UTILISATEURS WHERE email = '{email}' AND MOT_DE_PASSE = '{password}'")
    result = cur.fetchall()
    mapped = []
    for item in result:
        mapped.append({
            'user_id': item[0],
            'book_id': item[1],
            'reservation_date': item[2],
            'return_date': item[3],


            
        })
    return mapped

#creation dun livre 
#     
def create_book(data):
    conn = connection()
    title = data.get('title')
    author = data.get('author')
    year = data.get('year')
    category_id = data.get('category_id')
    book_path = data.get('book_path')

    cur = conn.cursor()
    try:
        # Insertion du nouvel utilisateur
        cur.execute(
            "insert into LIVRES (TITRE, AUTEUR, ANNEE, ID_CATEGORIE, CHEMIN_LIVRE) VALUES (%s, %s, %s, %s, %s);",
            (title, author, year, category_id, book_path)
        )
        conn.commit()

        cur.close()
        conn.close()
        return  True, "Livre ajoute."
    except Exception as e:
        cur.close()
        conn.close()
        return False, f"Erreur d`ajout du Livre : {str(e)}"
    
#emprunter 
#     
def borrow_book(data):
    conn = connection()
    reservation_id = data.get('reservation_id')
    borrow_date = data.get('borrow_date')

    cur = conn.cursor()
     # Vérifier si la réservation existe et si l'utilisateur peut emprunter
    cur.execute("SELECT * FROM EMPRUNTS WHERE ID_RESERVATION = %s AND DATE_EMPRUNT IS NULL", (reservation_id,))
    reservation = cur.fetchone()

    if not reservation:
        cur.close()
        conn.close()
        return False, "Aucune réservation disponible pour cet emprunt."
    try:
         # Mettre à jour la réservation pour définir la date d'emprunt
        cur.execute(
            "UPDATE EMPRUNTS SET DATE_EMPRUNT = TO_DATE(%s, 'YYYY-MM-DD') WHERE ID_RESERVATION = %s",
            (borrow_date, reservation_id)
        )
        conn.commit()

        cur.close()
        conn.close()
        return True, "Emprunt réussi."
    except Exception as e:
        cur.close()
        conn.close()
        return False, f"Erreur d'emprunt : {str(e)}"

        # return False, f"Erreur d'emprunt : {str(e)}"
        
       # Enregistrer l'emprunt
    #     cur.execute(
    #         "INSERT INTO EMPRUNT (ID_RESERVATION, DATE_EMPRUNT) VALUES (%s, TO_DATE(%s))",
    #         (reservation_id, borrow_date)
    #     )
    #     conn.commit()

    #     cur.close()
    #     conn.close()
    #     return  True, "Emprunt réussie."
    # except Exception as e:
    #     cur.close()
    #     conn.close()
    #     return False, f"Erreur d`emprunt : {str(e)}"

def return_book(data):
    conn = connection()
    reservation_id = data.get('reservation_id')
    return_date = data.get('return_date')

    cur = conn.cursor()
    try:
         # Mettre à jour la réservation pour définir la date de retour
        cur.execute(
            "UPDATE RESERVATION SET RETURNED_DATE = TO_DATE(%s, 'YYYY-MM-DD') WHERE ID_RESERVATION = %s",
            (return_date, reservation_id)
        )
        conn.commit()

        cur.close()
        conn.close()
        return True, "Retour réussi."
    except Exception as e:
        cur.close()
        conn.close()
        return False, f"Erreur lors du retour : {str(e)}"
        # Insertion d'un retour
    #     cur.execute(
    #         "UPDATE RESERVATION SET RETURNED_DATE = TO_DATE(%s) WHERE ID_RESERVATION = %s",
    #         (return_date, reservation_id)
    #     )
    #     conn.commit()

    #     cur.close()
    #     conn.close()
    #     return  True, "Retour réussie."
    # except Exception as e:
    #     cur.close()
    #     conn.close()
    #     return False, f"Erreur de retour : {str(e)}"
    
     #categorie 
def create_categorie(data):
    conn = connection()
    categorie_id = data.get('categorie_id')
    nom_categorie = data.get('nom_categorie')
    

    cur = conn.cursor()
    try:
        # Insertion d'une nouvelle categorie

        cur.execute(
            "INSERT INTO CATEGORIE (ID_CATEGORIE,NOM_CATEGORIE ) VALUES (%s, %s)",
            (categorie_id, nom_categorie)
        )
        conn.commit()

        cur.close()
        conn.close()
        return  True, "categorie  ajouter avec succes."
    except Exception as e:
        cur.close()
        conn.close()
        return False, f"Erreur d'ajout : {str(e)}"
    
def get_all_categorie():
    conn=connection()
    # Vérification si l'utilisateur existe déjà dans la base de données
    cur = conn.cursor()
    cur.execute("SELECT * FROM CATEGORIE")
    # cur.execute(f"SELECT * FROM UTILISATEURS WHERE email = '{email}' AND MOT_DE_PASSE = '{password}'")
    result = cur.fetchall()
    mapped = []
    for item in result:
        mapped.append({
            'id_categorie': item[0],
            'nom_categorie': item[1],
            
        })
    return mapped



# /////////////////////////
# Fonction backend pour récupérer les réservations d'un utilisateur avec les détails des livres :

def get_reservations_with_books(user_id):
    conn = connection()  # Connexion à la base de données
    cur = conn.cursor()
    
    query = """
    SELECT r.ID_RESERVATION, r.DATE_EMPRUNT, r.DATE_RETOUR, l.TITRE, l.AUTEUR, l.CHEMIN_LIVRE
    FROM RESERVATION r
    JOIN LIVRES l ON r.ID_LIVRE = l.ID_LIVRE
    WHERE r.ID_MEMBRE = %s;
    """
    
    cur.execute(query, (user_id,))
    result = cur.fetchall()
    
    reservations = []
    for row in result:
        reservations.append({
            'reservation_id': row[0],
            'date_emprunt': row[1],
            'date_retour': row[2],
            'titre': row[3],
            'auteur': row[4],
            'chemin_livre': row[5],
        })
    
    cur.close()
    conn.close()
    return reservations

# Fonction pour récupérer les livres empruntés

def get_borrowed_books(user_id):
    conn = connection()
    cur = conn.cursor()
    
    query = """
    SELECT r.ID_RESERVATION, r.DATE_EMPRUNT, r.DATE_RETOUR, l.TITRE, l.AUTEUR, l.CHEMIN_LIVRE
    FROM RESERVATION r
    JOIN LIVRES l ON r.ID_LIVRE = l.ID_LIVRE
    WHERE r.ID_MEMBRE = %s AND r.DATE_EMPRUNT IS NOT NULL;
    """  # On récupère les livres qui ont été empruntés (DATE_EMPRUNT n'est pas NULL)
    
    cur.execute(query, (user_id,))
    result = cur.fetchall()
    
    borrowed_books = []
    for row in result:
        borrowed_books.append({
            'reservation_id': row[0],
            'date_emprunt': row[1],
            'date_retour': row[2],
            'titre': row[3],
            'auteur': row[4],
            'chemin_livre': row[5],
        })
    
    cur.close()
    conn.close()
    return borrowed_books
# Fonction pour vérifier les retours en retard et appliquer une amende :
def appliquer_amende():
    conn = connection()
    cur = conn.cursor()

    # Sélectionner les réservations où la date de retour est dépassée et l'amende n'a pas encore été appliquée
    cur.execute("""
        SELECT r.ID_MEMBRE, r.ID_LIVRE, r.DATE_RETOUR
        FROM RESERVATION r
        WHERE r.DATE_RETOUR < CURRENT_DATE
        AND r.RETURNED_DATE IS NULL
        AND NOT EXISTS (SELECT 1 FROM AMENDE a WHERE a.ID_LIVRE = r.ID_LIVRE AND a.ID_MEMBRE = r.ID_MEMBRE)
    """)
    result = cur.fetchall()

    # Pour chaque réservation en retard, ajouter une amende
    for row in result:
        membre_id, livre_id, date_retour = row
        montant_amende = 10.00  # Montant de l'amende, peut être ajusté

        cur.execute("""
            INSERT INTO AMENDE (ID_MEMBRE, ID_LIVRE, MONTANT, DATE_AMENDE, PAYEE)
            VALUES (%s, %s, %s, CURRENT_DATE, FALSE)
        """, (membre_id, livre_id, montant_amende))

    conn.commit()
    cur.close()
    conn.close()
