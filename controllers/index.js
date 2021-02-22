
const Gitservice = require("../services/git-service")
const Generalservice = require("../services/general-service")
const { reset } = require("nodemon")

//get รายการ
exports.getDictionaryList = (req, res) => {
    Gitservice.branch(result=>{
        console.log(result)
    })
}
//get เนื้อหารายการคำศัพท์
exports.getDictionary_SelectedList = (req, res) => {

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
    console.log(branch)
  /*  Gitservice.commitFile_onBranch(branch, data[0],result=>{
        res.json(result)
    })*/
}
//update รายการคำศัพท์
exports.updateDictionary_Wordlist = (req, res) => {
    const branchName = req.params.slug
    const data = req.body
    Gitservice.addNewCommit_onBranch(branchName, data[0])
}
//update ชื่อหมวดหมู่่
exports.updateDictionaryList = (req, res) => {
    const branchName = req.params.slug
    const data = req.body
    Gitservice.addNewCommit_onBranch(branchName, data[0])
}
//delete ลบdictionary
exports.deleteDictionary = (req, res) => {
    Gitservice.delete_onbranch(branchName, result => {
        res.json(result)
    })
}

