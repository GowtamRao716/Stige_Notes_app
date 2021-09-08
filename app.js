var yargs = require('yargs');
var chalk =require('chalk');
var notes =require('./notes.json');
var fs = require('fs');
var notes = JSON.parse(fs.readFileSync('notes.json'));
var exists="false";

//Adding new notes
function addNotes(title,body){
        notes.forEach((note)=>{
            if(note.title.toLowerCase()==title.toLowerCase()){
                exists=true;
            }
        })
        if(exists==="false")
        {            
            notes.push({title,body});
            fs.writeFile("notes.json",JSON.stringify(notes),()=>{
            console.log(chalk.yellow.bold('New note has been created'));
            })
        }
        else
        {
            console.log(chalk.white.bold("ERROR!!! Note already exists."))
        }
        
}
yargs.command({
    command: 'add',
    describe: 'Adding notes to the list',
    builder: {
        title: {
            describe: 'title',
            demandOption: true, 
            type: 'string'     
        },
        body: {  
            describe: 'body',
            demandOption: true,
            type: 'string'
        }
    },
  
    handler(argv) {
        addNotes(argv.title,argv.body);
    }
})

//For removing note
function removeNotes(title){
    notes.forEach((note)=>{
        if(note.title.toLowerCase()==title.toLowerCase())
        {
            exists=true;
        }
    });
    if(exists===true)
       {
        var newList = notes.filter((note)=>{
            return note.title.toLowerCase()!=title.toLowerCase();
        });
        fs.writeFile('notes.json',JSON.stringify(newList),()=>{
            console.log(chalk.blue.bold(title +' note has been removed!!!'));

        })
    }
    else{
        console.log(chalk.red.bold(title+' ERROR note does not exist'));
        console.log(chalk.orange.bold(' List of existing nodes :'));
        displayList();
    }
}
yargs.command({
    command: 'remove',
    describe: 'removes notes from the list',
    builder: {
        title: {
            describe: 'title',
            demandOption: true, 
            type: 'string'     
        },
    },
  
    handler(argv) {
        removeNotes(argv.title);
    }
})

//Displaying notes
function displayList(){
   
    if(notes.length!=0)
    {
        console.log(chalk.bold.magenta.underline(' Your Notes:'));
        notes.forEach((note)=>{
            console.log('> '+ chalk.green(note.title));
        });
    }
    else{
        console.log(chalk.bold.blue('List is empty'));
    }
}

yargs.command({
    command: 'list',
    describe: 'displaying all the notes in the list',
  
    handler(argv) {
        displayList();
    }
})

//Displaying contents of a note
function readNotes(title){
    notes.forEach((note,index)=>{
        if(note.title.toLowerCase()==title.toLowerCase()){
            console.log(chalk.bold.blue(note.title +':'));
            console.log(chalk.bold.green(notes[index].body));
             exists ="true";
        }
       
    });
    if(exists=='false'){
        console.log(chalk.bold.blue(title + 'ERROR!!! Note does not exist...'));
        console.log(chalk.black.bold('List of existing notes'));
        displayList();
    }
}

yargs.command({
    command: 'read',
    describe: 'displays content of the note',
    builder: {
        title: {
            describe: 'title',
            demandOption: true, 
            type: 'string'     
        },
    },
  
    handler(argv) {
        readNotes(argv.title);
    }
})
   
yargs.parse()