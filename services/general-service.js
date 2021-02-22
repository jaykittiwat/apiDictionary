
exports.querySlug_Service=(req)=>{
    var arr = JSON.parse(req.query.slug);
 return arr
}

exports.convertString=(data)=>{
    const dt=data.trim()
    const result = dt.split("\n");
    result.forEach((item,index) => {
        const cs=item.trim()
        const cs2=cs.replace("*","");
        result[index]=cs2.replace(" ","")
    });
    return result
    
}


