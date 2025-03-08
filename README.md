# iTunes Seeker Mobile

Une application mobile développée avec React Native et Expo permettant d'explorer la base de données iTunes via l'API publique d'Apple.

## Fonctionnalités

- Recherche dans la base de données iTunes :
  - Par nom d'artiste
  - Par titre de chanson
- Affichage des résultats dans une interface mobile intuitive
- Vue détaillée pour chaque résultat sélectionné
- Système de favoris personnalisé
- Système de notation personnalisé pour vos morceaux préférés
- Interface adaptée aux appareils iOS et Android

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Expo CLI
- Un smartphone avec l'application Expo Go installée (pour le développement)

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/jacques931/itunes_seeker.git
cd itunes_seeker
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

## Lancement

1. Démarrez le serveur de développement Expo :
```bash
npx expo start
```

2. Scannez le QR code avec :
   - L'application Expo Go sur Android
   - L'application Appareil photo sur iOS

## API iTunes

Cette application utilise l'[API iTunes Search](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/) qui permet d'accéder à la vaste base de données musicale d'iTunes. L'API est gratuite et ne nécessite pas de clé d'authentification.

## Technologies Utilisées

- React Native
- Expo
- React Navigation
- AsyncStorage (pour le stockage local)
- API iTunes Search