export interface Response<T> {
    timestamp: string;
    success:   boolean;
    message:   string;
    data:      T;
}