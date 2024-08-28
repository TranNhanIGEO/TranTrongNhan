class NumberHelper {
  static toDecimalString = (value: string | number | undefined): string => {
    if (!value) return "0";

    let [integerPart, decimalPart] = value.toString().split('.');

    integerPart = integerPart.replace(/[^\d]/g, '');
    if (integerPart) integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
  };
  
  static toDecimalNumber = (value: string): number => {
    return parseFloat(value.replace(/,/g, ""))
  }
}

export default NumberHelper;