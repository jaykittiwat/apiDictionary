
const Gitservice = require("../services/git-service")
const Generalservice = require("../services/general-service")

//get รายการ
exports.getDictionaryList = (req, res) => {
    Gitservice.tag(result => {
        const data = Generalservice.makeJosnTree(result)
        res.json(data)
    })
}
//get เนื้อหารายการคำศัพท์
exports.getDictionary_detail = (req, res) => {
    console.log(req.params);
  Gitservice.readFile(req.params.slug,result=>{
      res.json(result)
  })
}
//create หมวด
exports.createDictionary_Catalog = (req, res) => {
    const newBranch = req.body.create
    const parentBranch = req.body.child_of
    Gitservice.create_Branch(newBranch, parentBranch, (result => {
        res.json(result)

    }))
}
//create รายการคำศัพท์
exports.creatDictionary_Wordlist = (req, res) => {
    const branch = req.params
    const data = req.body
    //console.log(branch)
    Gitservice.commitFile_onBranch(branch, data[0], result => {
        res.json(result)
    })
}
//update รายการคำศัพท์
exports.updateDictionary_Wordlist = (req, res) => {
    const branch = req.params
    const data = req.body
    Gitservice.commitNewFile_onBranch(branch, data[0], result => {
        res.json(result)
    })
}
//update ชื่อหมวดหมู่่
exports.updateDictionaryList = (req, res) => {
    const oldName = req.body.oldName
    const newName = req.body.newName
    Gitservice.changeBranchName(oldName, newName, result => {
        res.json(result)
    })
}
//delete ลบdictionary
exports.deleteDictionary = (req, res) => {
    const branch = req.body

    Gitservice.delete_onbranch(branch, result => {
        res.json(result)
    })
}
exports.getDictionary_merge = (req, res) => {
    const result = Generalservice.querySlug_Service(req)
    Gitservice.mergeFile(result, resultCal => {
        if (resultCal) {
            //console.log('create file success');
            const pathFile='/home/jaykittiwat/Dictionary-server/Dictionary_DB'//ไฟล์ที่จะทำการdownload
            var filePath = pathFile; // Or format the path using the `id` rest param
            var fileName = "/document.txt"; // The default name the browser will use
            res.download(filePath, fileName)
            res.json('download')
        }
    })
}

