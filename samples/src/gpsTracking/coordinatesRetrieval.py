import osmnx as ox
import networkx as nx
import numpy as np

START_POINT = (45.504785, -73.612517)
END_POINT = (45.558496, -73.551866)
SPEED_MS = 7


G = ox.graph_from_place("Montreal, Quebec, Canada", network_type='drive')

start_node = ox.distance.nearest_nodes(G, X=START_POINT[1], Y=START_POINT[0])
end_node = ox.distance.nearest_nodes(G, X=END_POINT[1], Y=END_POINT[0])


shortest_path = nx.shortest_path(G, start_node, end_node, weight='length')
lat_long = [(G.nodes[node]['y'], G.nodes[node]['x']) for node in shortest_path]


route_length = 0
for i in range(len(shortest_path) - 1):
    segment_length = G[shortest_path[i]][shortest_path[i + 1]][0]['length']
    route_length += segment_length

def interpolate_points(points, num_points_between=10):
    interpolated_points = []
    for i in range(len(points) - 1):
        start_point = np.array(points[i])
        end_point = np.array(points[i + 1])

        for j in range(num_points_between + 1):
            fraction = j / num_points_between
            new_point = start_point + fraction * (end_point - start_point)
            interpolated_points.append(tuple(new_point))

    interpolated_points.append(points[-1])

    return interpolated_points

num_points_between = int((route_length // SPEED_MS) // (len(lat_long) - 1) - 1)
denser_points = interpolate_points(lat_long, num_points_between)

print(denser_points)
