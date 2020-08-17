export const Leisure = 'fas fa-beer';
export const Food = 'fas fa-utensils';
export const Groceries = 'fas fa-shopping-cart';
export const Transportation = 'fas fa-car';
export const Rent = 'fas fa-hand-holding-usd';
export const Education = 'fas fa-graduation-cap';
export const Business = 'fas fa-briefcase';
export const Other = 'fas fa-question';
export const Salary = 'fas fa-money-check-alt';

export const IconSelector = classification => {
  switch (classification) {
    case 'Leisure':
      return Leisure;
    case 'Food':
      return Food;
    case 'Grocery':
      return Groceries;
    case 'Transportation':
      return Transportation;
    case 'Rent':
      return Rent;
    case 'Education':
      return Education;
    case 'Business':
      return Business;
    case 'Salary':
      return Salary;
    case 'Other':
    default:
      return Other;
  }
};
