export default interface SearchRequest extends AllSearchRequest {
    search?: string;
  }
  
  export interface MenuSearchRequest extends SearchRequest {
    email?: string;
  }
  
  export interface AllSearchRequest extends Pagination {
    isFeatured?: boolean;
  }
  
  export interface Pagination {
    page?: number;
    size?: number;
  }
  
  export interface ChefSearchRequest extends SearchRequest {
    location?: Location;
    postalCode?: string;
    radius?: number;
    cuisines?: Array<string>;
  }
  
  export interface Location{
    lat: number;
    lon: number;
  }
  
  