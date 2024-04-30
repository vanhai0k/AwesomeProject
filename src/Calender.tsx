import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';

const Calender = (props) => {
  const [selected, setSelected] = useState('');

  let dateYear = '2023-01-01';


  const customTheme = {
    selectedDotColor: 'green',
    arrowColor: '#E75F5F',
    monthTextColor: 'black',
    textMonthFontWeight: 'bold',
    textMonthFontSize: 20,
    // textDayFontWeight: 'bold',
    position: 'relative',
    arrowStyle: {
      position: 'absolute',
      height: 30,
      width: 30,
      left: 30,
      top: 10,
    },
    monthText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    //   textDisabledColor: 'red'
  };

  const handleDate = day => {
    const selectDate = moment(day.dateString);
    const currentDate = moment();
    if (selectDate.isSameOrAfter(currentDate, 'day')) {
      setSelected(day.dateString);
    }    
  };

  const today = moment();
  const markedDates = {};
  for (let i = 1; i <= today.date(); i++) {
    const date = today.clone().subtract(i, 'days').format('YYYY-MM-DD');
    markedDates[date] = {marked: true, dotColor: 'blue', textColor: 'blue'};
  }

  const start_date = dateYear;
  let i = 1;
  while (true) {
    const date = today.clone().subtract(i, 'days').format('YYYY-MM-DD');
    markedDates[date] = {marked: true, dotColor: 'blue', textColor: 'blue'};
    i++;
    if (date === start_date) {
      break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image
          style={styles.imgCalendar}
          source={require('../assets/calendar.png')}
        />
        <Text style={styles.text}>Appointment</Text>
      </View>
      <Calendar
        style={styles.calendar}
        onDayPress={handleDate}
        disableAllTouchEventsForDisabledDays={true}
        minDate={moment().format("YYYY-MM-DD")}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
          [moment().format('YYYY-MM-DD')]: {marked: true, dotColor: 'green'},
        //   ...markedDates,
        }}
        customStyles={{
          day: {
            text: {
              color: 'black',
            },
          },
          disabledText: {
            color: 'red',
          },
        }}
        theme={customTheme}
        textSectionTitleTextAlign={'right'}
        renderArrow={direction => (
          <View
            style={{
              width: 30,
              height: 30,
              position: 'absolute',
              left: direction === 'left' ? 10 : 60,
            }}>
            <Image
              source={
                direction === 'left'
                  ? require('../assets/back.png')
                  : require('../assets/next.png')
              }
              style={{
                width: 30,
                height: 30,
                tintColor: '#E75F5F',
                marginLeft: 200,
              }}
            />
          </View>
        )}
      />
      <View style={styles.title}>
        <Text style={styles.health}></Text>
        <Text>Telehealth appointment</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.book}></Text>
        <Text>Fully booked</Text>
      </View>

      <View>
        <TextInput
          placeholder="Ngay ban chon"
          value={selected}
          style={styles.borderWith}
        />
      </View>
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#EBF8EE',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: '20%',
    borderRadius: 13,
  },
  calendar: {
    margin: 17,
    borderRadius: 10,
    position: 'relative',
  },
  title: {
    flexDirection: 'row',
    marginLeft: 18,
    marginTop: 15,
    marginBottom: 10,
  },
  imgCalendar: {
    width: 34,
    height: 34,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 10,
    color: 'black',
  },
  health: {
    width: 13,
    height: 13,
    backgroundColor: '#52AB30',
    borderRadius: 50,
    marginRight: 8,
    alignSelf: 'center',
  },
  book: {
    width: 13,
    height: 13,
    backgroundColor: '#E09733',
    borderRadius: 50,
    marginRight: 8,
    alignSelf: 'center',
  },
  borderWith: {
    width: '60%',
    borderWidth: 0.8,
    borderRadius: 120,
    paddingLeft: 18,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
