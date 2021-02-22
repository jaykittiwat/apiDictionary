const { exec } = require('child_process');
const CL = require('../model/commanline')
const fileName = 'document.txt'
const Generalservice=require('./general-service')

const massageDisplay_Error = (error, stderr) => {
    if (error) {
        console.log(error);
    }
    if (stderr) {
        console.log("Child Process STDERR: ", stderr);

    }
    return stderr
}





//ตัวสร้าง  bracnh master,sub,main(เอาไว้เทส  ควรที่จะสร้างไฟล์ git ที่มีbranch main , sub ไว้ก่อน เพราะต้องส่งไปให้ UI ก่อน) 
exports.check_Directory = (callback) => {
    exec('cd Dictionary_DB', (error, stdout, stderr) => {
        if (error) {
            exec('git init Dictionary_DB && touch Dictionary_DB/file.txt', (error, stdout, stderr) => {
                if (error === null) {
                   
                    exec(CL.gitConfig.emailAndUsername, { cwd: CL.path }, (error, stdout, stderr) => {
                        
                        if (error === null) {
                            exec('git add .&&git commit -m"init master branch"', { cwd: CL.path }, (error, stdout, stderr) => {
                                
                                if (error === null) {
                                    exec('git rm file.txt && git add .', { cwd: CL.path }, (error, stdout, stderr) => {
                                       
                                        if (error === null) {
                                            exec('git commit -m"update master branch delete file.txt branch file emty"', { cwd: CL.path }, (error, stdout, stderr) => {
                                                
                                                if (error === null) {
                                                    exec('git checkout -b main master && git checkout -b sub master', { cwd: CL.path }, (error, stdout, stderr) => {
                                                        
                                                        if (error === null) {
                                                            exec('git checkout master && git tag masterBranch', { cwd: CL.path }, (error, stdout, stderr) => {
                                                              
                                                                if (error === null) {
                                                                    exec('git checkout sub && git tag subBranch', { cwd: CL.path }, (error, stdout, stderr) => {
                                                                     
                                                                        if (error === null) {
                                                                            exec('git checkout main && git tag mainBranch', { cwd: CL.path }, (error, stdout, stderr) => {
                                                                                
                                                                                callback(true)
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
                    })
                }
            })
        }
        else {
            callback(true)
        }

    });
}
//สร้าง branch
exports.create_Branch = (newBranch, parentBranch, callback) => {
    exec('git checkout -b ' +parentBranch.tag+'/'+newBranch.slug + " " + parentBranch.slug+" && "+'git commit --allow-empty -m "Empty test commit"', { cwd: CL.path }, (error, stdout, stderr) => {
        console.log(stdout);
        if (error === null) {
          exec('git tag '+newBranch.slug,{cwd:CL.path}, (error, stdout, stderr) =>{
            callback(stderr)
          })
        }
    })
}


exports.commitFile_onBranch = (branch, data, callback) => {
    exec('git checkout ' + branch + ' && ' + 'echo  ' + "'" + data + "'" + ">" + fileName, { cwd: CL.path }, (error, stdout, stderr) => {
        if (error === null) {
            exec('git add .' + ' && ' + 'git commit -m' + '"' + branch + '"', { cwd: CL.path }, (error, stdout, stderr) => {
               
            })
        }
    })

}

//ยังไม่เสร็จ
exports.addNewCommit_onBranch = (branchName, data, callback) => {
    exec('git checkout ' + branchName + ' && ' + 'echo  ' + "'" + data + "'" + ">" + fileName, { cwd: CL.path }, (error, stdout, stderr) => {
        massageDisplay_Error(error, stderr)
        if (error === null) {
            exec('git add .' + ' && ' + 'git commit -m' + '"' + branchName + '"', { cwd: CL.path }, (error, stdout, stderr) => {
            })
        }
    })

}


exports.delete_onbranch = (branchName, callback) => {
 exec('git checkout master',{cwd:CL.path},(error, stdout, stderr)=>{
     if(error === null){
        exec('git branch -D' + branchName, { cwd: CL.path }, (error, stdout, stderr) => {
            callback(stdout)
        })
     }
  
 })
}

//เปลี่ยนชื่อbranch หรือ หมวดหมู่
exports.changeBranchName = (oldName, newName) => {
    //-git checkout <old_name>
    //-git branch -m <new_name>
}

exports.branch=(callback)=>{
    exec('git branch',{cwd:CL.path}, (error, stdout, stderr) => {
      const result=Generalservice.convertString(stdout)
        callback(result)
    })
}






//Class: ChildProcess
//(https://nodejs.org/api/child_process.html#child_process_class_childprocess)

/*git.on("data", (code) => {
    console.log("exit Code:" + code);
  });*/