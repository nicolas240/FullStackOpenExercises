```mermaid
sequenceDiagram
    participant browser
    participant server

    Note left of browser: User fill the form, and submit it.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note; payload: "another test"
    activate server
    server-->>browser: Make a new request GET to /exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: the html file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "another test", "date": "2024-04-24" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

    Note left of browser: User can se the new page updated.
```
