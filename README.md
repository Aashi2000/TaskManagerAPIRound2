## About Task-Manager Application

### Functionalities

Task management allows users to register, create tasks and manage them, major features are

- User SignUp & SignIn
- Create Tasks which are visible only to the logged in users
- New created tasks willU be in OPEN status
- Update task status to IN_PROGRESS or DONE
- Delete tasks
- create Teams
- Add Team Members to Team
- Track Tasks Status of Team Members
- Assign Task to Team Members
- Delete Task,Teams and Team Members through TaskId , TeamId,MemberID and Username
  


## Installation


npm install


## Running the app

### Prerequisite for local/dev mode

- Postgres should be running locally
- And a db called taskmanager should be created ( and also to be updated in config/development.yml )

bash
# development - watch mode
$ npm run start:dev

# production mode
$ npm start


## Description of Task-Manager Application

Task management RESTFul api built using NESTJS , TypeScript, TypeORM and PostgreSQL.


## These ENV's are optional for Task-Manager Application
  host: process.env.DB_HOSTNAME || host,
  port: process.env.DB_PORT || port,
  username: process.env.USERNAME || username,
  password: process.env.PASSWORD || password,
  database: process.env.DB_NAME || database
