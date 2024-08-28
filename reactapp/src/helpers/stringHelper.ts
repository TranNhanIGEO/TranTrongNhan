class StringHelper {
  // Converts the first letter of each word to uppercase
  static capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  // Converts the first letter of the string to uppercase
  static capitalizeFirst = (str: string) => {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Converts a string to unsign case
  static toUnsignCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
      .replace(/\u02C6|\u0306|\u031B/g, '');
  };

  // Converts a string to kebab-case
  static toKebabCase = (str: string) => {
    return str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]+|[0-9]+/g)
      ?.map(x => x.toLowerCase())
      ?.join('-');
  };

  // Converts a string to snake_case
  static toSnakeCase = (str: string) => {
    return str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]+|[0-9]+/g)
      ?.map(x => x.toLowerCase())
      ?.join('_');
  };

  // Converts a string to camelCase
  static toCamelCase = (str: string) => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  };

  // Converts a string to PascalCase
  static toPascalCase = (str: string) => {
    return str.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2).replace(/[^a-zA-Z0-9]/g, '');
  };

  // Converts a params string to object
  static toObject = (queryParams: URLSearchParams) => {
    const queryObject: any = {};
    queryParams.forEach((value, key) => {
      queryObject[key] = value;
    });
    return queryObject;
  };

  // Converts a object to params string
  static toParams = (obj: any) => {
    const queryParams: URLSearchParams = new URLSearchParams();
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, v)); 
      } else {
        queryParams.set(key, value);
      }
    });
    return queryParams;
  };

  // Converts a string to a status class
  static toClassName = (str: string) => {
    switch (str) {
      case 'Low':
        return 'badge rounded-pill bg-danger';
      case 'Medium':
        return 'badge rounded-pill bg-warning';
      case 'High':
        return 'badge rounded-pill bg-success';
      default:
        return '';
    }
  };

  // Converts a string to a match string array
  static toMatchStringArray = (str: string, content: string): string[] => {
    const startAt = content.toLowerCase().indexOf(str.toLowerCase());
    const endAt = startAt + str.length;

    const beforeMatch = content.substring(0, startAt);
    const match = content.substring(startAt, endAt);
    const afterMatch = content.substring(endAt, content.length);

    return [beforeMatch, match, afterMatch];
  };

  // Convert a string to direction array
  static toDirectionArray(str: string): { name: string; value: string }[] {
    const pathArr = str.split('/').splice(1);
    const length = pathArr.length;
    const dirArr = [...Array(length).keys()].map(key => {
      const pathChild = pathArr[key];
      const idx = str.indexOf(pathArr[key]);
      const value = str.substring(0, idx + pathChild.length);
      const name = this.capitalizeFirst(pathChild);
      return { name, value };
    });
    return dirArr;
  }
}

export default StringHelper;
