export const getAppVersion = () => {
    const key = 'pizza';
    let version = localStorage.getItem(key);
    if ((version === undefined) | (version === null)) {
      version = Math.round(Math.random());
      localStorage.setItem(key, version);
    }
    console.log('App version =', version, '(0-original, 1-without pagination)');
    return version;
  };    