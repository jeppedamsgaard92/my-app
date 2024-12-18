import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// hook to load and save data with AsyncStorage
export function useAsyncStorage<T>(key: string, initialValue: T) {
  const [data, setData] = useState<T>(initialValue);

  // Load data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(key);
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        Alert.alert("Error", `Failed to load data for ${key}.`);
      }
    };
    loadData();
  }, [key]);

  // Save data to AsyncStorage when it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        Alert.alert("Error", `Failed to save data for ${key}.`);
      }
    };
    saveData();
  }, [key, data]);

  return [data, setData] as const; 
}
