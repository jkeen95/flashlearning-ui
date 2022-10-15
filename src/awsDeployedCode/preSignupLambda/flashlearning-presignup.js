exports.handler = (event, context, callback) => {
    event.response.autoConfirmUser = true;

    // Set the email as verified if it is in the request
    if (event.request.userAttributes.hasOwnProperty("email")) {
        event.response.autoVerifyEmail = true;
    }

    const now = new Date();
    const thirteenYearsAgoDateString = "" + (now.getFullYear()-13) + "\-" + (now.getMonth()+1) + "\-" + (now.getDate());
    const thirteenYearsAgoDate = new Date(thirteenYearsAgoDateString);
    const dateOfBirth = new Date(event.request.userAttributes.birthdate);
    if (dateOfBirth > thirteenYearsAgoDate) {
        var error = new Error("User's age must be 13 years or older");
        // Return error to Amazon Cognito
        callback(error, event);
    }
    // Return to Amazon Cognito
    callback(null, event);
};