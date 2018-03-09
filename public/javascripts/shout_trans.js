$(document).ready(() => {
    //set a listener on the textbox
   $('#input').on("change",(evt) => {
       let text = $('#input').val();
  //the {text: text} sends a parameter named text with the
       $.get('/shout',{text: text})//making an ajax request to the '/shout'
           .done((data) => {
               console.log(data);
               $('#results').prepend('<li>' + data['result'] + '</li>');
               $('#input').val('');//reset the textbox
           })
.fail((xhr) => {
   alert("Problem contacting server");
   console.log(xhr);
});
});


});