import GeoPattern from 'geopattern'

let patterns = {}
function getPattern(input) {
    if (patterns[input])
        return patterns[input]
    let pattern = GeoPattern.generate(input);
    patterns[input] = pattern.toDataUri();
    return pattern.toDataUri();
}

export default getPattern