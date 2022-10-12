Règles à suivre pour installer le site.

1 - Installer "Node.js" pour utiliser principalement "npm" qui est le gestionnaire de paquets par défaut de Node.js https://nodejs.org/en/ (prendre la version recommandée).

2 - Cloner le dépôt Github dont l'url se trouve dans le 1er livrable (FANCHONNA_Curtis_1_code_15-08-2022).

3 - L'ouvrir depuis votre IDE(environnement de développement).

4 - Créer un fichier ".env" dans le dossier "backend" qui contiendra les infos sensibles comme le port ou l'id pour se connecter à la BD (données se trouvent dans le fichier txt). Coller dans ce fichier les lignes suivantes :

ID_MANGO_DB=<Le nom de votre base>
PASSWORD_MANGO_DB=<Votre mot de passe pour accéder à votre base>
APP_SECRET="zov^ff3z2(0z=z\*vn$bemq+7=et(@ns8%mcp8_zfvbiuql!o0d"
PORT="4200"

5 - Depuis le terminal on va se rendre dans le dossier "backend", taper la commande "npm install -g nodemon" puis nodemon serve qui va lancer la communication avec la BD.

6 - Ouvrir un 2e terminal pour vous rendre sur le dossier "frontend" depuis ce dossier faite "npm install react-scripts" et ensuite "npm start" vous devrez avoir le serveur qui se lance sur votre navigateur automatiquement sinon y accéder depuis "http://localhost:3000".

7 - Tout est OK !
