'use client'

import { Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { jpFormat } from 'dayjs-jp-format';
import 'dayjs/locale/ja';
import { useState } from 'react';
import DayjsDateAdapter from './DayjsDateAdapter';
  dayjs.extend(jpFormat)

export default function WarekiDatePicker() {
  const [value, setValue] = useState<Dayjs>(dayjs())
  DayjsDateAdapter
  
  return (
    <><LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <DemoContainer components={['DatePicker']}>
        <DatePicker  format="YYYY年M月D日" value={value} onChange={(newValue) => newValue && setValue(newValue)}/>
      </DemoContainer>
    </LocalizationProvider>
    <Typography>{value.format("rrrr年M月D日").toString()}</Typography>
    </>
  );
}