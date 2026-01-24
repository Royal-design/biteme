import Constants from "expo-constants";
import Reactotron from "reactotron-react-native";

let host = "localhost";

// Detect Android and use dev server IP automatically
if (Constants.platform?.android) {
  const debuggerIp = Constants.expoConfig?.hostUri?.split(":")[0];

  if (debuggerIp) {
    host = debuggerIp;
  }
}

Reactotron.configure({ host, name: "biteme" }).useReactNative().connect();

console.tron = Reactotron;
