export type ServerSideContext = {
    req: {
        headers: {
            cookie: string;
        };
    };
    res: any;
};


export interface UpdateDeliveryRequest {
    orderNumber: string;
    emailOfDeliveryPerson: string;    
}