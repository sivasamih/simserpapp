import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeSessionData = async (objectKey,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(objectKey, jsonValue)
    } catch (e) {
        console.log("-------> ERROR IN reusables > storeSessionData > e > ", e);
    }
  }


export const getStoredSessionData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('sessionData')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log("-------> ERROR IN reusables > getStoredSessionData > e > ", e);
    }
  }  

  export const getStoredSessionDataBykey = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log("-------> ERROR IN reusables > getStoredSessionDataBykey > e > ", e);
    }
  }  