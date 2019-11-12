import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as AppAuth from 'expo-app-auth'

const clientId = '178da730-71ac-4c0e-abd8-88198e611464';
const tenant = 'c33ab553-2e68-41d1-ad68-908d502a6da5'
const redirectUrl = 'host.exp.exponent://oauthredirect';

async function doLogin(setResponse) {

  try {
    const response = await AppAuth.authAsync({
      clientId,
      issuer: `https://login.microsoftonline.com/${tenant}`,
      redirectUrl: redirectUrl,
    })

    setResponse(response)
  } catch (e) {
    setResponse({
      message: e.message
    })
  }
}

export default function App() {

  const [response, setResponse] = useState({msg: 'initial state'})

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => doLogin(setResponse)}>
        <Text>Login</Text>
      </TouchableOpacity>
      <View>
        <Text>{JSON.stringify(response)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
