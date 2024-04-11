import osmnx as ox
import networkx as nx
import numpy as np
import json
from shapely.geometry import LineString, Point
from shapely.ops import substring

START_POINT = (45.504785, -73.612517)
END_POINT1 = (45.5577438, -73.5541227)
END_POINT2 = (45.4985219, -73.581975)
END_POINT3 = (45.5054701, -73.5282067)
END_POINT4 = (45.4919897, -73.6939277)
UPDATE_FREQUENCY = 0.005

G = ox.graph_from_place('Montreal, Quebec, Canada', network_type='drive')

def interpolate_line_string(line_string, segment_length):
    total_length = line_string.length
    num_segments = int(total_length / segment_length) + 1
    interpolated_points = [line_string.coords[0]]

    for i in range(1, num_segments):
        fraction = i * segment_length / total_length
        point = line_string.interpolate(fraction, normalized=True)
        interpolated_points.append((point.x, point.y))

    interpolated_points.append(line_string.coords[-1])
    return [(lat, lon) for lon, lat in interpolated_points]

def generateRoute(start_point, end_point):
    start_node = ox.distance.nearest_nodes(G, X=start_point[1], Y=start_point[0])
    end_node = ox.distance.nearest_nodes(G, X=end_point[1], Y=end_point[0])
    shortest_path = nx.shortest_path(G, start_node, end_node, weight='length')

    dense_points = []
    total_length = 0

    for i in range(len(shortest_path) - 1):
        edge_data = G.get_edge_data(shortest_path[i], shortest_path[i + 1])[0]
        total_length += edge_data['length']

        if 'geometry' in edge_data:
            geometry = edge_data['geometry']
            dense_points += interpolate_line_string(geometry, UPDATE_FREQUENCY / 100)[1:]
        else:
            start_coords = (G.nodes[shortest_path[i]]['x'], G.nodes[shortest_path[i]]['y'])
            end_coords = (G.nodes[shortest_path[i+1]]['x'], G.nodes[shortest_path[i+1]]['y'])
            line_string = LineString([start_coords, end_coords])
            dense_points += interpolate_line_string(line_string, UPDATE_FREQUENCY / 100)[1:]

    coordinates_list = [list(coord) for coord in dense_points]
    return coordinates_list, total_length

coordinates1 = generateRoute(START_POINT, END_POINT1)
coordinates2 = generateRoute(START_POINT, END_POINT2)
coordinates3 = generateRoute(START_POINT, END_POINT3)
coordinates4 = generateRoute(END_POINT1, END_POINT4)

routes = [
    {"coordinates": coordinates1[0], "start": 'Warehouse', "end": 'Olympic Stadium of Montreal', "length": coordinates1[1]},
    {"coordinates": coordinates2[0], "start": 'Warehouse', "end": 'Montreal Museum of Fine Arts', "length": coordinates2[1]},
    {"coordinates": coordinates3[0], "start": 'Warehouse', "end": 'Montreal Casino', "length": coordinates3[1]},
    {"coordinates": coordinates4[0], "start": 'Warehouse', "end": 'IKEA Montreal', "length": coordinates4[1]}
]

ts_content = "\n".join([
    f"export const route{i + 1} = {json.dumps(route)};"
    for i, route in enumerate(routes)
])

with open("src/gpsTracking/routes.ts", "w") as file:
    file.write(ts_content)
