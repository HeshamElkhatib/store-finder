export class GeoInfo{
    lng: number;
    lat: number;
    distance: number;
}

export class ContactInfo{

}

export class OpenningHour{
    date: string;
    weekday: string;
    openTime: string;
    closeTime: string;
    extraTime: string;
    openTimeType: string;
    closeTimeType: string;
}

export class LocalStore{
    id: string;
    customId: string;
    name: string;
    description: string;
    starRating: string;
    geoInfo: GeoInfo;
    contactInfo: ContactInfo;
    openningHours: Array<OpenningHour>;
}

