export class GeoInfo{
    lng: number;
    lat: number;
    distance: number;
}

export class ContactInfo{

}

export class OpeningHour{
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
    starRating: number;
    geoInfo: GeoInfo;
    contactInfo: ContactInfo;
    openingHours: Array<OpeningHour>;
}

