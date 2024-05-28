// ExtendedAdapterDayjs.ts
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { jpFormat } from './dayjsJpFormat';

// jpFormatプラグインをdayjsに拡張
dayjs.extend(jpFormat);

class ExtendedAdapterDayjs extends AdapterDayjs {
  private yearLabel = 'rrrr年';
  private monthYearLabelJa = 'rrrr年M月';
  private monthYearA11yLabel = 'rrrr年M月';
  private dateInput = 'rrrr年M月D日';

  constructor(props?: any) {
    super(props);
  }

  private isJa(): boolean {
    return this.locale?.toLowerCase().startsWith('ja') ?? false;
  }

  format(date: any, displayFormat: string): string {
    if (this.isJa()) {
      switch (displayFormat) {
        case 'monthYearLabel':
          return date.format(this.monthYearLabelJa);
        case 'monthYearA11yLabel':
          return date.format(this.monthYearA11yLabel);
        case 'dateInput':
          return date.format(this.dateInput);
        default:
          return date.format(displayFormat);
      }
    }
    return date.format(displayFormat);
  }

  parse(value: string, parseFormat: string | string[]): any {
    if (this.isJa() && typeof parseFormat === 'string') {
      return dayjs(value, this.dateInput);
    }
    return dayjs(value, parseFormat);
  }

  getYearName(date: any): string {
    if (this.isJa()) {
      return date.format(this.yearLabel);
    }
    return date.format('YYYY');
  }

  getDateNames(): string[] {
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    if (this.isJa()) {
      return days.map(day => `${day}日`);
    }
    return days;
  }
}

// 使用例
const adapter = new ExtendedAdapterDayjs({ locale: 'ja' });
const date = dayjs('2024-12-28');
console.log(adapter.format(date, 'dateInput'));  // 和暦表示の例
console.log(adapter.getYearName(date));          // 和暦の年表示の例
console.log(adapter.getDateNames());             // 和暦の日付表示の例

export default ExtendedAdapterDayjs;
