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
