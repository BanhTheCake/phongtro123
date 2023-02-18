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
