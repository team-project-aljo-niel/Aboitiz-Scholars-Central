# Aboitiz Scholars Central

## Introduction

The Aboitiz Scholar Central app is a scholarship dashboard that aims to be the central hub for everything related to scholarships.
Its dashboard will provide information on the total number of supported scholars, their scholarship status, the number of graduates, their employment status, grades, and demographics like age, gender, and location.
With its name, the app emphasizes that it will serve as the primary source of scholarship-related resources and information, including a comprehensive database of scholars' data.

## Database and API design

### Endpoints

|  #  | Action |         URL          | HTTP Verb |  CRUD  |                   Description                   |
| :-: | :----: | :------------------: | :-------: | :----: | :---------------------------------------------: |
|  1  | Create |       /signup        |   POST    | Create |               Creates a new user                |
|  2  | Create |        /login        |   POST    | Create |           Creates user session token            |
|  3  | Create |   /scholar/details   |   POST    | Create | Creates a scholar data of the logged in scholar |
|  4  |  Read  |        /user         |    GET    |  Read  |           Gets the list of all users            |
|  5  |  Read  |    /user/details     |    GET    |  Read  |   Gets the user details of the logged in user   |
|  6  |  Read  |       /scholar       |    GET    |  Read  |          Gets the list of all scholars          |
|  7  |  Read  |       /grades        |    GET    |  Read  |       Gets the list of all scholar grades       |
|  8  | Update |    /user/details     |    PUT    | Update |      Updates the basic profile of the user      |
|  9  | Update |    /user/account     |    PUT    | Update |     Updates the account details of the user     |
| 10  | Update |      /user/:id       |    PUT    | Update |      Updates the access level of the user       |
| 11  | Update |   /scholar/details   |    PUT    | Update |  Updates the profile of the logged in scholar   |
| 12  | Update | /scholar/details/:id |    PUT    | Update |       Updates the profile of any scholar        |
| 13  | Update |     /grades/:id      |    PUT    | Update |        Updates the grades of any scholar        |

## User Stories

### As a user, I can register in the app.

#### Acceptance criteria

- I can signup
- I can login my account
- I can edit my account details

### As an admin(Aboitiz Foundation), I can manage scholar information.

#### Acceptance criteria

- I can add roles to users
- I can add and delete data fields of the dashboard
- I can view the dashboard
- I can enter data
- I can edit data
- I can extract data
- I can generate report of scholars' information

### As an admin(BU CSR Officers), I can manage scholar information.

#### Acceptance criteria

- I can view the dashboard
- I can enter data
- I can edit data
- I can extract data
- I can generate report of scholars' information

### As a scholar, I can register an account.

#### Acceptance criteria

- I can enter my data
- I can edit data upon approval

### As a user, I can use the app conveniently.

#### Acceptance criteria

- I can use the app on desktop, tablet, and mobile.

## Stretch Goals

- add a built-in calendar for scheduling events
- add a dark and light mode

## Notes
You can use these following credentials to try the app as an admin:

username: dmendegorin
password: Secret1!
