import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales.br = {
  monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
  monthNamesShort: ["Jan.","Fev.","Mar","Abr","Mai","Jun","Jul.","Ago","Set.","Out.","Nov.","Dez."],
  dayNames: ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};

LocaleConfig.defaultLocale = "br";

const Calendario = () => {
  const [selected, setSelected] = useState('');

  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
        console.log(day.dateString)
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true}
      }}
    />
  );
};

export default Calendario;