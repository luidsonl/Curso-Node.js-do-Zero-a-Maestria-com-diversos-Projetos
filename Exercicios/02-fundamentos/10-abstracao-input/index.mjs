import inquirer from "inquirer";

inquirer.prompt([{
    name:  'p1',
    message: 'Qual a primeira nota?'
},{
    name:  'p2',
    message: 'Qual a segunda nota?'
},
]).then((answers)=>{
    let p1 = parseFloat(answers.p1)
    let p2 = parseFloat(answers.p2)
    let media = (p1+p2)/2
    
    console.log('Sua média foi: %s', media)
}).catch(err=> console.log(err))