

const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

var dte = today.getDate()
var d = today.getDay();
var m = today.getMonth();
var y = today.getFullYear()
console.log(dte);
console.log(m+1);
console.log(y);



exports.getdate = function()
{
let day = today.toLocaleDateString('en-US', options);
return day;
};

exports.age = function()
{
const birthdate = 24;
const birthmonth = 03;
const birthyear = 1986;
var months = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
const week =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const month = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];

let remmonths = months[birthmonth-1];
console.log(remmonths);
let currentmonths = months[m];
console.log(currentmonths);
let remdays = currentmonths - dte;
console.log(remdays);


remdays =(currentmonths-remdays) + (remmonths-birthdate) ;


var mmonth =0;
let monthsd =0;
y = y-birthyear;

if (m >  birthmonth)
{
 mmonth = (m)- birthmonth;
}
else if( m < birthmonth)
{

 mmonth = birthmonth - (m);
}
else
{ mmonth=0;}


  //var ddays = (y-1) * 365;

  for (let i = 0; i < mmonth; i=i+1)
  {
  monthsd = monthsd + months[i]
  }

  var ages = 'you are '+y+ ' years old and '+(mmonth+1)+ ' months and '+(remdays)+' days';
  return ages;

};
