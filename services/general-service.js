
exports.querySlug_Service = (req) => {
    var arr = JSON.parse(req.query.slug);
    return arr
}

exports.convertString = (data) => {
    const dt = data.trim()
    const result = dt.split("\n");
    result.forEach((item, index) => {
        const cs = item.trim()
        const cs2 = cs.replace("*", "");
        result[index] = cs2.replace(" ", "")
    });
    return result

}


exports.makeJosnTree = (data) => {
    const paths = []
    data.forEach((element, index) => {
        if (element !== 'mastertag') {
            const da = element.split('/')
            paths.push(da);
        }

    });
    var tree = arrangeIntoTree(paths);
    return tree
    
}


const arrangeIntoTree=(paths)=> {
    var tree = [];
    for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var currentLevel = tree;
        for (var j = 0; j < path.length; j++) {
            var part = path[j];

            var existingPath = findWhere(currentLevel, 'slug', part);

            if (existingPath) {
                currentLevel = existingPath.child;
            } else {
                var newPart = {
                    slug: part,
                    tag:"",
                    title:"",
                    child: [],
                }

                currentLevel.push(newPart);
                currentLevel = newPart.child;
            }
        }
    }
    return tree;


}


const findWhere=(array, key, value)=> {
    
    t = 0; 
    while (t < array.length && array[t][key] !== value) { t++; }; 

    if (t < array.length) {
        return array[t]
    } else {
        return false;
    }
}