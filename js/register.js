async function getDataFromForm(event) {
	console.log("EVENT", event)
  event.preventDefault();
  const form = document.querySelector("form");
  const data = Object.fromEntries(new FormData(form).entries());
  


  const answerFromRegister = await sendRequest(data, "auth/register");
  
  console.log("answerFromRegister", answerFromRegister)



    if (answerFromRegister) {
    const { status, user_id } = answerFromRegister;

    if (!!status && !!user_id) {
	  showToast("autorized susseful!!!", true);
     document.location.href = "/login";
    } else {
      showToast("autorized not susseful!!!", false);
    }
  }

  return answerFromRegister;
}

function checkAuthorized(event) {
  const rulesValidate = {
    rules: {
      nickname: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        
        minlength: 8,
      },
      confirm_password: {
        
        minlength: 8,
		equalTo: "#password"
      },
    },
  };

  const isValid = $("#commentForm").validate(rulesValidate).form();
  
  console.log("isValid", isValid)

  if (isValid) {
    getDataFromForm(event);
  } else {
    showToast("You must fill all fields", false)
  }
}


