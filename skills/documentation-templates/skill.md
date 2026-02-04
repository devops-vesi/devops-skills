![image](https://vincienergies.sharepoint.com/:i:/r/sites/GO-DevOps894/Documents%20partages/General/Communication%20Kit/DevOps%20Logo/DEVOPS_LOGO_ENERGIE/LIBRE/LONG/BASELINE/PNG/DEVOPS_RVB_LOGO_CLASSIC.png?csf=1&web=1&e=jznJor)

# Technical Documentation - {{PROJECT_NAME}}

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
[![Quality Gate Status]({{SONARQUBE_BADGE_URL}})]({{SONARQUBE_DASHBOARD_URL}})

| Designation | Name |
| ----------- | ---- |
| Reviewer | {{REVIEWER_NAME}} |
| Author | {{AUTHOR_NAME}} |

# Document history
| Version | Date | Modification |
| ------- | ---- | ------------ |
| 1.0 | {{INITIAL_DATE}} | Initial Version |

# Table of contents
1. [Application Overview](#chapter1)
2. [Technical Details](#chapter2)

## Application Overview <a name="chapter1"></a>
### Technical objects
| Technical obj | Name |
| ------------- | ---- |
| UI5 App | {{UI5_APP_NAME}} |
| Component ID | {{COMPONENT_ID}} |
| Git Repo | {{GIT_REPO_URL}} |

This document provides the information on the technical description for the {{PROJECT_NAME}} application for {{PROJECT_PURPOSE}}. It gives information about the GitLab URL, UI5 component name, OData services used, and some of the important features of the application.

### Typescript Config

#### EsLint
```sh
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

ESLint needs to be told which plug-ins to use and which JavaScript language level the code should have. Everything is configured in the `.eslintrc.json` file.

Execute ESLint with the following command:

```sh
npx eslint webapp
```

#### Code transformation
Add the dependency to `ui5-tooling-transpile` to your project first:

```sh
npm install --save-dev ui5-tooling-transpile
```

Then add the following configuration at the end of your `ui5.yaml`:

```yaml
builder:
  customTasks:
    - name: ui5-tooling-transpile-task
      afterTask: replaceVersion
server:
  customMiddleware:
    - name: ui5-tooling-transpile-middleware
      afterMiddleware: compression
```
Transpile is based on the `.babelrc.json` config file. You can find the format documentation here : https://babeljs.io/docs/configuration

### Application description
This application is used for {{APPLICATION_PURPOSE}}. This application has the following features :
{{FEATURES_LIST}}

This application is composed of {{VIEWS_COUNT}} views :
{{VIEWS_DESCRIPTION}}

## Technical Details <a name="chapter2"></a>
### Flux with oData server

| Call Source | Method | Description | Comment |
| ----------- | ------ | ----------- | ------- |
{{ODATA_CALLS_TABLE}}

### {{CUSTOM_SECTION_1_TITLE}}
{{CUSTOM_SECTION_1_CONTENT}}

### {{CUSTOM_SECTION_2_TITLE}}
{{CUSTOM_SECTION_2_CONTENT}}

### {{CUSTOM_SECTION_3_TITLE}}
{{CUSTOM_SECTION_3_CONTENT}}
