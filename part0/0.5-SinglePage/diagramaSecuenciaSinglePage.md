```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa, payload: { "content": "testing...", "date": "2024-04-24..." }
    activate server
    server-->>browser: JSON file with {"message":"note created"}
    deactivate server

    Note right of browser: The browser executes the callback function

    Note right of browser: The browser read the response of the server and renders the notes

```
