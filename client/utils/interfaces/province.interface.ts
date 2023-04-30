export interface IGetAllProvince {
    code: string;
    value: string;
}

export interface IGetTotalProvince {
    province_id: string;
    province_name: string;
    province_type: string;
}

export interface IGetCurrentDistrict {
    district_id: string;
    district_name: string;
    district_type: string;
    province_id: string;
}

export interface IGetCoordinate {
    latitude: number;
    longitude: number;
    type: string;
    name: string;
    confidence: number;
    region: string;
    region_code: string;
    county: string;
    locality: string;
    country: string;
    country_code: string;
    continent: string;
    label: string;
}
