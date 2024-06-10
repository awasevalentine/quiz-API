# Quiz Game API

## Instruction on how to start the app


## Installation

- Step 1: Clone the repo

- Step 2: "run npm install" after cloning

- Step 3: Setup your database and create .env file in the root of the application where you will pass the url or connection string on the datase.
        Example: DB_URI="mongodb connection string"
                 JWT_SECRET="Your secret"

- Step 4: Run "npm run start:dev" to start the application. When the application is successfully started you can use the apollo-graphql playground to test your API
        <a href="http://localhost:8081/graphql">http://localhost:8081/graphql </a>

  ## How to perform actions on the endpoints

  - Create user:
   *         Mutation: 
                  mutation createUser($createUser: CreateUserDto!) {
                createUser(createUser: $createUser)
              }
  *          Mutation Variables:
                    {
                      "createUser": {
                        "username": "Admin",
                      	"email": "admin@gmail.com",
                      	"password": "123456",
                        "role": "ADMIN"
                      }
                    }
  - Get User:
  -       query GetUser($username: String!){
              getUser(username: $username){
                id
                username
                email
                created_at
              }
            }
-        Query Variable:
                      {
                        "username": "Admin"
                      }
- Quiz:
-       mutation CreateQuiz($payload: CreateQuizDto!){
            createQuiz(createQuizPayload: $payload){
              id
              title
              description
            }
          }
-      Mutation variables:
                        {
                        "payload": {
                          "title": "Web development",
                          "description": "This is for web development"
                        }
                      }

  - Question:
  -         mutation CreateQuestion($payload: CreateQuestionDto!){
              createQuestion(createQuestionPayload: $payload){
                id
                text
                options
                correctAnswer
              }
            }

  -        Question mutation variable:
                    {
                    "payload": {
                      "quizId": "6664a37064894782618eef2b",
                      "text": "What is Git?",
                      "options": ["It is a remote repository", "It's a non-sql database"],
                      "correctAnswer": "It is a remote repository"
                    }
                  }

  - Score:
  -       mutation CreateScore($payload: CreateScoreDto!){
            createScore(createScorePayload: $payload)
          }

  -       score mutation variable:
                          {
                          "payload": {
                            "userId": "66632473e961f7a7ab9f98ba",
                            "quizId": "6664a37064894782618eef2b",
                            "score": "100"
                          }
                        }


# Note:
I used "Admin" and "User" for the authorization part. where certain routes are only access and modified by persons with "Admin" roles.
Also, for all error handling, I created a separate file that handles and format all errors.
