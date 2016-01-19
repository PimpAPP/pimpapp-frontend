AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: false,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    // privacyUrl: 'privacy',
    // termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/home',
    redirectTimeout: 4000,

    // Hooks
    // onLogoutHook: myLogoutFunc,
    // onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,
    // postSignUpHook: myPostSubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Cadastre-se",
          signIn: 'Login'
      },
      socialSignUp: "Cadastre-se",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          signIn: "Login",
          signUp: "Cadastro",
          forgotPwd: "Recover Your Password"
      },

      signInLink_pre: "Já tem um usuário?",
      signInLink_link: "Entre",

      pwdLink_link: "Esqueceu sua senha?",
      signUpLink_link: "Cadastre-se",
      signUpLink_pre: "Não tem um usuário?",

      termsPreamble: "clickAgree",
      termsPrivacy: "privacyPolicy",
      termsAnd: "and",
      termsTerms: "terms",
    },
});

// Redirect to home page on login
Accounts.onLogin(function(user){
  Router.go('/');
});

AccountsTemplates.addField({
    _id: "name",
    type: "text",
    displayName: "Nome",
});

// Add fields
AccountsTemplates.addField({
    _id: "telephone",
    type: "tel",
    displayName: "Telefone",
});

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    displayName: 'Senha',
    placeholder: {
        signUp: "Pelo menos seis caracteres"
    },
    required: true,
    minLength: 6
});


// AccountsTemplates.removeField('password_again');
// AccountsTemplates.addField({
//     _id: 'password_again',
//     type: 'password',
//     displayName: 'Senha (mais uma vez)',
//     placeholder: {
//         signUp: "Pelo menos seis caracteres"
//     },
//     required: true,
//     minLength: 6
// });



