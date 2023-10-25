export const getAppVersion = ((): number => {
  const key = 'pizza';
  const savedVersion = localStorage.getItem(key);

  const version: number = savedVersion === null
    ? Math.floor(Math.random() * 5) 
    : Number(savedVersion);

  localStorage.setItem(key, String(version));
  
  return version;
});
