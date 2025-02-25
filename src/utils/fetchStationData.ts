import { parse } from 'csv-parse/sync';
import { CSVRow } from '@/types/station';

export async function fetchStationData() {
  try {
    const response = await fetch('/data/stations.csv');
    if (!response.ok) throw new Error('Failed to fetch station data');
    const csvText = await response.text();

    // Parse CSV with proper handling of quoted fields
    const stations = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      cast: (value, context) => {
        if (
          context.column === 'Platforms' ||
          context.column === 'Parking' ||
          context.column === 'Opening year'
        ) {
          return parseInt(value, 10);
        }
        return value;
      },
    }).map((row: CSVRow) => ({
      corridor: row.Corridor,
      name: row.Station,
      code: row.Code,
      location: row.Location,
      coordinates: row.Coordinates,
      platforms: row.Platforms,
      parking: row.Parking,
      fareZone: row['Fare zone'],
      openingYear: row['Opening year'],
    }));

    return stations;
  } catch (error) {
    throw new Error('Failed to fetch station data: ' + error);
  }
}
