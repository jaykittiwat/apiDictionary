const { exec, execSync } = require('child_process');
const CL = require('../model/commanline')


const Generalservice = require('./general-service')
const fileName = 'document.txt'
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
   
    exec('git checkout -b ' + newBranch.slug + " " + parentBranch.slug + " && " + 'git commit --allow-empty -m' + '"' + newBranch.title + '"', { cwd: CL.path }, (error, stdout, stderr) => {
        if (error === null) {
            exec('git tag ' + 'x/' + parentBranch.tag + '/' + newBranch.slug, { cwd: CL.path }, (error, stdout, stderr) => {
                if (error === null) {
                    callback('success')
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
    console.log(data);
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
//update branch
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
            callback(error)
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
//หาแท็ก
exports.tag = (callback) => {
    var splTag = []
    var orinaltag = []
    var title = []
    var file = []
    exec('git tag', { cwd: CL.path }, (error, stdout, stderr) => {
        if (error === null) {
            var tag = Generalservice.convertString(stdout)
            orinaltag = tag
            tag.forEach(element => {

                const arrSpl = element.split("x/");
                const result = execSync('git log -1 --pretty=oneline ' + element + ' --pretty=%s', { cwd: CL.path }).toString()
                title.push(result.trim())//ดู commit massage      
                const arr = element.split('/')
                const resultFile = execSync('git show --pretty="" --name-only ' + arr.pop(), { cwd: CL.path }).toString()
                file.push(resultFile === '' ? false : true)
                arrSpl.forEach(ele => {
                    if (ele !== '') {
                        splTag.push(ele)

                    }
                });

            });

            callback({
                splPath: splTag,
                origiPath: orinaltag,
                title: title,
                fileDict: file
            })



        }
    })

}
//merge file
exports.mergeFile = (userID,arrBranch, callback) => {
    //ต้อง merge  branch 2 ก่อนเพื่อcommit
    mergeIndexOneAndTwo(userID,arrBranch, result => {
        let i = 0
        for (i; i < arrBranch.length; i++) {
            if (i > 1) {
                mergeProcess(arrBranch[i])
            }
        }
        exec('grep -v -e"^<<<<<<<" -e "^>>>>>>>" -e"=======" document.txt > document.tmp' + ' && ' + 'mv document.tmp document.txt', { cwd: CL.path }, (error, stdout, stderr) => { 
            exec('git add . && git commit --allow-empty-message -m" "', { cwd: CL.path }, (error, stdout, stderr) => {
                callback(CL.path+'/'+fileName)
            })
            
        })
    })
}
//request แค่หมวดเดียว
exports.onlyOneBranchDowload=(arr,callback)=>{
exec('git checkout '+arr[0], { cwd: CL.path }, (error, stdout, stderr)=>{
    callback(CL.path+'/'+fileName)
})
}

const mergeIndexOneAndTwo = (userID,arrBranch, callback) => {
    const defaltName='mergeFile_'+userID
    exec('git checkout -b '+defaltName+' master', { cwd: CL.path }, (error, stdout, stderr) => {

        exec('git merge ' + arrBranch[0], { cwd: CL.path }, (error, stdout, stderr) => {

            exec('git merge ' + arrBranch[1], { cwd: CL.path }, (error, stdout, stderr) => {

                exec('grep -v -e"^<<<<<<<" -e "^>>>>>>>" -e"=======" document.txt > document.tmp' + ' && ' + 'mv document.tmp document.txt', { cwd: CL.path }, (error, stdout, stderr) => {

                    exec('git add . && git commit --allow-empty-message -m" "', { cwd: CL.path }, (error, stdout, stderr) => {
                        callback(true)
                    })
                })
            })
        })
    })
}

//แก้ปัญหา conflig  ต้องการแบบSync[b1,b2]<----b3,<-----b4
const mergeProcess = (branch) => {
    try {
        execSync('git merge ' + branch, { cwd: CL.path })
        execSync('git add . && git commit --allow-empty-message -m" "', { cwd: CL.path })
    } catch (ex) {
        execSync('git add . && git commit --allow-empty-message -m" "', { cwd: CL.path })
        execSync('git merge ' + branch, { cwd: CL.path })
    }
}
exports.readFile = (branchName, callback) => {
    exec('git checkout ' + branchName + ' && ' + 'cat document.txt', { cwd: CL.path }, (error, stdout, stderr) => {
        callback([stdout])
    })
}
exports.removeBranchEmtyFile=(arr)=>{
    
    var arrfilter=[]
    let i=0
    for( i;i<arr.length;i++){
       // console.log(arr[i]);
        var result = execSync('git show --pretty="" --name-only ' + arr[i], { cwd: CL.path }).toString()
    var x= result.replace("\n", "")
        if(x === 'document.txt'){
            console.log(x);
            arrfilter.push(arr[i])
         
        }
    }
    
return arrfilter

}








