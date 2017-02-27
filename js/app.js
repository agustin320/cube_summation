$(document).ready(function() {

	var results = $('#results-well')
	var testcases = 1
	var operations = 1
	var m_value = 0
	var t_value = 0 
	var testcase_form = $('#testcase-form')
	var update_form = $('#update-form')
	var query_form = $('#query-form')
	var testcase_title = $('#testcase-title')
	var matrix = ''

	  $('#main-form').on('submit', function(e){
	    
	      e.preventDefault();

	      $(this).hide()
	      testcase_form.show()

	      t_value = $('#t_value').val()

	      results.append( "<p>Sum with "+ t_value +" testcases started, please input the N and M values.</p>" );

	  });

	  testcase_form.on('submit', function(e){

	  	e.preventDefault();

	  	n_value = parseInt($('#n_value').val())
	  	m_value = parseInt($('#m_value').val())

	  	$(".update_coord").prop('max',n_value);
	  	$(".query_coord2").prop('max',n_value);

		matrix = math.matrix(math.zeros([n_value, n_value, n_value]))

		results.append( "<p><b>Testcase "+testcases+" of "+t_value+"</b><br>3D matrix of "+ n_value +" by "+ n_value +" with "+ m_value +" operations created.</p>" );

		if(testcases > t_value){
			$('#main-form').show()
			testcase_form.hide()
			testcases = 1
			results.append("<p>End</p>")
		}else{

			testcases++;

			$(this).hide()
			update_form.show()
			query_form.show()

		}

	  });

	  update_form.on('submit', function(e){

	  	e.preventDefault();

	  	
	  	operation('update')


	  });

	  query_form.on('submit', function(e){

	  	e.preventDefault();

	  	operation('query')

	  });

	function operation(op){

	  	switch (op) {
		    case 'query':
		        
				const coord_ini = {
					x: parseInt($('#query_x1').val()) - 1,
					y: parseInt($('#query_y1').val()) - 1,
					z: parseInt($('#query_z1').val()) - 1
				}
				const coord_end = {
					x: parseInt($('#query_x2').val()) - 1,
					y: parseInt($('#query_y2').val()) - 1,
					z: parseInt($('#query_z2').val()) - 1
				}

				sum_result = 0

				for (let x = coord_ini.x; x <= coord_end.x; x++) {
				    for (let y = coord_ini.y; y <= coord_end.y; y++) {
				      for (let z = coord_ini.z; z <= coord_end.z; z++) {
				        sum_result += matrix._data[x][y][z]
				      }
				    }
				  }

				results.append( "<p>Result of ("+ (coord_ini.x + 1) +","+ (coord_ini.y + 1) +","+ (coord_ini.z + 1) +") + ("+ (coord_end.x + 1) +","+ (coord_end.y + 1) +","+ (coord_end.z + 1) +") is <b>"+ sum_result +"</b></p>" );

		        break;

		    case 'update':
		       	
		    	const w = parseInt($('#update_w').val())

			  	const coord = {
				    x: parseInt($('#update_x').val()) - 1,
				    y: parseInt($('#update_y').val()) - 1,
				    z: parseInt($('#update_z').val()) - 1
				  }

				matrix._data[coord.x][coord.y][coord.z] = w

				results.append( "<p>Value of ("+ (coord.x + 1) +","+ (coord.y + 1) +","+ (coord.z + 1) +") changed to "+ w +"</p>" );

		        break;
		}

		if(operations >= m_value){

			if(testcases > t_value){

				$('#main-form').show()
				testcase_form.hide()
				testcases = 1
				results.append("<p>End</p>")
				query_form.hide()
				update_form.hide()
				operations = 1

			}else{

				testcase_form.show()
				query_form.hide()
				update_form.hide()
				operations = 1

			}	
		}else{
			operations++;
		}


	}

});