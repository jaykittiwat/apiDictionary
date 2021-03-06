
const Gitservice = require("../services/git-service")
const Generalservice = require("../services/general-service")
const CL = require('../model/commanline');

//get รายการ
exports.getDictionaryList = (req, res) => {
    Gitservice.tag(result => {
        const data = Generalservice.makeJosnTree(result)
        res.json(data)
    })
}
//get เนื้อหารายการคำศัพท์
exports.getDictionary_detail = (req, res) => {
    Gitservice.readFile(req.params.slug, result => {
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
//mergeFile
exports.getDictionary_merge = (req, res) => {
    const arr=req.params.slug.split(",")
    const Filter=Gitservice.removeBranchEmtyFile(arr)
    var userID = req.params.userID
   
    const dataDelete = { slug: "mergeFile_" + userID, tag: " " }//"mergeFile_" เป็นdefalt ถ้าจะแก้  ไปแก้ใน Gitservice.mergeFile 
    if ( Filter.length > 1) {
        Gitservice.mergeFile(userID,  Filter, result => {
            res.sendFile(result);
            setTimeout(() => {
                Gitservice.delete_onbranch(dataDelete, result => {
                    console.log(result);
                })
            }, 500);
        })
    }
    if ( Filter.length === 1) {
        //ดึกไฟล์จากbranch ตรงๆ
        Gitservice.onlyOneBranchDowload( Filter, result => {
            res.sendFile(result);
        })
    }
}

