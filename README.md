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
|  4  | Create |       /updates       |   POST    | Create |        Create request for account update        |
|  5  |  Read  |        /user         |    GET    |  Read  |           Gets the list of all users            |
|  6  |  Read  |    /user/details     |    GET    |  Read  |   Gets the user details of the logged in user   |
|  7  |  Read  |       /scholar       |    GET    |  Read  |          Gets the list of all scholars          |
|  8  |  Read  |       /grades        |    GET    |  Read  |       Gets the list of all scholar grades       |
|  9  |  Read  |       /updates       |    GET    |  Read  |      Gets the list of all account updates       |
| 10  | Update |    /user/details     |    PUT    | Update |      Updates the basic profile of the user      |
| 11  | Update |    /user/account     |    PUT    | Update |     Updates the account details of the user     |
| 12  | Update |      /user/:id       |    PUT    | Update |      Updates the access level of the user       |
| 13  | Update |   /scholar/details   |    PUT    | Update |  Updates the profile of the logged in scholar   |
| 14  | Update | /scholar/details/:id |    PUT    | Update |       Updates the profile of any scholar        |
| 15  | Update |     /grades/:id      |    PUT    | Update |        Updates the grades of any scholar        |
| 16  | Delete |     /updates/:id     |  DELETE   | Delete |             Delete account updates              |

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

## Installation

To run the Aboitiz Scholars Central app locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Install the dependencies: `npm install`
3. Configure the environment variables: Create a `.env` file based on the provided `.env.example` file and set the required values.
4. Start the development server: `npm start`

## Usage

Once the app is up and running, you can access it via your web browser. The app is responsive and can be conveniently used on desktop, tablet, and mobile devices.

### Admin (Aboitiz Foundation) Features

- As an admin, you have additional privileges and can manage scholar information.
- You can assign roles to users and control their access levels.
- You have the ability to add or delete data fields in the dashboard.
- The dashboard provides an overview of scholars' information, including status, employment, grades, and demographics.
- You can enter, edit, and extract data from the dashboard.
- Generating reports of scholars' information is also supported.

### Admin (BU CSR Officers) Features

- As an admin (BU CSR Officer), you can manage scholar information as well.
- You have access to the dashboard, where you can view, enter, edit, and extract data.
- Generating reports of scholars' information is supported.

### Scholar Account

- As a scholar, you can register an account by providing your data.
- Upon approval, you can edit your data as necessary.

## Notes

You can use these following credentials to try the app as an admin:

username: dmendegorin
password: Secret1!
