# Sécurité

> <https://chiffrer.info/>

## Encoder

> Encoder / Décoder : réversible

Transformer un format dans un autre

- encoder une vidéo / image / son

  - AVI → MKV
  - RAW → JPG
  - FLAC → MP3

- encoder une chaine de caractères → `toString(16)`

Exemple : encoder une image (SVG, icône) en `string`
pour éviter le chargement supplémentaire d'une ressource
→ encodage en base64

## Chiffrer

> Chiffrer / Déchiffrer : réversible

Transforme l'entrée AVEC une clé de chiffrement

- Github SSH → clé privé/publique

Le plus simple : chiffrement de César

> <https://lehollandaisvolant.net/tout/tools/cesar/>
> (dans les énigmes, on va avoir « avocat » = A vaut K)

exemple : ABC → KLM

Le plus compliqué ? :
[Enigma](<https://fr.wikipedia.org/wiki/Enigma_(machine)>)

Il faut / suffit de connaître la clé pour déchiffrer

## Hacher

> « Déhacher » n'existe pas !

_Comme en cuisine !_

N'EST DONC PAS RÉVERSIBLE

Pour vérifier la saisie utilisateur (mdp), l'intégrité d'un fichier,
on doit hacher cette saisie et vérifier les _hash_

exemple : `bcrypt` est une fonction de hachage

> <https://fr.wikipedia.org/wiki/Bcrypt>
