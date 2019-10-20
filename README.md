# PleoMobileChallenge
a Challenge from the Pleo team
## Project Description
This is a Challenge project defined [here](https://github.com/pleo-io/mobile-challenge). As the challege wanted, This is a brown field app which the native part is
implemented by Swift (no Android yet). Though there is already a libray for taking picture with the camera, The decision was to
create one with Swift(& connecting to react native side).
### Running Project
1. run the [api](https://github.com/pleo-io/mobile-challenge/tree/master/api).
2. clone the project & `cd PleoMobileChallenge`
3. `yarn install` or `npm install`
4. `react-native run-ios`
### Important Note
Since the camera is not working in an Ios simulator, you will have to test this functionality on a real device. The server route
is `localhost` by default, But if you want to test it in a real device you should change `localhost` to the ip of your system.
to do so:
1. edit the file in `/ios/URLS.swift`
2. edit the file in `/src/config/api/routes.ts`