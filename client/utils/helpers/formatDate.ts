import moment from 'moment';

const formatDate = (inputDate: string | Date) => {
    const date = moment(inputDate);
    const now = moment();
    const diff = now.diff(date, 'days');

    let displayDate = '';
    if (diff === 0) {
        displayDate = 'Hôm nay';
    } else if (diff === 1) {
        displayDate = '1 ngày trước';
    } else {
        displayDate = `${diff} ngày trước`;
    }
    return displayDate;
};

export default formatDate;
