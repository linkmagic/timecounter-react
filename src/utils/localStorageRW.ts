export const saveAllDataToLS = (data: any) => {
  window.localStorage.setItem('list', JSON.stringify(data));
}

export const loadAllDataFromLS = () => {
  const value = window.localStorage.getItem('list');
  return value ? JSON.parse(value) : [];
}
