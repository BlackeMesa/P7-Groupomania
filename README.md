### Lancement de l'application 

- Cloner le repo
- Initialiser le projet (npm i)


### Créer un projet Firebase

- Créer un compte firestore
- Créer un nouveau projet 
- Aller dans les paramétres du projet et créer une nouvelle app Web
- Firebase affichera les données personnelles de votre projet (apiKey: "wdfwfq",
  authDomain: "qfsqsf",
  projectId: "qfsqf",
  storageBucket: "qfsqf",
  messagingSenderId: "qfsqf",
  appId: "qsfqf")
- Les remplacer dans le fichier .env.exemple tout en supprimant le .exemple du fichier

* Bravo, vous avez réussi la première configuration 🚀

### Configurer le projet Firebase pour accueillir les données

- Dans l'onglet Créer de votre projet Firebase :

- créer un nouveau Firestore Database 
- Aller dans règles et changer (allow read, write: if false;) par (allow read, write: if true;)

- créer un nouveau Authentication
- méthode d'authentification email/password

- Créer un nouveau Storage 
- Ajouter un dossier images



### Importer les données de la BDD

- récupérer votre API Key du projet
- Aller dans Paramètres du projet - Comptes de service
- Générer une nouvelle clé privé


- Installer node firestore import-export
- Executer sur vote machine npm install -g node-firestore-import-export
- Executer firestore-import -a cheminversvotrenouvellecléprivé -b cheminverslefichierdataBackup.json

🥳🎉 Félicitations votre application est fin prête 🎉🥳

 Executer npm start pour lancer l'application.

### Créer un admin (facultatif)

- Créer un utilisateur nommé Admin depuis l'UI de l'Application
- Récupérer son UID dans Authentication du projet Firebase
- Le copier puis coller dans REACT_APP_FIREBASE_ADMIN_UID du fichier .env
- Vous aurez accès a des fonctionnalités de suppression et modification pour tout les posts