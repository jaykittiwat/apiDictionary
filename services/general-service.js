const Gitservice = require('./git-service')
const CL = require('../model/commanline')
const { exec } = require('child_process');
const fs=require('fs')


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

exports.makeJosnTree = (dataObj) => {
    //console.log(dataObj);
    const data = dataObj.splPath
    const orinaltag = dataObj.origiPath
    const title = dataObj.title
    const fileDict = dataObj.fileDict
    const paths = []
    const oripaths = []
    const Title = []
    const file=[]

    data.forEach((element, index) => {
        //ไม่เอา masterbranch ,mergeBranch
        if (element !== 'mastertag'&&element !==' '&&element !== undefined&&element !== null&&element !== '') {
            const da = element.split('/')
            paths.push(da);
            oripaths.push(orinaltag[index])
            Title.push(title[index])
            file.push(fileDict[index])
        }

    });
    var tree = arrangeIntoTree(paths, oripaths, Title, file);
    return tree
}

const arrangeIntoTree = (paths, oripaths, Title, file) => {

    var tree = [];
    for (let i = 0; i < paths.length; i++) {
        var path = paths[i];
        var currentLevel = tree;
        for (let j = 0; j < path.length; j++) {
            const part = path[j];
            const existingPath = findWhere(currentLevel, 'slug', part);

            if (existingPath) {
                currentLevel = existingPath.child;
            }
            else {
                const newPart = {
                    slug: part,
                    tag: oripaths[i],
                    title: Title[i],
                    dictionary:file[i],
                    child: [],
                }
                currentLevel.push(newPart);
                currentLevel = newPart.child;
            }
        }
    }
    return tree;
}

const findWhere = (array, key, value) => {
    t = 0;
    while (t < array.length && array[t][key] !== value) { t++; };

    if (t < array.length) {
        return array[t]
    } else {
        return false;
    }
}

exports.DowloadFile = (res) => {
     
}
