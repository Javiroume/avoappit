
	

		$("#ingresar").click(function(){

			var username=$("#username").val();
			var password=$("#password").val();
			
			if (username && password){
				login(username,password);
			}else{
				$("#resultLogin").text("usuario y contraseña campos obligatorios");
			}

			
		});

	// BEGIN FETCH LOGIN
		
		function login(userName,password){
			
				$("#OptionsFormLogin").fadeOut(1000);
				$("#resultLogin").text("");
				$("#loaderLogin").fadeIn();
				$("#formLogin").slideUp(1000);

			var data={
				"email":userName,
				"password":password
			};
			fetch("http://avo-app.com/api/v1/login", {
				method: 'POST',
				body: JSON.stringify(data),
				headers:{
				'Content-Type': 'application/json',
				'Accept':'*/*',
				'Access-Control-Allow-Origin': 'origin',
				'Connection':'keep-alive',
				'Accept-Encoding':'gzip, deflate, br',
				'Credentials': 'include'
				}
			}).then(res => res.json())
			.catch(error =>{
					console.error(error);
					$("#resultLogin").text(error);
					// alert(error);
					
				}
					)
			.then(response =>{
					console.log(response);

					if(response.error){
					
						$("#loaderLogin").fadeOut();
						$("#formLogin").slideDown(2000,function(){
							$("#resultLogin").text("usuario o contraseña incorrectos");
							$("#OptionsFormLogin").fadeIn(1000);
						});

					}else if(response.data){
						
						$("#loaderLogin").fadeIn(function(){
							setTimeout(function(){	
								// loginOk(response.data.first_name,response.data.last_name,userName,password);
							}, 3000);
							console.log(response.headers);
							
						});
						

					}
				}
			);
		}

	// END FETCH LOGIN

	// BEGIN FUNCTIONS LOGIN

		// FUNCTION IF LOGIN OK
			function loginOk(firstName,lastName,userName,password){

				if(!localStorage.getItem("firstName")){

					localStorage.setItem("firstName",firstName);
					
				}

				if(!localStorage.getItem("lastName")){

					localStorage.setItem("lastName",lastName);
					
				}

				if( $("#rememberUser").prop("checked") ) {
					
					if(!localStorage.getItem("autoLogin")){

						localStorage.setItem("autoLogin",true);
						
					}

				}

				if(!localStorage.getItem("userName")){

					localStorage.setItem("userName",userName);
					
				}

				if(!localStorage.getItem("password")){

					localStorage.setItem("password",password);
					
				}

				window.location="main.html";
				
			}

			if(localStorage.getItem("autoLogin")){

			var username=localStorage.getItem("userName");
			var password=localStorage.getItem("password");
			
			$("#formLogin").slideUp(3000);
			// if (username && password){
				login(username,password);
			// }
				
			}
		// END FUNCTION IF LOGIN OK

		// FUNCTION IF LOGIN ERROR
			function loginError(){

			}
		// END FUNCTION IF LOGIN ERROR

	// END LOGIN FUNCTIONS

	