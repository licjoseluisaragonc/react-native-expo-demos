import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import sql from 'mssql';

const config = {
  server: process.env.DB_SERVER,
  database:  process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
};

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT * FROM Usuarios WHERE usuario = '${username}' AND password = '${password}'`);
      if (result.recordset.length > 0) {
        Alert.alert('Bienvenido');
      } else {
        Alert.alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Usuario" onChangeText={setUsername} value={username} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default App;
