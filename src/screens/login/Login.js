import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import Button from '../../components/Button';
import { GreenColor } from '../../constants/colors';

const Input = props => (
  <View style={styles.inputWrapper}>
    <View style={styles.inputIconWrapper}>
      <Image
        style={styles.inputIcon}
        source={props.inputIcon}
      />
    </View>
    <TextInput
      {...props}
      style={{ ...styles.input }}
      placeholderTextColor="#aaa"
    />
    {props.textContentType === "password" && (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={props.onShowPasswordPress}
        style={styles.rightIconWrapper}
      >
        <Image
          style={styles.rightIcon}
          source={props.rightIcon}
        />
      </TouchableOpacity>
    )}
  </View>
)

export default Login = props => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={{ uri: "https://banner2.kisspng.com/20181128/baf/kisspng-logo-product-inspection-brand-trademark-5bfe7e51ed3301.3615299315434051379716.jpg" }}
      />
      <Input
        value={email}
        placeholder="Email"
        textContentType="emailAddress"
        onChangeText={(e) => setEmail(e)}
        inputIcon={require('../../assets/login/email.png')}
      />
      <Input
        value={password}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={showPassword}
        onChangeText={(e) => setPassword(e)}
        onShowPasswordPress={() => setShowPassword(!showPassword)}
        inputIcon={require('../../assets/login/locked.png')}
        rightIcon={
          showPassword ?
            require('../../assets/login/eye.png') :
            require('../../assets/login/visibility.png')
        }
      />
      <TouchableOpacity
        activeOpacity={.8}
        style={styles.forgotPasswordWrapper}
      >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button
        text="Login"
        onPress={() => props.navigation.navigate('MainScreen')}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '6%',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
  },
  inputWrapper: {
    width: '100%',
    borderRadius: 3,
    marginBottom: 15,
    paddingVertical: 7,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    fontSize: 16,
    color: GreenColor,
    paddingLeft: 12,
  },
  inputIcon: {
    width: 17,
    height: 17
  },
  inputIconWrapper: {
    padding: 7,
    borderRadius: 3,
    backgroundColor: '#f5f5f5',
  },
  forgotPasswordWrapper: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPassword: {
    textAlign: 'right',
    color: GreenColor,
  },
  rightIconWrapper: {
    padding: 7,
  },
  rightIcon: {
    width: 22,
    height: 22,
  }
})
