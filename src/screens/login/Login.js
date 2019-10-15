import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from 'react-navigation-hooks';
import SplashScreen from 'react-native-splash-screen'

import Button from '../../components/Button';
import store from '../../redux/store/store';

import { GreenColor, RedColor, OfficialColor, WhiteColor, GreyColor } from '../../constants/colors';
import { validateEmail } from '../../constants/functions';
import { FIREBASE_AUTH, FIRESTORE } from '../../constants/constant';
import { uid, user, getAllForms } from '../../redux/actions/actions';

const Input = props => (
  <>
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
    {props.error !== "" && <Text style={styles.error}>{props.error}</Text>}
  </>
)

export default Login = () => {
  const { navigate } = useNavigation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const validate = () => {
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address");
    }
    if (password.trim().length < 5) {
      setPasswordError("Password should be minimum 6 characters");
    }
    else {
      setLoader(true);
      signin();
    }
  }

  const signin = async () => {
    try {
      const { user } = await FIREBASE_AUTH.signInWithEmailAndPassword(email, password);
      await FIRESTORE.collection('users').doc(user.uid).set({
        email,
        password,
      })
      setLoader(false);
    }
    catch (err) {
      if (err.code === "auth/user-not-found") {
        setPasswordError(`There is no user found who use this email`);
      }
      if (err.code === "auth/wrong-password") {
        setPasswordError(err.message);
      }
      console.log(err, ' error in signin')
      setLoader(false);
    }
  }

  useEffect(() => {
    checkSession();
    SplashScreen.hide();

  }, [])

  const checkSession = () => {
    FIREBASE_AUTH.onAuthStateChanged(auth => {
      if (auth) {
        store.dispatch(uid(auth.uid));
        store.dispatch(user({
          email: auth.email,
        }));
        store.dispatch(getAllForms(auth.uid));
        navigate('Home');
      } else {
        setIsLoading(true);
      }
    })
  }


  return (
    isLoading && (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../assets/logo.png')}
        />
        <Input
          value={email}
          error={emailError}
          placeholder="Email"
          textContentType="emailAddress"
          onChangeText={(e) => {
            setEmail(e);
            setEmailError("");
          }}
          inputIcon={require('../../assets/email.png')}
        />
        <Input
          value={password}
          error={passwordError}
          placeholder="Password"
          textContentType="password"
          secureTextEntry={showPassword}
          onChangeText={(e) => {
            setPassword(e);
            setPasswordError("");
          }}
          onShowPasswordPress={() => setShowPassword(!showPassword)}
          inputIcon={require('../../assets/locked.png')}
          rightIcon={
            showPassword ?
              require('../../assets/eye.png') :
              require('../../assets/visibility.png')
          }
        />
        <TouchableOpacity
          activeOpacity={.8}
          style={styles.forgotPasswordWrapper}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {loader ?
          <View>
            <ActivityIndicator size="large" color={GreenColor} />
          </View>
          :
          <Button
            text="Login"
            onPress={validate}
          />}
      </ScrollView>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '6%',
    backgroundColor: OfficialColor,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  inputWrapper: {
    width: '100%',
    marginTop: 15,
    borderRadius: 3,
    paddingVertical: 7,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: WhiteColor,
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
    backgroundColor: GreyColor,
  },
  forgotPasswordWrapper: {
    alignSelf: 'flex-end',
    marginBottom: 30,
    marginTop: 10,
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
  },
  error: {
    fontSize: 13,
    marginTop: 10,
    color: RedColor,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
})
