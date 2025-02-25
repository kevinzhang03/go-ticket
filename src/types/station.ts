export interface Station {
  corridor: string;
  name: string;
  code: string;
  location: string;
  coordinates: string;
  platforms: number;
  parking: number;
  fareZone: string | number;
  openingYear: number;
}

export interface CSVRow {
  Corridor: string;
  Station: string;
  Code: string;
  Location: string;
  Coordinates: string;
  Platforms: string;
  Parking: string;
  'Fare zone': string | number;
  'Opening year': string;
}
