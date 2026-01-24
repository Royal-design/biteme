import Reactotron from "reactotron-react-native";

Reactotron.configure({
  host: "localhost",
  name: "biteme",
})
  .useReactNative()
  .connect();

console.tron = Reactotron;
