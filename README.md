# the-witcher-bestiary-api

DEVELOP ENV: http://localhost:8080/api/
PRODUCTION ENV: https://the-witcher-bestiary.herokuapp.com/api/

Methods:
    For ALL

    url: {{env}}
    description: Obtains all elements in the DataBase.
    type: GET
    response 👍: 200 OK
    response 👎: 
        Common errors: 
            404 Not Found / 500 Internal Server Error

    For CREATURES

    url: {{env}}creatures/
    description: Obtains all creatures by offset and limit query params.
    type: GET
    response 👍: 200 OK
    response 👎: 
        Common errors: 
            404 Not Found / 500 Internal Server Error

    url: {{env}}creatures/search/by-id/:id
    description: Obtains an specific creatures by its id.
    type: GET
    response 👍: 200 OK
    response 👎: 
        Specific case:
            400 Bad Request
            Displays an error msg and where the validation is failing at
        Common errors: 
            500 Internal Server Error

    url: {{env}}creatures/search/by-name/:creatureName
    description: Obtains an specific creatures by its alt_name or creature_name.
    type: GET
    response 👍: 200 OK
    response 👎: 
        Specific case:
            400 Bad Request
            Displays an error msg and where the validation is failing at
        Common errors: 
            500 Internal Server Error

    url: {{env}}creatures/search/by-name/:creatureName
    description: Obtains an specific creatures by its alt_name or creature_name.
    type: GET
    response 👍: 200 OK
    response 👎: 
        Specific case:
            400 Bad Request
            Displays an error msg and where the validation is failing at
        Common errors: 
            500 Internal Server Error