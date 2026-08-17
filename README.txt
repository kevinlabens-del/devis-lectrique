DEVIS ÉLECTRIQUE — V12 CORRECTIVE

Corrections principales :
- Aperçu A4 HTML natif conservé pour Android.
- Bouton « Reconstruire depuis le devis » : restaure désormais les lignes AUTO supprimées sans effacer les lignes MANUELLES.
- Sauvegarde JSON plus fiable : sélecteur de fichier si disponible, partage système Android, puis téléchargement classique en dernier recours.
- Génération des PDF devis et matériel avec la même stratégie d'enregistrement fiable.
- Copie du récapitulatif et du code de sauvegarde avec méthode de secours si l'API presse-papiers est bloquée.
- Service Worker V12 : mise à jour réseau prioritaire des fichiers critiques, suppression des anciens caches, skipWaiting + clients.claim.
- Génération automatique de matériel étendue aux alimentations avec calibre explicite, mises à la terre, liaisons équipotentielles, thermostats/fil pilote, remplacement d'appareillage et reprises.
- Prises automatiquement proposées en version étanche pour les zones Garage, Dépendance, Jardin ou extérieur.
- Gestion de la touche Échap pour fermer les fenêtres d'aperçu/sauvegarde.

Compatibilité :
- La clé de sauvegarde locale reste « releve-electrique-v1 » afin de conserver les données des versions précédentes sur le même domaine.
- Les sauvegardes JSON/code RELEVE-ELEC-V1 restent importables.

Publication :
Décompresser le contenu du dossier devis-electrique-app à la racine de l'hébergement statique.
