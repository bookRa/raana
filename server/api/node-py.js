
let pyscript_path= '../../python_scripts/reddit_pred.py'
let PythonShell = require('python-shell')
let pyshell = new PythonShell()

pyshell.on('message', (msg)=>{
    console.log(msg)
})

pyshell.end((err)=>{
    if(err){
        throw err;
    }

    console.log('finished')
})

export default pyshell
