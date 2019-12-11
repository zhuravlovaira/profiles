import * as moment from 'moment';

export class DateHelper {
  static formatDate(value?: string): string {
    const date = value ? moment(new Date(value)) : moment();
    return date.format('YYYY-MM-DD');
  }
}
