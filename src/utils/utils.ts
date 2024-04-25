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
