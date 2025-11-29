export const removeAccents = (str: string) =>
  str
    ?.normalize('NFD')
    ?.replace(/[\u0300-\u036f]/g, '')
    ?.replace(/đ/g, 'd')
    ?.replace(/Đ/g, 'D');

export const toCurrency = (t?: string | number) => {
  return (t || '')
    .toString()
    .replaceAll(' ', '')
    .replaceAll('.', '')
    .replaceAll(',', '')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

// example input: '2024-07-19T06:01:31.606Z' -> output: '19/07/2024'
export const toDDMMYYYY = (date: string | any) =>
  date?.toString().split('T')[0].split('-').reverse().join('/');

// example input: 'male' -> output: 'Nam'
export const toVietnameseGender = (gender?: string | any) =>
  gender === 'male' ? 'Nam' : 'Nữ';

// example input 'male' -> output: 'M'
export const to_M_or_F_Gender = (gender?: string | any) =>
  gender === 'male' ? 'M' : 'F';

export const convertGender = (gender?: string | any) =>
  gender === 'Nam' ? 'male' : 'female';
