# Tic-Tac-Toe

The below problems are to allow us a glimpse into your problem solving ability, style and current skill set. Please do problem 1, and optionally problem 2 or 3 depending on where you are most comfortable. We expect this test to take 2-3 hours, if you find yourself spending more than this do not aim to solve all 3 problems! We will not be judging based on number of problems completed only the style and thought process.

## Problems

### Problem 1

We have started a basic game of Tic-Tac-Toe as outlined [here](https://en.wikipedia.org/wiki/Tic-tac-toe) but we don't have anyone good enough to code to finish it!

- Please implement a complete basic game of Tic-Tac-Toe
- Please use React and TypeScript throughout, if you know TailwindCSS please expand on what is already provided, otherwise it is fine to use raw styling
- Both players will play out of the same application, it is sufficient to just switch the current player each time a move is played
- Once a game is completed, I should be able to start another game

### Problem 2

We are bored with the basic game now, can you make it so the board can be scaled to any size?

- Add some kind of input which allows me to change the board size
- The board size should be a number between 3 and 15

### Problem 3

We want to store game results in a database.

- create a simple backend server (using a simple generator provided by your IDE is fine)
- use any SQL/noSQL database to store the results
- return simple stats back to the front-end: number of win/losses for each player.

Simplification for the task:

- do not use database migration tools, just an SQL or other script to create tables is fine
- add comments about what you were thinking about but didn’t implement because of restrictions
- host the project on your local machine, optional hosting in a public place is fine
- optionally create a Dockerfile to build both back-end and front-end. Do not create any deployment scripts, if it's not necessary.
- optional tests are welcome

## Quickstart

### Docker

- Make sure you have **docker** installed.

A Mongo database is provided in a Docker container.

To start it, in the root run:

- `docker compose up -d`

This will start the containers. Run `docker compose ps` to confirm if desired.

### Server

- Make sure you have **node** installed

With Docker now running, start the backend server.

- `cd server`
- `npx tsx index.ts`

This will do two things:

- Scaffold the initial results collection with `initDatabase()`
- Provide two endpoints:
  - `http://localhost:3000/score` - to `GET` the latest game results.
  - `http://localhost:3000/update-scores` - to `POST` results to.

### Client

- Make sure you have **node** installed

- `cd client`
- `npm i`
- `npm start`

## Notes / Talking Points

I opted to tackle Options 1 and 2, as my background is predominantly React.

After finishing 1 and 2, I had a go at Option 3. See **Option 3** notes below.

### State

I've used context and `useContext` to consume and update a "global" state between components.

I guess this is an approach that does have scalability limits on larger apps (where a Redux-y implementation could be more appropriate), but here it feels like a good fit.

### Structure

My inital thought process / approach is to try and break an app into components, to make them easier to combine and maintain in the long run, which I've done in `/src/components`.

### Components

`<BoardSelect />` allows the players to select a board size.

On change of the `<select>` within it, it updates the app context with a new `maxRows` value.

`<Game />` is where most of the logic is held and it keeps track of:

- The array(s) to pass into the board
- The current player
- The result of a game (X, O, Draw)
- Resetting the board state

If the app was expanded, some of the state in `<Game />` could be lifted into the app context, I've just kept it "as low as possible" for now.

The checking of results is influenced by having done a similar task in the past with vanilla JS.

I'm aware that the React docs have a [tic-tac-toe](https://react.dev/learn/tutorial-tic-tac-toe) tutorial - but I didn't feel it appropriate to copy it and try and change it to make it look like my own work 😅

`<Board />` accepts an array of arrays to render the board, and a function passed from it's parent to run when each button is clicked.

### Styles

I added a couple more styles for a bit of alignment, spacing and backgrounds with Tailwind.

### Improvements

Some UI improvements that could be made:

- Potentially separate the select and game stages (as changing the board size immediately wipes the state of play)
- Highlight the row/column/diagonal with the winning play

### Option 3

It has been a while since I'd done anything with Docker in earnest, so I thought I would give it a go!

I used the `mongo` docker image to host a Mongo database. I've only had light touches of Mongo (having done a little bit more with Firebase) - and at TravelLocal we had Postgres databases running in Docker containers.

I then added a Node server in `/server`, to provide endpoints for the frontend to hit in order to get scores and update them when games finish.

The data fetching is done by the app context. I moved the `setResult` out of `<Game />` up to the context, so I can trigger a fetch from `appContext` when it's updated.

- On load, the latest scores are fetched
- Then, when a `result` is updated, we post the scores to the API, then fetch
  - I could consider returning the latest scores on success of the POST
- `<Sidebar />` then renders the scores

| Get Scores                           | Update Scores                             |
| ------------------------------------ | ----------------------------------------- |
| ![Get Scores](/images/getScores.png) | ![UpdateScores](/images/updateScores.png) |
