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
          signIn: 'Entrar'
      },
      socialSignUp: "Cadastre-se",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          signIn: "Entrar",
          signUp: "Cadastro",
          forgotPwd: "Recupere sua Senha"
      },

      signInLink_pre: "J\u00e1 tem um usu\u00e1rio?",
      signInLink_link: "Entre",

      pwdLink_link: "Esqueceu sua senha?",
      signUpLink_link: "Cadastre-se",
      signUpLink_pre: "N\u00e3o tem um usu\u00e1rio?",

      termsPreamble: "clickAgree",
      termsPrivacy: "privacyPolicy",
      termsAnd: "and",
      termsTerms: "terms",
    },
});

// Redirect to home page on login
Accounts.onLogin(function(user){
  // put this test here because Router.current() is not defined for server side, so it was logging error - Fernando 03/feb/2016
  if (Meteor.isClient) {
     var currentUrl = Router.current().originalUrl;
     // reroute to map page if user was on login page
     if (currentUrl == '/login') {
       Router.go('/');
     } // end if (currentUrl == '/login')
  } // end if (Meteor.isClient)
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

