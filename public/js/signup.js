
	

		$("#signup").click(function(){

			var username=$("#username").val();
			var password=$("#password").val();
			var firstName=$("#firstName").val();
			var lastName=$("#lastName").val();
			var phone=$("#phone").val();
			var dateOfBirth=$("#dateOfBirth").val();
			
			if (username && password && firstName && lastName && phone && dateOfBirth){
				signup(username,password,firstName,lastName,phone,dateOfBirth);
			}else{
				$("#resultSignup").text("campos obligatorios");
			}

			

			
		});

	// BEGIN FETCH SIGNUP
		
		function signup(userName,password,firstName,lastName,phone,dateOfBirth){
			
				// $("#OptionsFormLogin").fadeOut(1000);
				$("#resultSignup").text("");
				$("#loaderSignup").fadeIn();
				$("#formSignup").slideUp(1000);

			var data={
				"email":userName,
				"password":password,
				"first_name":firstName,
				"last_name":lastName,
				"phone":phone,
				"date_of_birth":dateOfBirth
			};
			fetch("http://avo-app.com/api/v1/users", {
				method: 'POST',
				body: JSON.stringify(data),
				headers:{
				'Content-Type': 'application/json',
				'Accept':'*/*',
				'Access-Control-Allow-Origin': '*',
				'Mode':'cors',
				'Connection':'keep-alive',
				'Accept-Encoding':'gzip, deflate, br',
				'Credentials': 'include'
				}
			}).then(res => res.json())
			.catch(error =>{
					console.error(error);
					$("#resultSignup").text(error);
					// alert(error);
					
				}
					)
			.then(response =>{
					console.log(response);

					if(response.error){
						
						$("#loaderSignup").fadeOut();
						$("#formSignup").slideDown(2000,function(){
							$("#resultSignup").text("email registrado");
							$("#OptionsFormSignup").fadeIn(1000);
						});

					}else if(response.data){
						
						$("#loaderSignup").fadeIn(function(){
							setTimeout(function(){	
								// signupOk(response.data.first_name,response.data.last_name,userName,password);
								$("#loaderSignup").fadeOut();
								$("#OptionsFormSignup").fadeIn(1000);
								$("#resultSignupOk").fadeIn(1000);
							}, 3000);
							
						});
						

					}
				}
			);
		}

	// END FETCH SIGNUP

	// BEGIN FUNCTIONS SIGNUP

		// FUNCTION IF SIGNUP OK
			// function signupOk(firstName,lastName,userName,password){

			// 	if(!localStorage.getItem("firstName")){

			// 		localStorage.setItem("firstName",firstName);
					
			// 	}

			// 	if(!localStorage.getItem("lastName")){

			// 		localStorage.setItem("lastName",lastName);
					
			// 	}

			// 	if( $("#rememberUser").prop("checked") ) {
					
			// 		if(!localStorage.getItem("autoLogin")){

			// 			localStorage.setItem("autoLogin",true);
						
			// 		}

			// 	}

			// 	if(!localStorage.getItem("userName")){

			// 		localStorage.setItem("userName",userName);
					
			// 	}

			// 	if(!localStorage.getItem("password")){

			// 		localStorage.setItem("password",password);
					
			// 	}

			// 	window.location="main.html";
				
			// }

			// if(localStorage.getItem("autoLogin")){

			// var username=localStorage.getItem("userName");
			// var password=localStorage.getItem("password");
			
			// $("#formLogin").slideUp(3000);
			// // if (username && password){
			// 	login(username,password);
			// // }
				
			// }
		// END FUNCTION IF SIGNUP OK

		// FUNCTION IF LOGIN ERROR
			function loginError(){

			}
		// END FUNCTION IF LOGIN ERROR

	// END LOGIN FUNCTIONS

	