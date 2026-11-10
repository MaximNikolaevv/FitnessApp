import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveData(key, value) {
  await AsyncStorage.setItem(key, value);
}

export async function getData(key) {
  return await AsyncStorage.getItem(key);
}

export async function removeData(key) {
  await AsyncStorage.removeItem(key);
}
