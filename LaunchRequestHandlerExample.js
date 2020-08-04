const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Say hello to document links!";

    return handlerInput.responseBuilder
      .addDirective({
        type: "Alexa.Presentation.APL.RenderDocument",
        token: "someToken",
        //document: documentLink,
        document: {
          src: "doc://alexa/apl/documents/some-apl-template-name",
          type: "Link",
        },
        datasources: {},
        packages: [],
      })
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
