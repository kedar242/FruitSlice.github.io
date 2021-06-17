var playing = false;
var score;
var trialsleft;
var step;
var actiion;
var fruits = ['Apple','Banana','Grapes','Mango','Pineapple','Watermelon'];
$(function(){
    //Click on start/reset btn
    $("#startbtn").click(function(){
    //are we playing?
        //yes==>
        if(playing==true)
        {
            //reload page
            location.reload();
        }
        //no==>
        else
        {
            playing=true;
            score=0;
            $("#scorevalue").html(score);

            //show the trials left
            $("#trialsleft").show();
            trialsleft = 3;
            addHearts();

            //hide the gameover box
            $("#gameover").hide();

            //change the btn text to reset game
            $("#strt").html("Reset Game");
            startAction();
        }
    });

//Slice a fruit:
    //play sound in background and 
    //explode the fruit

    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score);

        //stop fruit
        clearInterval(action);
        $("#fruit1").hide("explode",500);//slice fruit
        
        //send fruit
        setTimeout(startAction,500);
    });

    function addHearts()
    {
        $("#trialsleft").empty();
        for(i=0;i<trialsleft;i++)
        {
            $("#trialsleft").append(' <img src="images/Heart.png" class="life"> ');
        }
    }
    function startAction()
    {
        $("#fruit1").show();
        //1.create a random fruit 
        chooseFruit();
        $("#fruit1").css({'left':Math.round(450*Math.random()), 'top':-50}); //random position
        
        //generate a random step 
        step = 1 + Math.round(5*Math.random());
        //2.move down fruit one step down every 10sec  
        action = setInterval(function(){
            $("#fruit1").css('top',$("#fruit1").position().top + step);
            
            //is fruit too low?
            if($("#fruit1").position().top > $("#fruitContainer").height())
            {
                //yes->do we have any trials left?
                    //yes->create a new random fruit remove 1 heart reapeat no 1
                        if(trialsleft > 1)
                        {
                            $("#fruit1").show();
                            //1.create a random fruit 
                            chooseFruit();
                            $("#fruit1").css({'left':Math.round(450*Math.random()), 'top':-50}); //random position
                            
                            //generate a random step 
                            step = 1 + Math.round(5*Math.random());

                            //reduce no of trials by 1 
                            trialsleft--;

                            //populate trails left box
                            addHearts();
                        }
                        else
                        {   //no->show game over, btn:start game

                            playing = false;
                            $("#strt").html("Start Game");
                            $("#gameover").show();
                            $("#endscore").html(score + '.');
                            $("#trialsleft").hide();

                            stopAction();
                        }
                
            }
            //no->repeat no 2
        }, 10);
    }
    //generate a random fruit
    function chooseFruit()
    {
        $("#fruit1").attr('src','images/' + fruits[Math.round(5*Math.random())] + '.png'); 
    }        
    //stop dropping fruits
    function stopAction()
    {
        clearInterval(action);
        $("#fruits1").hide();
    }    
});        
