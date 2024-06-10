import React, { useState } from 'react';
import { LocalizationProvider, DatePicker, PickersDayProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ja';
import { PickersDay, pickersDayClasses } from '@mui/x-date-pickers';

dayjs.locale('ja');

const convertToJapaneseEra = (date: Dayjs): string => {
  const year = date.year();
  let eraYear;
  let era;
  if (year >= 2019) {
    eraYear = year - 2018;
    era = '令和';
  } else if (year >= 1989) {
    eraYear = year - 1988;
    era = '平成';
  } else if (year >= 1926) {
    eraYear = year - 1925;
    era = '昭和';
  } else if (year >= 1912) {
    eraYear = year - 1911;
    era = '大正';
  } else {
    eraYear = year - 1867;
    era = '明治';
  }
  return `${era}${eraYear}年 / ${year}年${date.format('MM月DD日')}`;
};

const JapaneseDatePicker: React.FC = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="和暦日付ピッカー"
        value={value}
        onChange={(newValue: Dayjs | null) => setValue(newValue)}
        slotProps={{ textField: { variant: 'outlined' } }}
        views={['year', 'month', 'day']}
        slots={{ day: CustomDay }}
        format={convertToJapaneseEra(value!)}
        sx={{ width: '100%' }}
      />
    </LocalizationProvider>
  );
};

export default JapaneseDatePicker;

const CustomDay: React.FC<PickersDayProps<Dayjs>> = (props) => {
    return (
      <PickersDay
        {...props}
        sx={{
          [`&.${pickersDayClasses.selected}`]: {
            backgroundColor: 'blue',
          },
        }}
      />
    );
  };