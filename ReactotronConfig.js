import Reactotron from "reactotron-react-native";

Reactotron.configure({ host: "10.176.13.143" }).useReactNative().connect();

console.tron = Reactotron;
