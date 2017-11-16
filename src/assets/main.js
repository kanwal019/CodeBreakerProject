let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    //Set default values if null values are present
    if(answer.value===''||attempt.value===''){
        setHiddenFields();
    }
    if(!validateInput(input.value)){
        return false;
    }
    attempt.value+=1;
    if(getResults(input.value)){
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    }else if(attempt.value>=10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    }else{
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields(){
    answer.value=Math.floor(Math.random()*10000).toString();
    while(answer.value.length<4){
    	answer.value="0"+answer.value;
    }
    attempt.value="0";
}

function setMessage(msg){
    document.getElementById('message').innerHTML=msg;
}

function validateInput(inp){
    if(inp.length!==4){
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    return true;
}

function getResults(inp){
    let tempHtml = '<div class="row"><span class="col-md-6">' + inp + '</span><div class="col-md-6">';
    for(let i=0;i<inp.length;i++){
        if(inp.charAt(i)===answer.value.charAt(i)){
            html+='<span class="glyphicon glyphicon-ok"></span>';
        }else if(answer.value.indexOf(inp.charAt(i))>-1){
            html+='<span class="glyphicon glyphicon-transfer"></span>';
        }else{
            html+='<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    tempHtml+='</div></div>';
    document.getElementById('results').innerHTML+=tempHtml;
    if(inp===answer.value){
        return true;
    }
    return false;
}

function showAnswer(param){
    document.getElementById('code').innerHTML=answer.value;
    if(param){
        document.getElementById('code').className+=" success";
    }else{
        document.getElementById('code').className+=" failure";
    }
}

function showReplay(){
    document.getElementById('guessing-div').style.display="none";
    document.getElementById('replay-div').style.display="block";
}