# Twitter-Clone-React
Early Twitter clone built with a React (JSX) front end on a Node/Express/HTTPie framework

## October 5, 2018:

(Captain's Log?)

Server-side code base is completeled. Front-end interface built with React is not. Initial commit delayed by package bundler (GitHub support not enabled?)

## October 9, 2018:

Significant trouble uploading packaged app (built with Create React App) to existing GitHub repo. Future projects will have local GitHub instianted prior to creating app.

# Jan 20, 2019:

Node.js backend to handle tokens, authentication, adding and deleting "tweets".
React front end for styling and Redux code

JWT (Json Web Token)
Proof of login and payload protection

Client will send the JWT in an auth header
`Authorization: Bearer <JWT>`

`yarn add express bcrypt body-parser mongoose jsonwebtoken cors`
