import moment from 'moment';
import 'moment-timezone';
import { isNumber, isString } from './assertion';

export const fileReader = (file: File | Blob) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const dataURL = e.target?.result as string;
            if (!dataURL) reject('dataURL is null');
            resolve(dataURL);
        };
        reader.readAsDataURL(file);
    });
};

export const getRandomAvatar = () => {
    const seed = Math.random().toString();
    const options = `seed=${seed}`;
    const defaultImage = encodeURIComponent(`https://api.dicebear.com/8.x/lorelei/png/${options}`);
    const randomAvatar = `https://www.gravatar.com/avatar/${seed}?d=${defaultImage}`;
    return randomAvatar;
};

export const FORMAT = {
    YYYYMMDD_KR: 'YYYY년 MM월 DD일',
    YYYYMMDD: 'YYYY-MM-DD',
    YYYYMMDD_HHMMSS: 'YYYY-MM-DD HH:mm:ss',
    YYYYMMDD_HHMM: 'YYYY-MM-DD HH:mm',
};

export const dateFormat = (date?: number | string | Date | null, key = FORMAT.YYYYMMDD_HHMM, format = '-') => {
    if (!date) {
        return format;
    }

    const time = isString(date) ? moment(date).toDate() : isNumber(date) ? new Date(date) : date;
    const mom = moment(time);
    if (mom.isValid()) {
        return mom.format(key);
    }
    return format;
};

export const dateConvert = (date?: number | string | Date | null, format = FORMAT.YYYYMMDD_HHMM) => {
    if (!date) {
        return null;
    }

    const _date = moment(date).tz('Asia/Seoul').format(format);
    return _date;
};
