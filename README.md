# Tennis ScoreBoard

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The app has following features

- `Game clock`
- `Real time` update messages regarding the game
- `Real time` Point info
- `Real time` Set info

## Project Structure

The Project is composed of following folders

- `components`: This has the React components
- `util`: This has the utility functions
- `hooks`: This has the custom React hook to connect to Websocket and return state variables needed on the screen
- `types`: This has the types used in the project

## Error Handling

- Websocket connection error is handled by the `onError` event handler
- React tree rendering error will be caught by `ErrorBoundary` component

## Tests

Tests has been written using `@testing-library/react`

- Tests for the util functions
- Test for the App [Mocks for websocket can be found at `__mocks__`]
- Test for the individual component

## Scripts

- Start the app with `npm start`
- Test the app with `npm run test`
- Format the code with `npm run format`
