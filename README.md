# RUNNER 

Le runner créer un fichier dans lequel il écrit le code reçu puis grâce à un volume partagé, le code est exécuté dans un container.

## Installation 

Récupérer les images docker suivantes :
- python
- node
- rust
- openjdk

Créer 4 fichiers à la racine du projet :
- python 
- js 
- rust
- java 

```bash
yarn install 

npm start 
```

## Technologies utilisées    

### Express

Express pour réceptionner les requêtes. J'utilise express car c'est un framework très populaire que j'ai déjà utilisé.

### Dockerode

Dockerode permet de manipuler des containers avec node. 
Il lance un container avec une image appropriée au langage et il récupère le flux de sortie qu'il sépare en deux : stdout et stderr.
