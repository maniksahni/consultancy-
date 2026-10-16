"""Builds public/data/globe-dots.json: evenly spaced land points for the homepage globe.

Source: src/data/atlasLand.json (Natural Earth 1:110m land, public domain).
Points are laid on a Fibonacci sphere so density is even, then kept if they fall on land.
"""
import json, math

rings = json.load(open("src/data/atlasLand.json"))
boxes = [(min(p[0] for p in r), max(p[0] for p in r), min(p[1] for p in r), max(p[1] for p in r), r) for r in rings]

def inside(lon, lat, ring):
    hit = False
    j = len(ring) - 1
    for i in range(len(ring)):
        xi, yi = ring[i]; xj, yj = ring[j]
        if (yi > lat) != (yj > lat) and lon < (xj - xi) * (lat - yi) / (yj - yi + 1e-12) + xi:
            hit = not hit
        j = i
    return hit

N = 26000
golden = math.pi * (3 - math.sqrt(5))
points = []
for k in range(N):
    y = 1 - (k / (N - 1)) * 2
    r = math.sqrt(1 - y * y)
    theta = golden * k
    lat = math.degrees(math.asin(y))
    lon = math.degrees(math.atan2(math.sin(theta) * r, math.cos(theta) * r))
    if lat < -60:
        continue
    for x0, x1, y0, y1, ring in boxes:
        if x0 <= lon <= x1 and y0 <= lat <= y1 and inside(lon, lat, ring):
            points.append(round(lat, 2)); points.append(round(lon, 2))
            break

json.dump(points, open("public/data/globe-dots.json", "w"), separators=(",", ":"))
print(len(points) // 2, "land points")
