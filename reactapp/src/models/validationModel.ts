export type ValidationModel<T> = {
    [K in keyof T]: string;
};