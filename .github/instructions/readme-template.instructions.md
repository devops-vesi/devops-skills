---
applyTo: '**/README.md'
---

# Template README - Instructions pour Copilot

Lors de la création ou modification d'un README, utiliser obligatoirement le template disponible dans le workspace : `../company-templates/documentation/README-template.md`

## Variables à remplacer automatiquement

- `{{PROJECT_NAME}}` - Nom du projet (à extraire du manifest.json ou package.json)
- `{{SONARQUBE_BADGE_URL}}` - URL du badge SonarQube
- `{{SONARQUBE_DASHBOARD_URL}}` - URL du dashboard SonarQube
- `{{REVIEWER_NAME}}` - Nom du reviewer
- `{{AUTHOR_NAME}}` - Nom de l'auteur
- `{{INITIAL_DATE}}` - Date de création (format DD/MM/YYYY)
- `{{UI5_APP_NAME}}` - Nom technique UI5 (à extraire du manifest.json)
- `{{COMPONENT_ID}}` - ID du composant (à extraire du manifest.json)
- `{{GIT_REPO_URL}}` - URL du repository GitLab
- `{{PROJECT_PURPOSE}}` - Objectif du projet
- `{{APPLICATION_PURPOSE}}` - But de l'application
- `{{FEATURES_LIST}}` - Liste des fonctionnalités (format bullet points)
- `{{VIEWS_COUNT}}` - Nombre de vues dans l'application
- `{{VIEWS_DESCRIPTION}}` - Description détaillée des vues avec captures d'écran
- `{{ODATA_CALLS_TABLE}}` - Tableau des appels OData (format tableau markdown)
- `{{CUSTOM_SECTION_X_TITLE}}` - Titres des sections techniques personnalisées
- `{{CUSTOM_SECTION_X_CONTENT}}` - Contenu des sections techniques personnalisées

## Règles

1. Toujours inclure le logo en haut du document
2. Inclure les badges de build et qualité
3. Respecter la structure en 2 chapitres : Overview et Technical Details
4. Les sections TypeScript Config sont obligatoires pour tous les projets TypeScript
5. Analyser le code du projet pour remplir automatiquement les sections techniques