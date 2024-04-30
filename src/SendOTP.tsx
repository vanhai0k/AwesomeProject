import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';

const SendOTP = () => {
  const firstTextInput = useRef(null);
  const secondTextInput = useRef(null);
  const thirdTextInput = useRef(null);
  const fourthTextInput = useRef(null);
  const [isFilled, setIsFilled] = useState(false);

  const [minutes, setminutes] = useState(0);
  const [seconds, setseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [resendColor, setResendColor] = useState('green');

  useEffect(() => {
    const interva = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interva);
          setResendColor('#3C8BD3'); // Khi thời gian dừng, đổi màu thành đỏ
          setIsRunning(false);
          return;
        } else {
          setminutes(prevMinutes => prevMinutes - 1);
          setseconds(59);
        }
      } else {
        setseconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);
    return () => clearInterval(interva);
  }, [minutes, seconds]);

  const handleRestart = () => {
  const totalSeconds = 180; 
  const minutes = Math.floor(totalSeconds / 60); 
  const seconds = totalSeconds % 60; 
    setminutes(minutes);
    setseconds(seconds);
    setIsRunning(true);
    setResendColor('#2DAF72');
  };
  const handleResendPress = () => {
    if (!isRunning) {
      handleRestart();
    }
  };

  const handleKeyPress = (e, ref) => {
    const key = e.nativeEvent.key;
    if (key === 'Backspace') {
      const prevRef = getPreviousRef(ref);
      if (prevRef) {
        e.preventDefault();
        prevRef.current.focus();
      }
    }
  };

  const getPreviousRef = ref => {
    if (ref === fourthTextInput && thirdTextInput.current) {
      return thirdTextInput;
    } else if (ref === thirdTextInput && secondTextInput.current) {
      return secondTextInput;
    } else if (ref === secondTextInput && firstTextInput.current) {
      return firstTextInput;
    } else {
      return null;
    }
  };

  const handleInputChange = (text, ref) => {
    if (text.length === 1) {
      const nextRef = getNextRef(ref);
      if (nextRef) {
        nextRef.current.focus();
      }
    } else if (text.length === 0) {
      ref.current.focus();
    }

    checkInputsFilled();
  };

  const checkInputsFilled = () => {
    const firstValue = firstTextInput.current?.value || '';
    const secondValue = secondTextInput.current?.value || '';
    const thirdValue = thirdTextInput.current?.value || '';
    const fourthValue = fourthTextInput.current?.value || '';

    setIsFilled(firstValue && secondValue && thirdValue && fourthValue);
  };

  const getNextRef = ref => {
    if (ref === firstTextInput) {
      return secondTextInput;
    } else if (ref === secondTextInput) {
      return thirdTextInput;
    } else if (ref === thirdTextInput) {
      return fourthTextInput;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgBack}
        source={require('../assets/backblack.png')}
      />
      <Text style={styles.textTitle}>Authorize payment</Text>
      <View style={{marginTop: 20, marginLeft: 20}}>
        <Text style={styles.fs12}>We've send a 4 digit code sent to your</Text>
        <Text style={styles.fs12}>
          ******78910 number. Please enter to continue.
        </Text>
      </View>
      <View style={[styles.numberSend, {justifyContent: 'space-between'}]}>
        <TextInput
          ref={firstTextInput}
          style={[styles.textInput, {flex: 1, marginRight: 13}]}
          keyboardType="numeric"
          maxLength={1}
          returnKeyType="next"
          onKeyPress={e => handleKeyPress(e, firstTextInput)}
          onChangeText={text => handleInputChange(text, firstTextInput)}
        />
        <TextInput
          ref={secondTextInput}
          style={[styles.textInput, {flex: 1, marginRight: 13}]}
          keyboardType="numeric"
          maxLength={1}
          returnKeyType="next"
          onKeyPress={e => handleKeyPress(e, secondTextInput)}
          onChangeText={text => handleInputChange(text, secondTextInput)}
        />
        <TextInput
          ref={thirdTextInput}
          style={[styles.textInput, {flex: 1, marginRight: 13}]}
          keyboardType="numeric"
          maxLength={1}
          returnKeyType="next"
          onKeyPress={e => handleKeyPress(e, thirdTextInput)}
          onChangeText={text => handleInputChange(text, thirdTextInput)}
        />
        <TextInput
          ref={fourthTextInput}
          style={[styles.textInput, {flex: 1, marginRight: 13}]}
          keyboardType="numeric"
          maxLength={1}
          returnKeyType="next"
          onKeyPress={e => handleKeyPress(e, fourthTextInput)}
          onChangeText={text => handleInputChange(text, fourthTextInput)}
        />
      </View>

      <View style={styles.paysend}>
        <TouchableOpacity>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 14,
              marginTop: 17,
            }}>
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            width: 200,
            height: 17,
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: 'black', fontSize: 14}}>
            Didn't receive a code?{' '}
          </Text>
          <TouchableOpacity onPress={handleResendPress}>
            <Text style={{color: resendColor, fontWeight: 'bold'}}>Resend</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: 200,
            height: 17,
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text style={{color: 'black', fontSize: 14}}>
            Send verification code again in{' '}
          </Text>
          <Text style={{fontSize: 14, color: '#DCA532'}}>
            {isRunning
              ? `${minutes < 10 ? '0' : ''}${minutes}:${
                  seconds < 10 ? '0' : ''
                }${seconds}`
              : '00:00'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SendOTP;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  imgBack: {
    width: 25,
    height: 25,
    marginTop: 55,
    marginLeft: 16,
    padding: 9,
  },
  textTitle: {
    marginLeft: 20,
    marginTop: 24,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  fs12: {
    fontSize: 12,
  },
  numberSend: {
    marginTop: 40,
    width: 216,
    height: 47,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 0.5,
    width: 40,
    textAlign: 'center',
  },
  paysend: {
    width: 331,
    height: 56,
    backgroundColor: '#599DFA',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 32,
  },
});
