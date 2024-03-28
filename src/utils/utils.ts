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

export const getUserEmail = () => {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
        const authInfo = JSON.parse(authStorage);
        return authInfo.state.user.data.email;
    } else {
        return null;
    }
};
