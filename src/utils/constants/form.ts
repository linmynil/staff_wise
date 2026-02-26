export const statusOptions = [
  { value: 1, label: 'Active' },
  { value: 2, label: 'Inactive' },
];

export const statusOptionsFilter = [
  {
    value: '_',
    label: 'All',
  },
  {
    value: 'true',
    label: 'Active',
  },
  {
    value: 'false',
    label: 'Inactive',
  },
];
export const carryOverOptions = [
  {
    value: 'true',
    label: 'Yes',
  },
  {
    value: 'false',
    label: 'No',
  },
];

const currentYear = new Date().getFullYear();
const startYear = 1990;
const endYear = currentYear + 10;

export const yearsOptions = [
  ...Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = endYear - index;
    return {
      value: year.toString(),
      label: year.toString(),
    };
  }),
];
