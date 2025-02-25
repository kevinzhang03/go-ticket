import csv

# Data extracted from the table
data = [
    {"Corridor": "All", "Station": "Union", "Code": "UN", "Location": "65 Front Street, Toronto", "Coordinates": "43.6456|-79.3795", "Platforms": "17", "Parking": "0", "Fare zone": "2", "Opening year": "1967"},
    {"Corridor": "Lakeshore West", "Station": "Exhibition", "Code": "EX", "Location": "100 Manitoba Drive, Toronto", "Coordinates": "43.6359|-79.4192", "Platforms": "2", "Parking": "0", "Fare zone": "2", "Opening year": "1967"},
    {"Corridor": "Lakeshore West", "Station": "Mimico", "Code": "MI", "Location": "315 Royal York Road, Toronto", "Coordinates": "43.6164|-79.4972", "Platforms": "4", "Parking": "330", "Fare zone": "3", "Opening year": "1967"},
    {"Corridor": "Lakeshore West", "Station": "Long Branch", "Code": "LO", "Location": "20 Brow Drive, Toronto", "Coordinates": "43.5919|-79.5456", "Platforms": "3", "Parking": "49", "Fare zone": "3", "Opening year": "1967"},
    {"Corridor": "Lakeshore West", "Station": "Port Credit", "Code": "PO", "Location": "30 Queen Street East, Mississauga", "Coordinates": "43.5556|-79.5875", "Platforms": "3", "Parking": "946", "Fare zone": "11", "Opening year": "1967"},
    {"Corridor": "Lakeshore West", "Station": "Clarkson", "Code": "CL", "Location": "1110 Southdown Road, Mississauga", "Coordinates": "43.5129|-79.6340", "Platforms": "3", "Parking": "3199", "Fare zone": "12", "Opening year": "1967"},
    {"Corridor": "Lakeshore West", "Station": "Oakville", "Code": "OA", "Location": "214 Cross Avenue, Oakville", "Coordinates": "43.4546|-79.6828", "Platforms": "4", "Parking": "4334", "Fare zone": "13", "Opening year": "1967"},
    {"Corridor": "Lakeshore West", "Station": "Bronte", "Code": "BO", "Location": "2104 Wyecroft Road, Oakville", "Coordinates": "43.4171|-79.7219", "Platforms": "3", "Parking": "2764", "Fare zone": "14", "Opening year": "1967"},
    {"Corridor": "Lakeshore West", "Station": "Appleby", "Code": "AP", "Location": "5111 Fairview Street, Burlington", "Coordinates": "43.3791|-79.7612", "Platforms": "3", "Parking": "2964", "Fare zone": "15", "Opening year": "1988"},
    {"Corridor": "Lakeshore West", "Station": "Burlington", "Code": "BU", "Location": "2101 Fairview Street, Burlington", "Coordinates": "43.3413|-79.8091", "Platforms": "3", "Parking": "2105", "Fare zone": "16", "Opening year": "1980"},
    {"Corridor": "Lakeshore West", "Station": "Aldershot", "Code": "AL", "Location": "1199 Waterdown Road, Burlington", "Coordinates": "43.3129|-79.8552", "Platforms": "4", "Parking": "1689", "Fare zone": "17", "Opening year": "1992"},
    {"Corridor": "Lakeshore West", "Station": "Hamilton", "Code": "HA", "Location": "36 Hunter Street East, Hamilton", "Coordinates": "43.2530|-79.8691", "Platforms": "2", "Parking": "0", "Fare zone": "18", "Opening year": "1996"},
    {"Corridor": "Lakeshore West", "Station": "West Harbour", "Code": "WR", "Location": "353 James Street North, Hamilton", "Coordinates": "43.2656|-79.8652", "Platforms": "2", "Parking": "46", "Fare zone": "18", "Opening year": "2015"},
    {"Corridor": "Lakeshore West", "Station": "St. Catharines", "Code": "SCTH", "Location": "5 Great Western Street, St. Catharines", "Coordinates": "43.1478|-79.2556", "Platforms": "1", "Parking": "0", "Fare zone": "83", "Opening year": "2009"},
    {"Corridor": "Lakeshore West", "Station": "Niagara Falls", "Code": "NI", "Location": "4267 Bridge Street, Niagara Falls", "Coordinates": "43.1088|-79.0636", "Platforms": "1", "Parking": "0", "Fare zone": "84", "Opening year": "2009"},
    {"Corridor": "Lakeshore East", "Station": "Danforth", "Code": "DA", "Location": "213 Main Street, Toronto", "Coordinates": "43.6866|-79.2994", "Platforms": "3", "Parking": "0", "Fare zone": "6", "Opening year": "1967"},
    {"Corridor": "Lakeshore East", "Station": "Scarborough", "Code": "SC", "Location": "3615 St Clair Avenue East, Toronto", "Coordinates": "43.7169|-79.2550", "Platforms": "3", "Parking": "626", "Fare zone": "6", "Opening year": "1967"},
    {"Corridor": "Lakeshore East", "Station": "Eglinton", "Code": "EG", "Location": "2995 Eglinton Avenue East, Toronto", "Coordinates": "43.7394|-79.2322", "Platforms": "2", "Parking": "836", "Fare zone": "6", "Opening year": "1967"},
    {"Corridor": "Lakeshore East", "Station": "Guildwood", "Code": "GU", "Location": "4105 Kingston Road, Toronto", "Coordinates": "43.7550|-79.1980", "Platforms": "3", "Parking": "1437", "Fare zone": "8", "Opening year": "1967"},
    {"Corridor": "Lakeshore East", "Station": "Rouge Hill", "Code": "RO", "Location": "6251 Lawrence Avenue East, Toronto", "Coordinates": "43.7802|-79.1302", "Platforms": "2", "Parking": "1407", "Fare zone": "9", "Opening year": "1967"},
    {"Corridor": "Lakeshore East", "Station": "Pickering", "Code": "PIN", "Location": "1322 Bayly Street, Pickering", "Coordinates": "43.8311|-79.0857", "Platforms": "3", "Parking": "3589", "Fare zone": "91", "Opening year": "1967"},
    {"Corridor": "Lakeshore East", "Station": "Ajax", "Code": "AJ", "Location": "100 Westney Road South, Ajax", "Coordinates": "43.8484|-79.0416", "Platforms": "2", "Parking": "1644", "Fare zone": "92", "Opening year": "1988"},
    {"Corridor": "Lakeshore East", "Station": "Whitby", "Code": "WH", "Location": "1350 Brock Street South, Whitby", "Coordinates": "43.8648|-78.9380", "Platforms": "2", "Parking": "3930", "Fare zone": "93", "Opening year": "1988"},
    {"Corridor": "Lakeshore East", "Station": "Oshawa", "Code": "OS", "Location": "915 Bloor Street West, Oshawa", "Coordinates": "43.8708|-78.8847", "Platforms": "2", "Parking": "2643", "Fare zone": "94", "Opening year": "1995"},
    {"Corridor": "Milton", "Station": "Kipling", "Code": "KP", "Location": "27 St Albans Road, Toronto", "Coordinates": "43.6357|-79.5373", "Platforms": "2", "Parking": "0", "Fare zone": "3", "Opening year": "1981"},
    {"Corridor": "Milton", "Station": "Dixie", "Code": "DI", "Location": "2445 Dixie Road, Mississauga", "Coordinates": "43.6078|-79.5774", "Platforms": "1", "Parking": "936", "Fare zone": "11", "Opening year": "1981"},
    {"Corridor": "Milton", "Station": "Cooksville", "Code": "CO", "Location": "3210 Hurontario Street, Mississauga", "Coordinates": "43.5832|-79.6239", "Platforms": "1", "Parking": "1675", "Fare zone": "11", "Opening year": "1981"},
    {"Corridor": "Milton", "Station": "Erindale", "Code": "ER", "Location": "1320 Rathburn Road West, Mississauga", "Coordinates": "43.5690|-79.6689", "Platforms": "2", "Parking": "2201", "Fare zone": "12", "Opening year": "1981"},
    {"Corridor": "Milton", "Station": "Streetsville", "Code": "SR", "Location": "45 Thomas Street, Mississauga", "Coordinates": "43.5761|-79.7087", "Platforms": "2", "Parking": "1540", "Fare zone": "21", "Opening year": "1981"},
    {"Corridor": "Milton", "Station": "Meadowvale", "Code": "ME", "Location": "6845 Millcreek Drive, Mississauga", "Coordinates": "43.5978|-79.7542", "Platforms": "1", "Parking": "2010", "Fare zone": "22", "Opening year": "1981"},
    {"Corridor": "Milton", "Station": "Lisgar", "Code": "LS", "Location": "3250 Argentia Road, Mississauga", "Coordinates": "43.5906|-79.7883", "Platforms": "1", "Parking": "792", "Fare zone": "23", "Opening year": "2007"},
    {"Corridor": "Milton", "Station": "Milton", "Code": "ML", "Location": "780 Main Street East, Milton", "Coordinates": "43.5234|-79.8670", "Platforms": "1", "Parking": "1567", "Fare zone": "24", "Opening year": "1981"},
    {"Corridor": "Kitchener", "Station": "Bloor", "Code": "BL", "Location": "1456 Bloor Street West, Toronto", "Coordinates": "43.6580|-79.4509", "Platforms": "3", "Parking": "0", "Fare zone": "2", "Opening year": "1975"},
    {"Corridor": "Kitchener", "Station": "Weston", "Code": "WE", "Location": "1865 Weston Road, Toronto", "Coordinates": "43.7002|-79.5132", "Platforms": "3", "Parking": "295", "Fare zone": "4", "Opening year": "1974"},
    {"Corridor": "Kitchener", "Station": "Etobicoke North", "Code": "ET", "Location": "1949 Kipling Avenue, Toronto", "Coordinates": "43.7063|-79.5624", "Platforms": "1", "Parking": "687", "Fare zone": "4", "Opening year": "1974"},
    {"Corridor": "Kitchener", "Station": "Malton", "Code": "MA", "Location": "3060 Derry Road East, Mississauga", "Coordinates": "43.7050|-79.6382", "Platforms": "3", "Parking": "779", "Fare zone": "31", "Opening year": "1974"},
    {"Corridor": "Kitchener", "Station": "Bramalea", "Code": "BE", "Location": "1713 Steeles Avenue, Brampton", "Coordinates": "43.7017|-79.6911", "Platforms": "3", "Parking": "2377", "Fare zone": "32", "Opening year": "1974"},
    {"Corridor": "Kitchener", "Station": "Brampton", "Code": "BR", "Location": "27 Church Street West, Brampton", "Coordinates": "43.6868|-79.7647", "Platforms": "2", "Parking": "933", "Fare zone": "33", "Opening year": "1974"},
    {"Corridor": "Kitchener", "Station": "Mount Pleasant", "Code": "MO", "Location": "1600 Bovaird Drive West, Brampton", "Coordinates": "43.6751|-79.8227", "Platforms": "3", "Parking": "1116", "Fare zone": "34", "Opening year": "2005"},
    {"Corridor": "Kitchener", "Station": "Georgetown", "Code": "GE", "Location": "55 Queen Street, Georgetown", "Coordinates": "43.6556|-79.9186", "Platforms": "4", "Parking": "625", "Fare zone": "35", "Opening year": "1978"},
    {"Corridor": "Kitchener", "Station": "Acton", "Code": "AC", "Location": "39 Eastern Avenue, Acton", "Coordinates": "43.6338|-80.0345", "Platforms": "1", "Parking": "45", "Fare zone": "37", "Opening year": "2013"},
    {"Corridor": "Kitchener", "Station": "Guelph", "Code": "GL", "Location": "79 Carden Street, Guelph", "Coordinates": "43.5446|-80.2464", "Platforms": "1", "Parking": "12", "Fare zone": "39", "Opening year": "2011"},
    {"Corridor": "Kitchener", "Station": "Kitchener", "Code": "KI", "Location": "126 Weber Street West, Kitchener", "Coordinates": "43.4556|-80.4933", "Platforms": "1", "Parking": "0", "Fare zone": "27", "Opening year": "2011"},
    {"Corridor": "Barrie", "Station": "Downsview Park", "Code": "DW", "Location": "1212 Sheppard Avenue West, Toronto", "Coordinates": "43.7514|-79.4780", "Platforms": "1", "Parking": "0", "Fare zone": "19", "Opening year": "2017"},
    {"Corridor": "Barrie", "Station": "Rutherford", "Code": "RU", "Location": "699 Westburne Drive, Vaughan", "Coordinates": "43.8384|-79.4983", "Platforms": "1", "Parking": "970", "Fare zone": "61", "Opening year": "2001"},
    {"Corridor": "Barrie", "Station": "Maple", "Code": "MP", "Location": "30 Station Street, Vaughan", "Coordinates": "43.8594|-79.5071", "Platforms": "1", "Parking": "1319", "Fare zone": "61", "Opening year": "1982"},
    {"Corridor": "Barrie", "Station": "King City", "Code": "KC", "Location": "7 Station Road, King City", "Coordinates": "43.9200|-79.5270", "Platforms": "1", "Parking": "555", "Fare zone": "62", "Opening year": "1982"},
    {"Corridor": "Barrie", "Station": "Aurora", "Code": "AU", "Location": "121 Wellington Street East, Aurora", "Coordinates": "44.0007|-79.4599", "Platforms": "1", "Parking": "1462", "Fare zone": "63", "Opening year": "1982"},
    {"Corridor": "Barrie", "Station": "Newmarket", "Code": "NE", "Location": "465 Davis Drive, Newmarket", "Coordinates": "44.0607|-79.4604", "Platforms": "1", "Parking": "265", "Fare zone": "64", "Opening year": "1982"},
    {"Corridor": "Barrie", "Station": "East Gwillimbury", "Code": "EA", "Location": "845 Green Lane East, East Gwillimbury", "Coordinates": "44.0778|-79.4552", "Platforms": "1", "Parking": "646", "Fare zone": "44", "Opening year": "2004"},
    {"Corridor": "Barrie", "Station": "Bradford", "Code": "BD", "Location": "300 Holland Street East, Bradford", "Coordinates": "44.1172|-79.5562", "Platforms": "2", "Parking": "359", "Fare zone": "65", "Opening year": "1982"},
    {"Corridor": "Barrie", "Station": "Barrie South", "Code": "BA", "Location": "833 Yonge Street, Barrie", "Coordinates": "44.3511|-79.6275", "Platforms": "1", "Parking": "619", "Fare zone": "68", "Opening year": "2007"},
    {"Corridor": "Barrie", "Station": "Allandale Waterfront", "Code": "AD", "Location": "24 Essa Road, Barrie", "Coordinates": "44.3747|-79.6887", "Platforms": "1", "Parking": "160", "Fare zone": "69", "Opening year": "2011"},
    {"Corridor": "Richmond Hill", "Station": "Oriole", "Code": "OR", "Location": "3300 Leslie Street, Toronto", "Coordinates": "43.7654|-79.3646", "Platforms": "1", "Parking": "295", "Fare zone": "5", "Opening year": "1978"},
    {"Corridor": "Richmond Hill", "Station": "Old Cummer", "Code": "OL", "Location": "5760 Leslie Street, Toronto", "Coordinates": "43.7924|-79.3712", "Platforms": "1", "Parking": "466", "Fare zone": "5", "Opening year": "1978"},
    {"Corridor": "Richmond Hill", "Station": "Langstaff", "Code": "LA", "Location": "10 Red Maple Road, Richmond Hill", "Coordinates": "43.8383|-79.4233", "Platforms": "1", "Parking": "1137", "Fare zone": "60", "Opening year": "1978"},
    {"Corridor": "Richmond Hill", "Station": "Richmond Hill", "Code": "RI", "Location": "6 Newkirk Road, Richmond Hill", "Coordinates": "43.8749|-79.4267", "Platforms": "1", "Parking": "2324", "Fare zone": "61", "Opening year": "1978"},
    {"Corridor": "Richmond Hill", "Station": "Gormley", "Code": "GO", "Location": "1650 Stouffville Road, Richmond Hill", "Coordinates": "43.9409|-79.3980", "Platforms": "1", "Parking": "850", "Fare zone": "62", "Opening year": "2016"},
    {"Corridor": "Richmond Hill", "Station": "Bloomington", "Code": "BM", "Location": "1796 York Regional Road 40, Richmond Hill", "Coordinates": "43.9759|-79.3981", "Platforms": "1", "Parking": "1000", "Fare zone": "98", "Opening year": "2021"},
    {"Corridor": "Stouffville", "Station": "Kennedy", "Code": "KE", "Location": "2467 Eglinton Avenue East, Toronto", "Coordinates": "43.7323|-79.2624", "Platforms": "1", "Parking": "0", "Fare zone": "77", "Opening year": "2005"},
    {"Corridor": "Stouffville", "Station": "Agincourt", "Code": "AG", "Location": "4100 Sheppard Avenue East, Toronto", "Coordinates": "43.7855|-79.2840", "Platforms": "1", "Parking": "342", "Fare zone": "7", "Opening year": "1982"},
    {"Corridor": "Stouffville", "Station": "Milliken", "Code": "MK", "Location": "39 Redlea Avenue, Toronto", "Coordinates": "43.8232|-79.3016", "Platforms": "1", "Parking": "665", "Fare zone": "70", "Opening year": "2005"},
    {"Corridor": "Stouffville", "Station": "Unionville", "Code": "UI", "Location": "155 YMCA Boulevard, Markham", "Coordinates": "43.8516|-79.3148", "Platforms": "1", "Parking": "1620", "Fare zone": "71", "Opening year": "1991"},
    {"Corridor": "Stouffville", "Station": "Centennial", "Code": "CE", "Location": "320 Bullock Drive, Markham", "Coordinates": "43.8737|-79.2894", "Platforms": "1", "Parking": "451", "Fare zone": "72", "Opening year": "2004"},
    {"Corridor": "Stouffville", "Station": "Markham", "Code": "MR", "Location": "214 Main Street North, Markham", "Coordinates": "43.8827|-79.2626", "Platforms": "2", "Parking": "413", "Fare zone": "72", "Opening year": "1982"},
    {"Corridor": "Stouffville", "Station": "Mount Joy", "Code": "MJ", "Location": "1801 Bur Oak Avenue, Markham", "Coordinates": "43.9004|-79.2630", "Platforms": "1", "Parking": "1333", "Fare zone": "73", "Opening year": "2004"},
    {"Corridor": "Stouffville", "Station": "Stouffville", "Code": "ST", "Location": "6176 Main Street, Stouffville", "Coordinates": "43.9714|-79.2501", "Platforms": "1", "Parking": "243", "Fare zone": "74", "Opening year": "1982"},
    {"Corridor": "Stouffville", "Station": "Old Elm", "Code": "LI", "Location": "12958 Tenth Line, Stouffville", "Coordinates": "43.9904|-79.2370", "Platforms": "1", "Parking": "673", "Fare zone": "74", "Opening year": "2008"},
]

# Write to CSV
with open("go_transit_stations.csv", "w", newline="") as csvfile:
    fieldnames = ["Corridor", "Station", "Code", "Location", "Coordinates", "Platforms", "Parking", "Fare zone", "Opening year"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for row in data:
        writer.writerow(row)

print("CSV file created successfully.")