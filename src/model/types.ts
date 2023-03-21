export type ServerSideContext = {
    req: {
        headers: {
            cookie: string;
        };
    };
    res: any;
};