import React, {useContext, useState} from 'react';
import { StyleSheet } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Context} from "./data/Provider";

LocaleConfig.locales.br = {
  monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
  monthNamesShort: ["Jan.","Fev.","Mar","Abr","Mai","Jun","Jul.","Ago","Set.","Out.","Nov.","Dez."],
  dayNames: ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};

LocaleConfig.defaultLocale = "br";

const Calendario = () => {
  const [selected, setSelected] = useState('');
  const {setDataSelec} = useContext(Context);

  return (
    <Calendar style={styles.container}
      onDayPress={day => {
        setSelected(day.dateString);
        setDataSelec(day.dateString)
        console.log(day.dateString)
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true}
      }}
    />
  );
};

const styles = StyleSheet.create({
  container:{
    height:350,
    width:350
  }
});

export default Calendario;