const { exec } = require('child_process');
const CL = require('../model/commanline')
const fileName = 'document.txt'
const Generalservice = require('./general-service')

const changeTag = (oldName, newName) => {
    const newTag = oldName.tag.replace("/" + oldName.slug, "/" + newName.slug);
    return newTag
}
const Topparent = ['mainBranch', 'subBranch']//ห้ามซ้ำกับชื่อ tag =[main,sub]

//ตัวสร้าง  bracnh master,sub,main(เอาไว้เทส  ควรที่จะสร้างไฟล์ git ที่มีbranch main , sub ไว้ก่อน เพราะต้องส่งไปให้ UI ก่อน) 
exports.check_Directory = (callback) => {
    exec('cd Dictionary_DB', (error, stdout, stderr) => {
        if (error) {
            exec('git init Dictionary_DB ', (error, stdout, stderr) => {
                if (error === null) {

                    exec(CL.gitConfig.emailAndUsername, { cwd: CL.path }, (error, stdout, stderr) => {

                        if (error === null) {
                            exec('git commit --allow-empty -m "master empty " && git tag mastertag', { cwd: CL.path }, (error, stdout, stderr) => {

                                if (error === null) {
                                    exec('git checkout -b ' + Topparent[0] + ' master && git commit --allow-empty -m "หมวดหลัก"', { cwd: CL.path }, (error, stdout, stderr) => {

                                        if (error === null) {
                                            exec('git tag main && git checkout -b ' + Topparent[1] + ' master', { cwd: CL.path }, (error, stdout, stderr) => {

                                                if (error === null) {
                                                    exec('git commit --allow-empty -m "หมวดย่อย"', { cwd: CL.path }, (error, stdout, stderr) => {

                                                        if (error === null) {
                                                            exec('git tag sub', { cwd: CL.path }, (error, stdout, stderr) => {
                                                                callback("true")
                                                                //console.log("ceate success")
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
        else {
            callback(true)
            //console.log("you have directory exit already")
        }

    });
}
//สร้าง branch
exports.create_Branch = (newBranch, parentBranch, callback) => {
    exec('git checkout -b ' + newBranch.slug + " " + parentBranch.slug + " && " + 'git commit --allow-empty -m' + '"' + newBranch.title + '"', { cwd: CL.path }, (error, stdout, stderr) => {
        if (error === null) {
            exec('git tag ' + 'x/' + parentBranch.tag + '/' + newBranch.slug, { cwd: CL.path }, (error, stdout, stderr) => {
                if (error === null) {
                    callback('git tag sucess already in firtst commit')
                }
            })
        }
        else {
            callback("exit already name")
        }
    })
}
//เพิ่ม file and commit
exports.commitFile_onBranch = (branch, data, callback) => {
    exec('git checkout ' + branch.slug + ' && ' + 'echo  ' + "'" + data + "'" + ">" + fileName, { cwd: CL.path }, (error, stdout, stderr) => {
        if (error === null) {
            exec('git add .' + ' && ' + 'git commit --allow-empty-message -m" " ', { cwd: CL.path }, (error, stdout, stderr) => {
                callback(stdout)
            })
        }
        else {
            callback(stderr)
        }
    })
}
exports.commitNewFile_onBranch = (branch, data, callback) => {
    exec('git checkout ' + branch.slug + ' && ' + 'echo  ' + "'" + data + "'" + ">" + fileName, { cwd: CL.path }, (error, stdout, stderr) => {
        if (error === null) {
            exec('git add .' + ' && ' + 'git commit --allow-empty-message -m" " ', { cwd: CL.path }, (error, stdout, stderr) => {
                callback(stdout)
            })
        }
        else {
            callback(stderr)
        }
    })
}
//ลบ branch & tag
exports.delete_onbranch = (branch, callback) => {
    exec('git checkout master', { cwd: CL.path }, (error, stdout, stderr) => {
        if (error === null) {
            exec('git branch -D ' + branch.slug + " && " + 'git tag -d ' + branch.tag, { cwd: CL.path }, (error, stdout, stderr) => {
                if (error === null) {
                    callback("deleted")
                }
                else {
                    callback(error)
                }
            })
        }
        else {
            callback(stderr)
        }
    })
}

//เปลี่ยนชื่อbranch 
exports.changeBranchName = (oldName, newName, callback) => {
    exec('git checkout ' + oldName.slug + ' && ' + 'git branch -m ' + newName.slug, { cwd: CL.path }, (error, stdout, stderr) => {
        if (error === null) {
            const newTag = changeTag(oldName, newName)
            exec('git checkout ' + oldName.tag + ' && ' + 'git commit --amend --allow-empty -m' + '"' + newName.title + '"', { cwd: CL.path }, (error, stdout, stderr) => {
                if (error === null) {
                    exec('git tag ' + newTag + " && " + 'git tag -d ' + oldName.tag, { cwd: CL.path }, (error, stdout, stderr) => {
                        if (error === null) {
                            callback('success')
                        }
                        else {
                            callback('success')
                        }
                    })
                }
                else {
                    callback(stderr)
                }
            })
        }
        else {
            callback(stderr)
        }

    })
}

exports.tag = (callback) => {
    const data=[]

  exec('git tag',{cwd:CL.path},(error, stdout, stderr)=>{
      if(error===null){
          const result= Generalservice.convertString(stdout)
          
          result.forEach(element => {
             
              const arrSpl = element.split("x/");
             arrSpl.forEach(ele => {
                 if(ele!==''){
                     data.push(ele)
                 }
             });
          });
          callback(data)
      }
  })
}






