/*
author: alfateam123
started on: 25-apr-2013
purpose: wasting time I should use to study.

it uses a script (scripts are cool!) 
from adlermerdrado to show badges.
I'm just integrating it, I'm too lazy to do the entire work.
*/

MyCoderwallBadges=function(objName, username)
{
    this.has_badges=false;
    this.objName=objName;
    this.username=username;
    var currentObj=this;

    getMyBadges=function(param)
    { 
        console.log(param);
        for(i in param.data.badges)
	{
	    currentObj.has_badges=true;
	    var currentBadge=param.data.badges[i];
	    console.log("adding "+currentBadge.name);
	    //$("#"+currentBadge.objName).append(
	    $("#coderwall_badges").append(
	         $('<img>').attr('src', currentBadge.badge)
		           .attr('title', currentBadge.name)
			   .attr('alt', currentBadge.name+": "+currentBadge.description)
			   .attr('width', 140)
			   .attr('lenght', 140)
	     );
	}
	set_new_boxes_hidden_field(false);
    }
    $.getScript("http://coderwall.com/"+this.username+".json?callback=this.getMyBadges");
    return this.has_badges;
}

is_a_profile=function()
{
    //'cause a fu**in' URL.endsWith is too much mainstream *rage* 
    return document.URL.match("."+"$")==".";
}

retrieve_name=function()
{
    //slice to remove the ending "."
    if (is_a_profile())
        return document.URL.split("nerdz.eu/")[1].slice(0, -1);
}

create_cb_title=function()
{
    cb_title=document.createElement("div");
    cb_title.className="title";
    cb_title.hidden=true;
    cb_title.innerHTML="<b>"+retrieve_name()+"<br /><a href=\"http://coderwall.com/"+retrieve_name()+"\">Coderwall</a> badges</b>";
    return cb_title;
}

create_cb_box=function()
{
    cb_box=document.createElement("div");
    cb_box.className="box";
    cb_box.id="coderwall_badges";
    cb_box.hidden=true;
    //cb_box.innerHTML=COOL_SCRIPT.replace("{0}", retrieve_name());
    return cb_box;
}

set_new_boxes_hidden_field=function(isHidden)
{
    coderwall_badges_title.hidden=isHidden;
    coderwall_badges_box.hidden=isHidden;
}

add_coderwall_badge=function()
{
    //aside#left_col is "about me" column
    //aside#right_col is... bih, something more about the user :D
    console.log("ehi, i'm adding the badges!");
    pers_column=document.getElementsByTagName("aside")[1];

    coderwall_badges_title = create_cb_title();
    coderwall_badges_box   =  create_cb_box();

    pers_column.appendChild(coderwall_badges_title);
    pers_column.appendChild(coderwall_badges_box);
    pers_column.appendChild(document.createElement("br"));
    
    console.log("now we'll show the badges!");
    useless_obj=new MyCoderwallBadges("coderwall_badges", retrieve_name());
    
    //show badges if the viewed user has at least one badge!
    console.log("ehi, will I show the box?");
    console.log(useless_obj);
    coderwall_badges_title.hidden=!(useless_obj.has_badges);
    coderwall_badges_box.hidden=!(useless_obj.has_badges);
}

execute_this=function()
{
    if(is_a_profile())
        add_coderwall_badge();
}

$(document).ready(execute_this);
