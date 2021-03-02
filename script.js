$(() => {
  $( "#review" ).hide();
  
  $("#showReview").click( () => {
    $("#review").toggle("show", "linear")
  });

  $.widget("wowmuchcustom.annoy",{
    options: {
        value: Math.random() * 500,
        value2: Math.random() * 100
    },
    _create: function() {
        this.element.addClass( "annoying" );
        this._on(this.element, {
          mouseup: "_refresh"
        });
        },
    _refresh: function(){
      this.random();
      this.element.css({
        left: this.options.value,
        bottom: this.options.value2
      });
    },
    random: function(){
      let position = {
      value: Math.floor(Math.random() * 500),
      value2: Math.floor(Math.random() * 100)
      }
      this.option(position)
    },
    _destroy: function(){
      console.log(this.element + "test");
      this.element.removeClass( "annoying" );
      this.element.css({left: "", bottom: ""});
    }
  });

  const annoyme = document.querySelector("#annoyme");

  $("#annoyme").on("click", () => {
    if(annoyme.checked){
      $(".todo").annoy();
    } else if (!annoyme.checked){
      $(".todo").annoy("destroy");
      console.log($(".tobeannoyed"));
    };
  });
  
  
  let dragged = true;
  $( ".todo" ).on("click", function(){
    $(".todo").on("drag", () => {
      dragged = true; 
    });
    
    if(!dragged){
      $(".dialog").dialog("close");
      let dialog = $(this).data('id');
      $( dialog ).dialog( "open" );
    }
    dragged = false;
  });
  
  
  $( ".todo" ).draggable({snap: ".snapcontainer", snapMode: "inner"});
  
  
  $( ".drop" ).droppable({
      drop: function(){
        $(this).not("#backlog").effect("bounce", "slow");
      }
    });

  $( ".dialog" ).dialog({
    autoOpen: false
  });
  
  $(".tabs").tabs();

  $(".deadline").datepicker({
    minDate: 0,
    dateFormat: "yy-mm-dd"
    });

  $(".todo").append("<p>click or drag me</p>");


  $("form").submit( function(event) {
      event.preventDefault();
      let todos = $(".todo");
      todos = todos.length;
      const info1 = $("input[name=info1]").val();
      console.log(info1);
      const info2 = $("input[name=info2]").val();
      const info3 = $("input[name=info3]").val();
      const deadline = $("input[name=deadline]").val();
      let appendtodo = `
          <div id="todo${todos +1}" class="todo" data-id="#dialog${todos +1}">
          <p>click or drag me</p>
              <div class="dialog" id="dialog${todos +1}">
                  <div class="tabs" id="tabs${todos +1}">
                      <ul>
                          <li><a href="#fragment-1.${todos +1}">info 1</a></li>
                          <li><a href="#fragment-2.${todos +1}">info 2</a></li>
                          <li><a href="#fragment-3.${todos +1}">info 3</a></li>
                      </ul>
                      <div id="fragment-1.${todos +1}">${info1}</div>
                      <div id="fragment-2.${todos +1}">${info2}</div>
                      <div id="fragment-3.${todos +1}">${info3}</div>
                  </div>
                  <p>Deadline:</p><input type="text" class="deadline"></input>
              </div>
          </div>`
      $("#backlog").append( appendtodo );
      
      $(`#todo${todos +1} .deadline`).datepicker({
          minDate: 0,
          dateFormat: "yy-mm-dd"
          });
          
      $(`#todo${todos +1} .deadline`).val(deadline);
      
      $( `#dialog${todos +1}` ).dialog({
        autoOpen: false
      });
      
      $( `#todo${todos +1}` ).on("click", function(){
        $(`#todo${todos +1}`).on("drag", () => {
        dragged = true; 
        });
    
      if(!dragged){
        $(".dialog").dialog("close");
        let dialog = $(this).data('id');
        $( dialog ).dialog( "open" );
      }
      dragged = false;
      });


      $( `#todo${todos +1}` ).draggable({snap: ".snapcontainer", snapMode: "inner"});

      $(`#tabs${todos +1}`).tabs();
  
  });
});