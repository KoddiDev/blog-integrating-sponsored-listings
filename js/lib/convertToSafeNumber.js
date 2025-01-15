export function convertToNumber(value) {
    if (typeof value === 'number') {
        return value;
    }

    return Number.parseFloat(value);
}

export function convertToNumberWithDefault(value, defaultValue = 0) {
    let number = convertToNumber(value);
    if (Number.isNaN(number)) {
        return defaultValue;
    } else {
        return number;
    }
}
