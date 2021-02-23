const { exec } = require('child_process');
const CL = require('../model/commanline')
const fileName = 'document.txt'
const Generalservice = require('./general-service')



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
                                    exec('git checkout -b mainBranch master && git commit --allow-empty -m "หมวดหลัก"', { cwd: CL.path }, (error, stdout, stderr) => {

                                        if (error === null) {
                                            exec('git tag main && git checkout -b subBranch master', { cwd: CL.path }, (error, stdout, stderr) => {

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

            exec('git tag ' + 'X/' + parentBranch.tag + '/' + newBranch.slug, { cwd: CL.path }, (error, stdout, stderr) => {
                if (error === null) {
                    callback('git tag exit already in firtst commit')
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
            callback(error)
        }
    })
}

//เปลี่ยนชื่อbranch 
exports.changeBranchName = (oldName, newName) => {
    //-git checkout <old_name>
    //-git branch -m <new_name>
}

exports.branch = (callback) => {
    exec('git branch', { cwd: CL.path }, (error, stdout, stderr) => {
        const result = Generalservice.convertString(stdout)
        callback(result)
    })
}






//Class: ChildProcess
//(https://nodejs.org/api/child_process.html#child_process_class_childprocess)

/*git.on("data", (code) => {
    console.log("exit Code:" + code);
  });*/