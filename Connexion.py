import snowflake.connector
 
def connection():
    # Configuration des informations de connexion
    account = 'bissszl-ur42538'
    username = 'MICH'
    password = 'Onesime2008.'
    warehouse='COMPUTE_WH'
    database='prj_bibliotheque'
    schema='public'
 
    # Connexion à Snowflake
    conn = snowflake.connector.connect(
        user=username,
        password=password,
        account=account,
        warehouse=warehouse,
        database=database,
        schema=schema
    )
 
    # Vérification de la connexion
    if conn:
        print("Connecté à Snowflake!")
        return conn
        # Vous êtes maintenant connecté à Snowflake, vous pouvez effectuer des opérations ici
        # Par exemple, exécuter des requêtes, des mises à jour, etc.
    else:
        print("Échec de la connexion à Snowflake.")
        return
connection()