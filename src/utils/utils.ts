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
    YYYYMMDD_HHMM_KR: 'YYYY년 MM월 DD일 HH:mm',
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

export const getUser = () => {
    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) return;
    const authInfo = JSON.parse(authStorage);

    if (authInfo.state.isLogin === false) {
        return false;
    } else {
        const {
            state: { user },
        } = authInfo;
        return user;
    }
};

export const createProfileImageSrc = (src: string) => {
    const checkURL = /^http[s]?:\/\/([\S]{3,})/i;
    const isURL = checkURL.test(src);

    if (isURL) {
        return src;
    } else {
        const srcArray = src.split('\\profile\\');
        const fileanme = srcArray[1];
        const imgSrc = `${import.meta.env.VITE_API_URL}/images/${fileanme}?path=profile`;
        return imgSrc;
    }
};
