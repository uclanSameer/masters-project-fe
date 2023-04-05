

export class GeneralUtils {

    private constructor() {
        throw new Error('GeneralUtils is a static class and cannot be instantiated');
    }

    public static validateUKPostalCode(postalCode: string): boolean {
        const ukPostalCodePattern = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? [0-9][A-Za-z]{2}|GIR 0AA)$/;
        return ukPostalCodePattern.test(postalCode);
    }
}