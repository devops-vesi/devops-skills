<!-- 
AI INSTRUCTIONS:
- Output file: README.md only
- Update README.md if it exists, create if it doesn't
- Do not create additional documentation files
- Each time the document is modified, add a new row in the Document history table with the current date and a short description of the change
- The "Local setup — start commands" section is placed at the END of the document (chapter 5) for ALL apps: list every start-related script found in package.json (e.g. start, start-dvp, start-rct, start-local, start-noflp…), do not assume a fixed set of commands
- For the CRUD Methods table: only include the operations actually used by the application (Read, Read List, Create, Update, Delete). Remove rows for operations that are not implemented
- If the application is a Fiori Elements app: mention the layout type in the Views section (e.g. List Report, Object Page Layout) and add the "Fiori Elements Type" column in the views table. To detect a Fiori Elements app, check if a `webapp/annotations/` folder exists in the project
- If the application is NOT a Fiori Elements app (none of the above signals are found): omit the Fiori Elements layout mention and remove the "Fiori Elements Type" column from the views table
- For all code blocks: use `typescript` if the project uses TypeScript (tsconfig.json present), otherwise use `javascript`
-->
![image](https://github.com/devops-vesi/devops-skills/blob/main/DevOps_Logo.png)

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
| {{NEXT_VERSION}} | {{MODIFICATION_DATE}} | {{MODIFICATION_DESCRIPTION}} |

# Table of contents
1. [Application Overview](#chapter1)
2. [Technical Details](#chapter2)
3. [MatchCode](#chapter3)
4. [Complex Functions](#chapter4)
5. [Local Setup](#chapter5)

---

## Application Overview <a name="chapter1"></a>
### Technical objects
| Technical obj | Name |
| ------------- | ---- |
| UI5 App | {{UI5_APP_NAME}} |
| Component ID | {{COMPONENT_ID}} |
| Git Repo | {{GIT_REPO_URL}} |

This document provides the information on the technical description for the {{PROJECT_NAME}} application for {{PROJECT_PURPOSE}}. It gives information about the GitLab URL, UI5 component name, OData services used, and some of the important features of the application.

### Application description
This application is used for {{APPLICATION_PURPOSE}}.

#### Principal features
| # | Feature | Description |
| - | ------- | ----------- |
| 1 | {{FEATURE_1_NAME}} | {{FEATURE_1_DESCRIPTION}} |
| 2 | {{FEATURE_2_NAME}} | {{FEATURE_2_DESCRIPTION}} |
| 3 | {{FEATURE_3_NAME}} | {{FEATURE_3_DESCRIPTION}} |

#### Views
This application is composed of {{VIEWS_COUNT}} views.

<!-- FIORI ELEMENTS — include the sentence below and the "Fiori Elements Type" column only if the app is based on Fiori Elements. Otherwise remove this comment block and the column. -->
<!-- Based on the **{{FIORI_ELEMENTS_LAYOUT}}** Fiori Elements layout *(e.g. List Report + Object Page Layout, Worklist, Analytical List Page…)*. -->

| View | Route | Description | Navigation From | Navigation To |
| ---- | ----- | ----------- | --------------- | ------------- |
| {{VIEW_1_NAME}} | {{ROUTE_1}} | {{VIEW_1_DESCRIPTION}} | — | {{VIEW_1_NEXT}} |
| {{VIEW_2_NAME}} | {{ROUTE_2}} | {{VIEW_2_DESCRIPTION}} | {{VIEW_1_NAME}} | {{VIEW_2_NEXT}} |
| {{VIEW_3_NAME}} | {{ROUTE_3}} | {{VIEW_3_DESCRIPTION}} | {{VIEW_2_NAME}} | — |

**Routing diagram:**
```
{{VIEW_1_NAME}} ──► {{VIEW_2_NAME}} ──► {{VIEW_3_NAME}}
```

---

## Technical Details <a name="chapter2"></a>
### oData Service — {{ODATA_SERVICE_NAME}} ({{ODATA_VERSION}})
> Version: **{{ODATA_VERSION}}** — V2 / V4

#### EntitySets
| EntitySet | Description |
| --------- | ----------- |
| {{ENTITYSET_1}} | {{ENTITYSET_1_DESCRIPTION}} |
| {{ENTITYSET_2}} | {{ENTITYSET_2_DESCRIPTION}} |

#### CRUD Methods
<!-- Only keep the rows for operations actually used by the application. Remove unused ones. -->
| Operation | HTTP Method | EntitySet | URL | Parameters | Description |
| --------- | ----------- | --------- | --- | ---------- | ----------- |
| **Read** | GET | {{ENTITYSET}} | `/{{ENTITYSET}}({{KEY}})` | {{PARAMS}} | {{READ_DESCRIPTION}} |
| **Read List** | GET | {{ENTITYSET}} | `/{{ENTITYSET}}` | `$filter`, `$expand`, `$select` | {{READLIST_DESCRIPTION}} |
| **Create** | POST | {{ENTITYSET}} | `/{{ENTITYSET}}` | {{PARAMS}} | {{CREATE_DESCRIPTION}} |
| **Update** | PUT / PATCH | {{ENTITYSET}} | `/{{ENTITYSET}}({{KEY}})` | {{PARAMS}} | {{UPDATE_DESCRIPTION}} |
| **Delete** | DELETE | {{ENTITYSET}} | `/{{ENTITYSET}}({{KEY}})` | {{PARAMS}} | {{DELETE_DESCRIPTION}} |

#### Function Imports / Actions *(V4 only)*
| Name | HTTP Method | Description | Parameters | Return |
| ---- | ----------- | ----------- | ---------- | ------ |
| {{FUNCTION_IMPORT_1}} | GET / POST | {{DESCRIPTION_1}} | {{PARAMS_1}} | {{RETURN_1}} |

---

## MatchCode <a name="chapter3"></a>

### {{MATCHCODE_1_NAME}}
**EntitySet / Service:** `{{MATCHCODE_1_ENTITYSET}}`

**Search fields:**
| Field | Type | Description |
| ----- | ---- | ----------- |
| {{MC1_SEARCH_FIELD_1}} | {{MC1_SEARCH_TYPE_1}} | {{MC1_SEARCH_DESC_1}} |
| {{MC1_SEARCH_FIELD_2}} | {{MC1_SEARCH_TYPE_2}} | {{MC1_SEARCH_DESC_2}} |

**Data returned:**
| Field | Type | Description |
| ----- | ---- | ----------- |
| {{MC1_RETURN_FIELD_1}} | {{MC1_RETURN_TYPE_1}} | {{MC1_RETURN_DESC_1}} |
| {{MC1_RETURN_FIELD_2}} | {{MC1_RETURN_TYPE_2}} | {{MC1_RETURN_DESC_2}} |

**Construction:**
```{{LANG}}
// {{MATCHCODE_1_NAME}} — construction example
{{MATCHCODE_1_CODE_EXAMPLE}}
```

---

### {{MATCHCODE_2_NAME}}
**EntitySet / Service:** `{{MATCHCODE_2_ENTITYSET}}`

**Search fields:**
| Field | Type | Description |
| ----- | ---- | ----------- |
| {{MC2_SEARCH_FIELD_1}} | {{MC2_SEARCH_TYPE_1}} | {{MC2_SEARCH_DESC_1}} |

**Data returned:**
| Field | Type | Description |
| ----- | ---- | ----------- |
| {{MC2_RETURN_FIELD_1}} | {{MC2_RETURN_TYPE_1}} | {{MC2_RETURN_DESC_1}} |

**Construction:**
```{{LANG}}
// {{MATCHCODE_2_NAME}} — construction example
{{MATCHCODE_2_CODE_EXAMPLE}}
```

---

## Complex Functions <a name="chapter4"></a>
> Document here the most complex or critical functions of the application (maximum 3).

---

### Function 1 — `{{FUNCTION_1_NAME}}`
**File:** `{{FUNCTION_1_FILE}}`
**Purpose:** {{FUNCTION_1_PURPOSE}}

**Sub-functions called:**
| Sub-function | File | Role |
| ------------ | ---- | ---- |
| `{{SUB_FUNCTION_1_1}}` | `{{SUB_FILE_1_1}}` | {{SUB_ROLE_1_1}} |
| `{{SUB_FUNCTION_1_2}}` | `{{SUB_FILE_1_2}}` | {{SUB_ROLE_1_2}} |
| `{{SUB_FUNCTION_1_3}}` | `{{SUB_FILE_1_3}}` | {{SUB_ROLE_1_3}} |

**Call flow:**
```
{{FUNCTION_1_NAME}}
  └─ {{SUB_FUNCTION_1_1}}
       └─ {{SUB_FUNCTION_1_2}}
            └─ {{SUB_FUNCTION_1_3}}
```

**Code explanation:**
```{{LANG}}
{{FUNCTION_1_CODE_SNIPPET}}
``` — `{{FUNCTION_2_NAME}}`
**File:** `{{FUNCTION_2_FILE}}`
**Purpose:** {{FUNCTION_2_PURPOSE}}

**Sub-functions called:**
| Sub-function | File | Role |
| ------------ | ---- | ---- |
| `{{SUB_FUNCTION_2_1}}` | `{{SUB_FILE_2_1}}` | {{SUB_ROLE_2_1}} |
| `{{SUB_FUNCTION_2_2}}` | `{{SUB_FILE_2_2}}` | {{SUB_ROLE_2_2}} |
| `{{SUB_FUNCTION_2_3}}` | `{{SUB_FILE_2_3}}` | {{SUB_ROLE_2_3}} |

**Call flow:**
```
{{FUNCTION_2_NAME}}
  └─ {{SUB_FUNCTION_2_1}}
  └─ {{SUB_FUNCTION_2_2}}
       └─ {{SUB_FUNCTION_2_3}}
```

**Code explanation:**
```{{LANG}}
{{FUNCTION_2_CODE_SNIPPET}}
``` — `{{FUNCTION_3_NAME}}`
**File:** `{{FUNCTION_3_FILE}}`
**Purpose:** {{FUNCTION_3_PURPOSE}}

**Sub-functions called:**
| Sub-function | File | Role |
| ------------ | ---- | ---- |
| `{{SUB_FUNCTION_3_1}}` | `{{SUB_FILE_3_1}}` | {{SUB_ROLE_3_1}} |
| `{{SUB_FUNCTION_3_2}}` | `{{SUB_FILE_3_2}}` | {{SUB_ROLE_3_2}} |
| `{{SUB_FUNCTION_3_3}}` | `{{SUB_FILE_3_3}}` | {{SUB_ROLE_3_3}} |

**Call flow:**
```
{{FUNCTION_3_NAME}}
  └─ {{SUB_FUNCTION_3_1}}
  └─ {{SUB_FUNCTION_3_2}}
       └─ {{SUB_FUNCTION_3_3}}
```

**Code explanation:**
```{{LANG}}
{{FUNCTION_3_CODE_SNIPPET}}
```

---

## Local Setup <a name="chapter5"></a>
All available `start` scripts from `package.json` *(list every script whose name begins with `start`)*:

| Script | Command | Description |
| ------ | ------- | ----------- |
| `{{SCRIPT_NAME}}` | `{{SCRIPT_COMMAND}}` | {{SCRIPT_DESCRIPTION}} |

```json
"scripts": {
  {{ALL_START_SCRIPTS}}
}
```