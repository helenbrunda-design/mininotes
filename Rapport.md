# Rapport de sécurité – Mininotes

## 1. Périmètre & méthode
* **Outils utilisés :**npm audit (SCA)	Détecte les librairies vulnérables (A06),npx eslint . (SAST), semgrep(SAST)

* **Méthode d'audit :** Analyse du code source de l'application, reproduction locale des failles d'authentification et de stockage à l'aide de requêtes `curl`, écriture des correctifs, et déploiement partiel du workflow de sécurité automatique.



